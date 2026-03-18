import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

const AUTH_USERNAME = process.env.AUTH_USERNAME || "admin";
const AUTH_PASSWORD = process.env.AUTH_PASSWORD || "structui";

export const { handlers, signIn, signOut, auth } = NextAuth({
  secret: process.env.AUTH_SECRET || "structui-dev-secret",
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/auth/sign-in",
  },
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize(credentials) {
        const username = String(credentials?.username || "");
        const password = String(credentials?.password || "");

        if (username === AUTH_USERNAME && password === AUTH_PASSWORD) {
          return {
            id: "structui-admin",
            name: username,
          };
        }

        return null;
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user?.name) {
        token.name = user.name;
      }

      return token;
    },
    session({ session, token }) {
      if (session.user) {
        session.user.name = token.name;
      }

      return session;
    },
  },
});
