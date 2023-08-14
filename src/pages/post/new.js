import React, { useState } from "react";
import { useRouter } from "next/router";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRobot } from "@fortawesome/free-solid-svg-icons";

import { getAppProps } from "../../utils/getAppProps";
import { Layout } from "../../components/layout";

export default function NewPost(props) {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [topic, setTopic] = useState("");
  const [keywords, setKeywords] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
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
    } catch (e) {
      setLoading(false);
      console.error(e);
    }
  };

  return (
    <div className='h-full overflow-hidden'>
      {loading && (
        <div className='text-blue-300 flex h-full justify-center items-center'>
          <h6>Let me think...</h6>
          <FontAwesomeIcon icon={faRobot} className='text-4xl animate-spin' />
        </div>
      )}
      <div className='w-full h-full flex flex-col overflow-auto'>
        <form
          onSubmit={(e) => handleSubmit(e)}
          className='m-auto w-full max-w-screen-sm bg-slate-100 p-4 rounded-md shadow-xl border border-slate-200 shadow-slate-200'>
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
              maxLength={100}
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
              maxLength={100}
            />
            <small className='block mb-2'>Separate keywords with a comma</small>
          </div>
          <button
            type='submit'
            className='btn'
            disabled={!topic.trim() || !keywords.trim()}>
            Generate
          </button>
        </form>
      </div>
    </div>
  );
}

NewPost.getLayout = function getLayout(page, pageProps) {
  return <Layout {...pageProps}>{page}</Layout>;
};

export const getServerSideProps = withPageAuthRequired({
  async getServerSideProps(ctx) {
    const props = await getAppProps(ctx);

    if (!props.availableTokens) {
      return {
        redirect: {
          destination: "/token-topup",
          permanent: false,
        },
      };
    }

    return {
      props,
    };
  },
});