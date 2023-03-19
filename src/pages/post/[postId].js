import React, { useState, useContext } from "react";
import { useRouter } from "next/router";
import { getSession } from "@auth0/nextjs-auth0";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { ObjectId } from "mongodb";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHashtag } from "@fortawesome/free-solid-svg-icons";
import { getAppProps } from "../../utils/getAppProps";

import clientPromise from "../../lib/mongoDB";
import { Layout } from "../../components/layout";
import PostsContext from "../../context/postsContext";

export default function Post(props) {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const router = useRouter();
  const { deletePost } = useContext(PostsContext);

  const handlerDeleteConfirm = async () => {
    try {
      const response = await fetch("/api/deletePost", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ postId: props.id }),
      });
      const json = await response.json();

      if (json.success) {
        deletePost(props.id);
        router.replace("/post/new");
      }
    } catch (e) {}
  };

  return (
    <div className='overlflow-auto h-full'>
      <div className='max-w-screen-sm mx-auto'>
        <div className='text-sm font-bold mt-6 p-2 bg-stone-200 rounded-sm'>
          SEO title and meta description
        </div>
        <div className='p-4 my-2 border border-stone-200 rounded-md'>
          <div className='text-blue-600 text-2xl font-bold'>{props.title}</div>
          <div className='mt-2 '>{props.metaDescription}</div>
        </div>
        <div className='text-sm font-bold mt-6 p-2 bg-stone-200 rounded-sm'>
          Keywords
        </div>
        <div className='flex flex-wrap pt-2 gap-1'>
          {props.keywords.split(",").map((keyword, i) => (
            <div key={i} className='p-2 rounded-full bg-slate-800 text-white'>
              <FontAwesomeIcon icon={faHashtag} />
              {keyword}
            </div>
          ))}
        </div>
        <div className='text-sm font-bold mt-6 p-2 bg-stone-200 rounded-sm'>
          Blog Post
        </div>
        <div dangerouslySetInnerHTML={{ __html: props.postContent || "" }} />
        <div className='my-4'>
          {showDeleteConfirm ? (
            <div>
              <p className='p-2 bg-red-300 text-center'>
                Are you sure you want to delete this post? This action is
                irreversible
              </p>
              <div className='grid grid-cols-2 gap-2'>
                <button
                  className='btn'
                  onClick={() => setShowDeleteConfirm(false)}>
                  Cancel
                </button>
                <button
                  className='btn hover:underline bg-red-600 hover:bg-red-700'
                  onClick={handlerDeleteConfirm}>
                  Confirm delete
                </button>
              </div>
            </div>
          ) : (
            <button
              onClick={() => setShowDeleteConfirm(true)}
              className='btn hover:underline bg-red-600 hover:bg-red-700'>
              DELETE POST
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

Post.getLayout = function getLayout(page, pageProps) {
  return <Layout {...pageProps}>{page}</Layout>;
};

export const getServerSideProps = withPageAuthRequired({
  async getServerSideProps(ctx) {
    const props = await getAppProps(ctx);
    const userSession = await getSession(ctx.req, ctx.res);
    const client = await clientPromise;
    const db = client.db("roblog-next");
    const id = ctx.params.postId;

    const user = await db.collection("users").findOne({
      auth0id: userSession.user.sub,
    });

    const post = await db.collection("posts").findOne({
      _id: new ObjectId(id),
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
        id: id,
        postContent: post.postContent,
        title: post.title,
        metaDescription: post.metaDescription,
        keywords: post.keywords,
        postCreated: post.created.toString(),
        ...props,
      },
    };
  },
});
