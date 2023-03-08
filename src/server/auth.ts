import type { GetServerSidePropsContext } from "next";
import {
  getServerSession,
  type NextAuthOptions,
  type DefaultSession,
  Account,
} from "next-auth";
import SpotifyProvider, { SpotifyProfile } from "next-auth/providers/spotify";
import Credentials from "next-auth/providers/credentials"
import { env } from "@/env.mjs";
import { Magic } from "@magic-sdk/admin";
const magic = new Magic(env.MAGIC_SECRET);

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
  events: {
    signOut({session, token}) {
      let profile: any = token
      if (profile.account.provider === "credentials") {
          try {
            magic.users.logoutByPublicAddress(profile.user.publicAddress)
              .then(() => {
              })
          } catch(err) {
            console.log(err)
          }
        }
    }
  },
  callbacks: {
    session({ session, user, token }) {
      if (session.user) {
        if (token) {
          const account: Account = token.account as Account
          let profile: any
          switch (account.provider) {
            case "spotify":
              profile = token.profile as SpotifyProfile
              session.user.id = `${profile.id}`
              break
            case "credentials":
              profile = token.user
              session.user.id = `${profile.publicAddress}`
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
    SpotifyProvider({
      name: "spotify",
      id: "spotify",
      clientId: process.env.SPOTIFY_ID!,
      clientSecret: process.env.SPOTIFY_SECRET!,
    }),
    Credentials({
      name: 'magic',
      credentials: {
        didToken: { label: 'DID Token', type: 'text' },
      },
      // @ts-expect-error
      async authorize({ didToken }, req) {
        // validate magic DID token
        magic.token.validate(didToken);

        // fetch user metadata
        const metadata = await magic.users.getMetadataByToken(didToken);

        // return user info
        return { ...metadata};
      }
    })
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
  }
};

/**
 * Wrapper for `getServerSession` so that you don"t need to import the
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
