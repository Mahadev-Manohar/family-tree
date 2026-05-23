import { compare } from "bcryptjs";
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  secret: process.env.AUTH_SECRET,

  session: {
    strategy: "jwt",
  },

  providers: [
    CredentialsProvider({
      name: "Admin Login",

      credentials: {
        email: {
          label: "Email",
          type: "email",
        },

        password: {
          label: "Password",
          type: "password",
        },
      },

      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const adminEmail = process.env.ADMIN_EMAIL;
        const adminPasswordHash =
          process.env.ADMIN_PASSWORD_HASH;

        const isCorrectEmail =
          credentials.email === adminEmail;

        const isCorrectPassword =
          await compare(
            credentials.password,
            adminPasswordHash || ""
          );

        if (!isCorrectEmail || !isCorrectPassword) {
          return null;
        }

        return {
          id: "admin",
          email: adminEmail,
          role: "admin",
        };
      },
    }),
  ],

  pages: {
    signIn: "/admin/login",
  },
};