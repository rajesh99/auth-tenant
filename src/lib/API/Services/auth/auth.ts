import NextAuth from 'next-auth';
import { PrismaAdapter } from '@auth/prisma-adapter';
import routes from '@/lib/config/routes';
import Google from 'next-auth/providers/google';
import EmailProvider from 'next-auth/providers/email';
import { sendVerificationRequest } from './sendEmail';

import prisma from '../init/prisma';

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut
} = NextAuth({
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    }),
    EmailProvider({
      sendVerificationRequest
    })
  ],
  adapter: PrismaAdapter(prisma),
  session: { strategy: 'database' },
  pages: {
    signIn: routes.redirects.auth.toLogin
  },
  callbacks: {
    async session({ session, user }) {
      if (user || session) {
        session.user.id = user.id;
        return session;
      }

      throw 'User Not Found';
    }
  }
});
