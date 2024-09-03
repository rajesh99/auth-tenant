'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { EmailFormSchema, EmailFormValues } from '@/lib/types/validations';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/Button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/Form';
import { Input } from '@/components/ui/Input';

import { Icons } from '@/components/Icons';
import { Login, GoogleLogin } from '@/lib/API/Services/auth/login';

import routes from '@/lib/config/routes';
import { useRouter } from 'next/navigation';
import { trackEvent } from '@/lib/utils/analytics';

interface AuthFormPropsI {
  submit_text: string;
  auth_flow: string;
}

export default function AuthForm({ submit_text, auth_flow }: AuthFormPropsI) {
  const router = useRouter();

  const form = useForm<EmailFormValues>({
    resolver: zodResolver(EmailFormSchema),
    defaultValues: {
      email: ''
    }
  });

  const {
    register,
    formState: { isSubmitting }
  } = form;

  const onSubmit = async (values: EmailFormValues) => {
    trackEvent({ eventName: auth_flow });
    const redirect = routes.redirects.user.toUserDashboard;
    const props = { email: values.email, callbackUrl: redirect };

    await Login(props);

    router.push(routes.redirects.auth.authConfirm);
  };

  const handleGoogleSignIn = async () => {
    const redirect = routes.redirects.user.toUserDashboard;
    const props = { callbackUrl: redirect };
    await GoogleLogin(props);
  };

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormMessage />
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    {...register('email')}
                    type="text"
                    placeholder="Email"
                    className="bg-background-light dark:bg-background-dark"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <div>
            <Button disabled={isSubmitting} className="w-full">
              {isSubmitting && <Icons.Spinner className="mr-2 h-4 w-4 animate-spin" />}
              <Icons.Mail className="mr-2 h-4 w-4" />
              {submit_text}
            </Button>
          </div>
        </form>
      </Form>

      <div className="space-y-8 mt-8">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
          </div>
        </div>
        <Button onClick={handleGoogleSignIn} variant="outline" className="w-full">
          <Icons.Google />
          <span className="ml-2 font-semibold">Sign in with Google</span>
        </Button>
      </div>
    </div>
  );
}
