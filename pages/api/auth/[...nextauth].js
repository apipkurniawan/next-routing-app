import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import { connectDatabase, getDocument } from "../../../lib/db-util";
import { verifyPassword } from "../../../lib/auth";

export default NextAuth({
  session: {
    jwt: true,
  },
  providers: [
    Providers.Credentials({
      async authorize(credentials) {
        const client = await connectDatabase();

        const user = await getDocument(client, "users", {
          email: credentials.email,
        });

        if (!user) {
          client.close();
          throw new Error("No user found!");
        }

        const isValidPassword = await verifyPassword(
          credentials.password,
          user.password
        );

        if (!isValidPassword) {
          client.close();
          throw new Error("Could not log you in!");
        }

        client.close();
        return { email: user.email };
      },
    }),
  ],
});
