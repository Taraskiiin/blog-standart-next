import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { Layout } from "../components/layout";

import { getAppProps } from "../utils/getAppProps";

export default function TokenToPup(props) {
  const handleClick = async () => {
    const result = await fetch("/api/addTokens", {
      method: "POST",
    });
    const json = await result.json();
    window.location.href = json.session.url;
  };

  return (
    <>
      <h1>this new Token</h1>
      <button className='btn' onClick={handleClick}>
        Add tokens
      </button>
    </>
  );
}

TokenToPup.getLayout = function getLayout(page, pageProps) {
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
