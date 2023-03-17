import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import { Layout } from '../../components/layout';

export default function NewPost(props) {
  const handleClick = async () => {
    const response = await fetch('/api/generatePost', {
      method: 'POST',
    });
    const json = await response.json();
    console.log('result', json);
  };

  return (
    <>
      <h1>this new NewPost</h1>
      <button className='btn' onClick={handleClick}>
        Generate
      </button>
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
