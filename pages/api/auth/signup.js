import { hashPassword } from "../../../lib/auth";
import {
  connectDatabase,
  getDocument,
  insertDocument,
} from "../../../lib/db-util";

async function handler(req, res) {
  if (req.method === "POST") {
    // connect to database (mongodb)
    let client;
    try {
      client = await connectDatabase();
    } catch (error) {
      res.status(500).json({ message: "Connecting to the database failed!" });
      return;
    }

    const data = req.body;
    const { email, password } = data;

    const existingUser = await getDocument(client, "users", { email: email });
    if (existingUser) {
      res.status(422).json({ message: "User exists already!" });
      client.close();
      return;
    }

    const hashedPassword = await hashPassword(password);

    // validasi request
    if (
      !email ||
      !email.includes("@") ||
      !password ||
      password.trim().length < 7
    ) {
      res.status(422).json({
        message:
          "Invalid input - password should also be at least 7 characters long.",
      });
      client.close();
      return;
    }

    // send data to database (mongodb)
    try {
      await insertDocument(client, "users", {
        email: email,
        password: hashedPassword,
      });
      res.status(201).json({ message: "Created user!" });
    } catch (error) {
      res.status(500).json({ message: "Creating user failed!" });
    }

    // close connection
    client.close();
  }
}

export default handler;
