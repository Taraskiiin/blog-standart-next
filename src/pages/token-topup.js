import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { Layout } from "../components/layout";

export default function TokenToPup(props) {
  const handleClick = async () => {
    await fetch("/api/addTokens", {
      method: "POST",
    });
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

export const getServerSideProps = withPageAuthRequired(async () => {
  return {
    props: {},
  };
});
