import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";
import { jwt } from "better-auth/plugins";
import { APIError, createAuthMiddleware } from "better-auth/api";

const client = new MongoClient(process.env.MONGODB_URL as string);
const db = client.db('commonKind');

export const auth = betterAuth({
  baseURL: process.env.BETTER_AUTH_URL,
  hooks: {
    before: createAuthMiddleware(async (ctx) => {
      if (ctx.path !== "/sign-up/email") return;
      const password = ctx.body?.password;
      if (typeof password !== "string" || !/^(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(password)) {
        throw new APIError("BAD_REQUEST", {
          message: "Password must contain at least 8 characters, including uppercase and lowercase letters.",
        });
      }
    }),
  },
  database: mongodbAdapter(db, {
    client,
  }),
    emailAndPassword: { 
    enabled: true, 
  }, 
    socialProviders: { 
    google: { 
      clientId: process.env.GOOGLE_CLIENT_ID as string, 
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string, 
    }, 
  },

  plugins: [
    jwt()
  ],
  session: {
    cookieCache: {
      enabled: true,
      strategy: 'jwt',
      maxAge: 7 * 24 * 60 * 60,
    }
  }
});
