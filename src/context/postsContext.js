import React, { useCallback, useState } from "react";

const PostsContext = React.createContext({});
export default PostsContext;

export const PostsProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);

  const setPostsFromSSR = useCallback((postsFromSSR = []) => {
    setPosts(postsFromSSR);
  }, []);

  const getPosts = useCallback(async (lastPostDate) => {
    const result = await fetch("/api/getPosts", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ lastPostDate }),
    });
    const json = await result.json();
    const getPostsResults = json.posts || [];

    setPosts((value) => {
      const newPosts = [...value];
      getPostsResults.forEach((post) => {
        const exist = newPosts.find((e) => e._id === post._id);
        if (!exist) {
          newPosts.push(post);
        }
      });
      return newPosts;
    });
  }, []);

  return (
    <PostsContext.Provider value={{ posts, setPostsFromSSR, getPosts }}>
      {children}
    </PostsContext.Provider>
  );
};
