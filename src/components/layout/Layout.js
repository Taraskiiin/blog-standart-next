import { useContext, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useUser } from "@auth0/nextjs-auth0/client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoins } from "@fortawesome/free-solid-svg-icons";

import { Logo } from "../logo";
import PostsContext from "../../context/postsContext";

export const Layout = ({
  children,
  availableTokens,
  posts: postsFromSSR,
  postId,
}) => {
  const { user } = useUser();
  const { setPostsFromSSR, posts, getPosts } = useContext(PostsContext);

  useEffect(() => {
    setPostsFromSSR(postsFromSSR);
  }, [postsFromSSR, setPostsFromSSR]);

  return (
    <div className='grid grid-cols-[300px_1fr] h-screen max-h-screen relative'>
      <div className='flex flex-col text-white overflow-hidden h-screen fixed max-w-[300px]'>
        <div className='bg-slate-800 px-2'>
          <Logo />
          <Link href='/post/new' className='btn'>
            New Post
          </Link>
          <Link href='/token-topup' className='block mt-2 text-center'>
            <FontAwesomeIcon icon={faCoins} className='text-yellow-500' />
            <span className='pl-1'>{availableTokens} tokens available</span>
          </Link>
        </div>
        <div className='flex-1 overflow-auto bg-gradient-to-b from-slate-800 to-cyan-800 px-4'>
          {posts.map((post) => (
            <Link
              key={post._id}
              href={`/post/${post._id}`}
              className={`block border border-white/0 text-ellipsis overflow-hidden whitespace-nowrap my-1 p-2 bg-white/10 cursor-pointer rounded-sm hover:border-white/40 hover:bg-white/20 ${
                postId === post._id && "bg-white/40 border-white/50 "
              }`}>
              {post.topic}
            </Link>
          ))}
          <div
            onClick={() => getPosts(posts[posts.length - 1].created)}
            className='hover:underline text-sm text-slate-500 text-center cursor-pointer mt-4 w-fit mx-auto'>
            Load more posts
          </div>
        </div>
        <div className='bg-cyan-800 flex items-center gap-2 border-t border-t-black/50 h-20 px-2'>
          {!!user ? (
            <>
              <div className='min-w-[50px]'>
                <Image
                  src={user.picture}
                  alt={user.name}
                  height={50}
                  width={50}
                  className='rounded-full'
                />
              </div>
              <div className='flex-1'>
                <div className='font-bold'>{user.email}</div>
                <Link className='text-sm' href='/api/auth/logout'>
                  Logout
                </Link>
              </div>
            </>
          ) : (
            <Link href='/api/auth/login'>Login</Link>
          )}
        </div>
      </div>
      <div className='ml-[300px] w-[calc(100vw-330px)]'>{children}</div>
    </div>
  );
};
