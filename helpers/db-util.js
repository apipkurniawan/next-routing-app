import { MongoClient } from "mongodb";

export async function connectDatabase() {
  const client = await MongoClient.connect(
    "mongodb+srv://dbNext:02WxeZ8ZeppXhX7b@cluster0.wktg63i.mongodb.net/events?retryWrites=true&w=majority"
  );

  return client;
}

export async function insertDocument(client, collection, document) {
  const db = client.db();

  await db.collection(collection).insertOne(document);
}
