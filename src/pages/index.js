import Link from 'next/link';

export default function Home() {
  return (
    <>
      <h1>this home</h1>
      <div>
        <Link href='/api/auth/login'>Login</Link>
      </div>
    </>
  );
}
