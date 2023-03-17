import React, { useState } from "react";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { Layout } from "../../components/layout";

export default function NewPost(props) {
  const [postContent, setPostContent] = useState("");
  const handleClick = async () => {
    const response = await fetch("/api/generatePost", {
      method: "POST",
    });
    const json = await response.json();
    const string = json.post;

    setPostContent(JSON.parse(string));
  };

  return (
    <>
      <h1>this new NewPost</h1>
      <button className='btn' onClick={handleClick}>
        Generate
      </button>
      <div
        className='max-w-screen-sm p-10'
        dangerouslySetInnerHTML={{ __html: postContent.postContent }}
      />
    </>
  );
}

NewPost.getLayout = function getLayout(page, pageProps) {
  return <Layout {...pageProps}>{page}</Layout>;
};

export const getServerSideProps = withPageAuthRequired(async () => {
  return {
    props: {},
  };
});
