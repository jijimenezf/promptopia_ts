import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
//import GoogleProvider from "next-auth/providers/google";
import SpotifyProvider from "next-auth/providers/spotify";
import { connectToDB } from "@utils/database";
import User from "@models/user";

const authOptions: NextAuthOptions = {
  providers: [
    /*GoogleProvider({
      clientId: process.env.GOOGLE_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    }),*/
    SpotifyProvider({
      clientId: process.env.SPOTIFY_CLIENT_ID || '',
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET || '',
    }),
  ],
  callbacks: {
    async session({ session }) {
      const sessionUser = await User.findOne({
        email: session?.user?.email,
      });
      //@ts-ignore
      session.user.id = sessionUser._id.toString();

      return session;
    },
    //@ts-ignore
    async signIn({ profile }) {
      try {
        // serverLess -> Lambda -> dynamodb
        await connectToDB();
        /**
         * check if an user exists
         */
        const userExists = await User.findOne({
          email: profile?.email,
        });
        /**
         * If there is no user, create a new one
         */
        if (!userExists) {
          await User.create({
            email: profile?.email,
            username: profile.id.replace(/\s/g, "").toLowerCase(),
            image: profile?.images[0].url,
          })
        }
        return true;
      } catch(error) {
        console.error("An error occurred, check your DB configuration -->", error);
        return false;
      }
    },
    },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
