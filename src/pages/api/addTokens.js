import { getSession } from "@auth0/nextjs-auth0";
import clientPromiss from "../../lib/mongoDB";

export default async function heandler(req, res) {
  const { user } = await getSession(req, res);

  const client = await clientPromiss;
  const db = client.db("roblog-next");

  const userProfile = await db.collection("users").updateOne(
    {
      auth0id: user.sub,
    },
    {
      $inc: {
        availableTokens: 10,
      },
      $setOnInsert: {
        auth0id: user.sub,
      },
    },
    {
      upsert: true,
    }
  );

  res.status(200).json({ name: "Taras" });
}
