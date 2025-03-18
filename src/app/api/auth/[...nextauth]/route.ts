import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

declare module "next-auth" {
  interface User {
    id: string;
    username: string;
  }

  interface Session {
    user: User;
  }
}

const prisma = new PrismaClient();

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "Notandi" },
        password: { label: "Password", type: "password", placeholder: "******" },
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) {
          throw new Error("Notandanafn og lykilorð vantar.");
        }

        const user = await prisma.user.findUnique({
          where: { username: credentials.username },
        });

        if (!user) {
          throw new Error("Notandinn er ekki til.");
        }

        const isValid = await bcrypt.compare(credentials.password, user.password);
        if (!isValid) {
          throw new Error("Vitlaust lykilorð.");
        }

        return { id: user.id, username: user.username }; 
      },
    }),
  ],
  session: {
    strategy: "jwt", 
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.username = user.username;
      }
      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.username = token.username as string;
      }
      return session;
    },
  },

  pages: {
    signIn: "/auth/login", 
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
