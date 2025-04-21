import axios, { AxiosResponse } from "axios";
import NextAuth, { AuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { authOptions } from "../../../utils/authOptions";

//const handler = NextAuth(authOptions);
const handler = NextAuth({
providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (
          credentials?.username === "admin" &&
          credentials?.password === "123456"
        ) {
          return {
            id: "1",
            name: "Admin Tester",
            email: "admin@yolo.dev",
          };
        }
        return null;
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET || "dev-secret",
  session: {
    strategy: "jwt",
  },
});
//
export { handler as GET, handler as POST };
