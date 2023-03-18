import { getSession } from "@auth0/nextjs-auth0";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { ObjectId } from "mongodb";

import clientPromise from "../../lib/mongoDB";
import { Layout } from "../../components/layout";

export default function Post(props) {
  console.log(props);
  return (
    <>
      <h1>this Post</h1>
    </>
  );
}

Post.getLayout = function getLayout(page, pageProps) {
  return <Layout {...pageProps}>{page}</Layout>;
};

export const getServerSideProps = withPageAuthRequired({
  async getServerSideProps(ctx) {
    const userSession = await getSession(ctx.req, ctx.res);
    const client = await clientPromise;
    const db = client.db("roblog-next");

    const user = await db.collection("users").findOne({
      auth0id: userSession.user.sub,
    });

    const post = await db.collection("posts").findOne({
      _id: new ObjectId(ctx.params.postId),
      userId: user._id,
    });

    if (!post) {
      return {
        redirect: {
          destination: "/post/new",
          permanent: false,
        },
      };
    }

    return {
      props: {
        postContent: post.postContent,
        title: post.title,
        metaDescription: post.metaDescription,
        keywords: post.keywords,
      },
    };
  },
});
