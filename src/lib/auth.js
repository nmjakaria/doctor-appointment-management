
import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { jwt } from "better-auth/plugins";

const client = new MongoClient(process.env.MONGODB_URI);
const db = client.db("doctor-appointment");

export const auth = betterAuth({
    database: mongodbAdapter(db, {
        client
    }),
    emailAndPassword: {
        enabled: true,
        async authorize({ email, password }) {
            // Manual check can be done here if needed, 
            // but Better Auth handles standard verification.
            return null; // Let internal logic handle it
        },
    },
    user: {
        changeEmail: {
            enabled: true,
        },
        deleteUser: {
            enabled: true,
        },
        additionalFields: {
            name: {
                type: "string",
                required: false,
            },
            image: {
                type: "string",
                required: false,
            },
        },
    },
    socialProviders: {
        google: {
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        },
    },
    session: {
        cookieCache: {
            enabled: true,
            strategy: "jwt",
            maxAge: 5 * 24 * 60 * 60
        },
        cookie: {
            secure: true,
            sameSite: "none",
        }
    },
    plugins: [
        jwt()
    ]
});
