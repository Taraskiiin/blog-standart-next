import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import { Layout } from '../../components/layout';

export default function NewPost(props) {
  return (
    <>
      <h1>this new NewPost</h1>
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
