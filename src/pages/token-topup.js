import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import { Layout } from '../components/layout';

export default function TokenToPup(props) {
  return (
    <>
      <h1>this new Token</h1>
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
