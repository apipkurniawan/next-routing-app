import { connectDatabase, insertDocument } from "../../helpers/db-util";

async function handler(req, res) {
  // connect to database (mongodb)
  let client;
  try {
    client = await connectDatabase();
  } catch (error) {
    res.status(500).json({ message: "Connecting to the database failed!" });
    return;
  }

  if (req.method === "POST") {
    const userEmail = req.body.email;

    if (!userEmail || !userEmail.includes("@")) {
      res.status(422).json({ message: "Invalid email address." });
      client.close();
      return;
    }

    // send data to database (mongodb)
    try {
      await insertDocument(client, "newsletter", { email: userEmail });
      res.status(201).json({ message: "Signed up!" });
    } catch (error) {
      res.status(500).json({ message: "Inserting data failed!" });
    }
  }

  // close connection
  client.close();
}

export default handler;
