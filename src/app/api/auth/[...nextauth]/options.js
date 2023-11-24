import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

export const options = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        name: {
          label: "name",
          type: "text",
          placeholder: "Enter Username",
        },
        password: {
          label: "password",
          type: "password",
          placeholder: "Enter Password",
        },
      },
      async authorize(credentials) {
        const { name, password } = credentials;
        const user = {
          name: name,
          password: password,
        };
        if (user) {
          return user;
        } else {
          return null;
        }
      },
      async session({ session, token }) {
        if ("name" in token) {
          session.user.name = token.name;
        }
        if ("password" in token) {
          session.user.password = token.password;
        }
        return session;
      },
    }),

    GithubProvider({
      clientId: process.env.GITHUB_ID || "",
      clientSecret: process.env.GITHUB_SECRET || "",
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
      callback: {
        async signIn(account, profile) {
          if (account.provider === "google") {
            return (
              profile.email_verified && profile.email_endsWith("@gmail.com")
            );
          } else {
            return true;
          }
        },
      },
    }),
  ],
  pages: {
    signIn: "/auth/signin",
    signOut: "/auth/signout",
    error: "/auth/error",
  },
};
