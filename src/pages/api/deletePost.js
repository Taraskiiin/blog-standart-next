import { getSession, withApiAuthRequired } from "@auth0/nextjs-auth0";
import { ObjectId } from "mongodb";
import clientPromise from "../../lib/mongoDB";

export default withApiAuthRequired(async function handler(req, res) {
  try {
    const {
      user: { sub },
    } = await getSession(req, res);
    const client = await clientPromise;
    const db = client.db("roblog-next");
    const user = await db.collection("users").findOne({
      auth0id: sub,
    });

    const { postId } = req.body;

    await db.collection("posts").deleteOne({
      userId: user._id,
      _id: new ObjectId(postId),
    });

    res.status(200).json({ success: true });
  } catch (e) {
    console.error(e);
  }
  return;
});
