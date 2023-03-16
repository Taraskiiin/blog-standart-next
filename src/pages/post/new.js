import { withPageAuthRequired } from '@auth0/nextjs-auth0';

export default function NewPost(props) {
  return (
    <>
      <h1>this new NewPost</h1>
    </>
  );
}

export const getServerSideProps = withPageAuthRequired(async () => {
  return {
    props: {},
  };
});
