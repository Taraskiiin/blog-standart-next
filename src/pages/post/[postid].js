import Head from 'next/head';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';

export default function Post() {
  return (
    <>
      <h1>this Post</h1>
    </>
  );
}

export const getServerSideProps = withPageAuthRequired(async () => {
  return {
    props: {},
  };
});
