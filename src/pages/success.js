import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { Layout } from "../components/layout";

import { getAppProps } from "../utils/getAppProps";

export default function Success() {
  return (
    <div>
      <h1>Thank you for your purchare!</h1>
    </div>
  );
}

Success.getLayout = function getLayout(page, pageProps) {
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
