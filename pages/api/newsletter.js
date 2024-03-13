import { getSession } from "next-auth/client";
import { connectDatabase, insertDocument } from "../../lib/db-util";

async function handler(req, res) {
  if (req.method !== "POST") {
    return;
  }

  const session = await getSession({ req: req });
  console.log("session : ", session);
  if (!session) {
    res.status(401).json({ message: "Not authenticated!" });
    return;
  }

  const userEmail = req.body.email;
  if (!userEmail || !userEmail.includes("@")) {
    res.status(422).json({ message: "Invalid email address." });
    return;
  }

  // connect to database (mongodb)
  let client;
  try {
    client = await connectDatabase();
  } catch (error) {
    res.status(500).json({ message: "Connecting to the database failed!" });
    return;
  }

  // send data to database (mongodb)
  try {
    await insertDocument(client, "newsletter", { email: userEmail });
    res.status(201).json({ message: "Signed up!" });
  } catch (error) {
    res.status(500).json({ message: "Inserting data failed!" });
  }

  // close connection
  client.close();
}

export default handler;
