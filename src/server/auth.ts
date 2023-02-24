import type { GetServerSidePropsContext } from "next";
import {
  getServerSession,
  type NextAuthOptions,
  type DefaultSession,
  Account,
} from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { env } from "../env.mjs";
import GithubProvider, { GithubProfile } from "next-auth/providers/github";
import DiscordProvider, { DiscordProfile } from "next-auth/providers/discord";
import {Magic} from "@magic-sdk/admin";
import Credentials from "next-auth/providers/credentials";
import { profile } from "console";

/**
 * Module augmentation for `next-auth` types.
 * Allows us to add custom properties to the `session` object and keep type
 * safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 **/
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      // ...other properties
      // role: UserRole;
    } & DefaultSession["user"];
  }

  // interface User {
  //   // ...other properties
  //   // role: UserRole;
  // }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks,
 * etc.
 *
 * @see https://next-auth.js.org/configuration/options
 **/
export const authOptions: NextAuthOptions = {
  callbacks: {
    session({ session, user, token }) {
      if (session.user) {
        if (token) {
          const account: Account = token.account as Account
          let profile: any
          switch (account.provider) {
            case "github":
              profile = token.profile as GithubProfile
              session.user.id = `${profile.id}`
              break
            case "discord":
              profile = token.profile as DiscordProfile
              session.user.id = `${profile.id}`
              break
            default:
              session.user.id = account.provider
              break
          }
        }
        // session.user.role = user.role; <-- put other properties on the session here
      }
      return session;
    },
    jwt({token, user, account, profile, isNewUser}) {
      if (account) {
          token.account = account;
      }
      if (profile) {
          token.profile = profile;
      }
      if (user) {
          token.user = user;
      }
      if (isNewUser) {
        token.newUser = true
      } else {
        token.newUser = false
      }
      return Promise.resolve(token);
    }
  },
  providers: [
    GithubProvider({
      name: "github",
      id: "github",
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
    DiscordProvider({
      name: "discord",
      id: "discord",
      clientId: process.env.DISCORD_CLIENT_ID!,
      clientSecret: process.env.DISCORD_CLIENT_SECRET!,
      authorization: process.env.DISCORD_AUTH_LINK,
    }),
    /**
     * ...add more providers here
     *
     * Most other providers require a bit more work than the Discord provider.
     * For example, the GitHub provider requires you to add the
     * `refresh_token_expires_in` field to the Account model. Refer to the
     * NextAuth.js docs for the provider you want to use. Example:
     * @see https://next-auth.js.org/providers/github
     **/
  ],
  pages: {
    signIn: "/login",
  },
};

/**
 * Wrapper for `getServerSession` so that you don't need to import the
 * `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 **/
export const getServerAuthSession = (ctx: {
  req: GetServerSidePropsContext["req"];
  res: GetServerSidePropsContext["res"];
}) => {
  return getServerSession(ctx.req, ctx.res, authOptions);
};
