import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";

export const options = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: {
          label: "username",
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
        const { username, password } = credentials;
        const user = { id: 1, username: username, password: password };
        if (user) {
          return user;
        } else {
          return null;
        }
      },
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
};
