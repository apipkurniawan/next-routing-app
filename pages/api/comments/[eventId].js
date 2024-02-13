import { connectDatabase, insertDocument } from "../../../helpers/db-util";
async function handler(req, res) {
  const eventId = req.query.eventId;

  // connect to database (mongodb)
  let client;
  try {
    client = await connectDatabase();
  } catch (error) {
    res.status(500).json({ message: "Connecting to the database failed!" });
    return;
  }

  if (req.method === "GET") {
    const db = client.db();
    const documents = await db
      .collection("comments")
      .find()
      .sort({ _id: -1 })
      .toArray();

    res.status(200).json({ comments: documents });
  }

  if (req.method === "POST") {
    const { email, name, text } = req.body;

    if (
      !email.includes("@") ||
      !name ||
      name.trim() == "" ||
      !text ||
      text.trim() == ""
    ) {
      res.status(422).json({ message: "Invalid input." });
      return;
    }

    const newComment = {
      email,
      name,
      text,
      eventId,
    };

    // send data to database (mongodb)
    try {
      const result = await insertDocument(client, "comments", newComment);
      newComment.id = result.insertedId;
      client.close();
    } catch (error) {
      res.status(500).json({ message: "Inserting data failed!" });
      return;
    }

    console.log(result);

    res.status(201).json({ message: "Added comment!", comment: newComment });
  }

  client.close();
}

export default handler;
