import Link from 'next/link';
import Image from 'next/image';
import { useUser } from '@auth0/nextjs-auth0/client';

export default function Home() {
  const { user } = useUser();

  console.log('user', user);

  return (
    <>
      <h1>this home</h1>
      <div>
        {!!user ? (
          <>
            <Image src={user.picture} alt={user.name} height={50} width={50} />
            <div>{user.email}</div>
            <Link href='/api/auth/logout'>Logout</Link>
          </>
        ) : (
          <Link href='/api/auth/login'>Login</Link>
        )}
      </div>
    </>
  );
}
