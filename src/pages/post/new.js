import React, { useState } from "react";
import { useRouter } from "next/router";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRobot } from "@fortawesome/free-solid-svg-icons";

import { getAppProps } from "../../utils/getAppProps";
import { Layout } from "../../components/layout";

export default function NewPost(props) {
  const router = useRouter();
  const [topic, setTopic] = useState("");
  const [keywords, setKeywords] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("/api/generatePost", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ topic, keywords }),
    });

    const json = await response.json();

    if (json?.post) {
      router.push(`/post/${json.post}`);
    }
  };

  return (
    <>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div>
          <label>
            <strong>
              Genetare a roblog
              <FontAwesomeIcon
                icon={faRobot}
                className='text-sm text-blue-300'
              />{" "}
              post on the topic of:
            </strong>
          </label>
          <textarea
            className='resize-none border border-slate-500 w-full block my-2 px-4 py-2 rounded-sm'
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
          />
        </div>
        <div>
          <label>
            <strong>Targeting the following keywords:</strong>
          </label>
          <textarea
            className='resize-none border border-slate-500 w-full block my-2 px-4 py-2 rounded-sm'
            value={keywords}
            onChange={(e) => setKeywords(e.target.value)}
          />
        </div>
        <button type='submit' className='btn'>
          Generate
        </button>
      </form>
    </>
  );
}

NewPost.getLayout = function getLayout(page, pageProps) {
  return <Layout {...pageProps}>{page}</Layout>;
};

export const getServerSideProps = withPageAuthRequired({
  async getServerSideProps(ctx) {
    const props = await getAppProps(ctx);
    return {
      props,
    };
  },
});
