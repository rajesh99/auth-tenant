import 'client-only';
import { AuthError } from '@/lib/utils/error';
import { toast } from 'react-toastify';

import { signIn, signOut } from 'next-auth/react';
import configuration from '@/lib/config/api';
import routes from '@/lib/config/routes';
import { AuthProviderE } from '@/lib/types/enums';
import { EmailFormValues } from '@/lib/types/validations';

interface LoginPropsI extends EmailFormValues {
  callbackUrl: string;
  parameters?: object;
}

export const Login = async ({ email, callbackUrl, parameters }: LoginPropsI) => {
  try {
    const signInResult = await signIn(
      AuthProviderE.EMAIL,
      {
        email: email.toLowerCase(),
        redirect: false,
        callbackUrl
      },
      parameters
    );

    if (signInResult?.error) {
      toast.error(configuration.errorMessageGeneral);
      const error: Error = { name: 'Auth Error', message: signInResult?.error };
      AuthError(error);
    }
  } catch (err) {
    toast.error(configuration.errorMessageGeneral);
    AuthError(err);
  }
};

export const GoogleLogin = async ({ callbackUrl }: { callbackUrl: string }) => {
  try {
    const signInResult = await signIn(AuthProviderE.GOOGLE, {
      callbackUrl
    });

    if (signInResult?.error) {
      toast.error(configuration.errorMessageGeneral);
      const error: Error = { name: 'Auth Error', message: signInResult?.error };
      AuthError(error);
    }
  } catch (err) {
    toast.error(configuration.errorMessageGeneral);
    AuthError(err);
  }
};

export const Logout = async () => {
  try {
    await signOut({ callbackUrl: routes.redirects.auth.requireAuth });
  } catch (err) {
    toast.error(configuration.errorMessageGeneral);
    AuthError(err);
  }
};
