import React, { useCallback, useReducer, useState } from "react";

const PostsContext = React.createContext({});
export default PostsContext;

function postReducer(state, action) {
  switch (action.type) {
    case "addPost": {
      const newPosts = [...state];
      action.posts.forEach((post) => {
        const exist = newPosts.find((e) => e._id === post._id);
        if (!exist) {
          newPosts.push(post);
        }
      });
      return newPosts;
    }
    case "deletePost": {
      return state.filter((post) => post._id !== action.postId);
    }
    default:
      return state;
  }
}

export const PostsProvider = ({ children }) => {
  const [posts, dispatch] = useReducer(postReducer, []);
  const [noMorePosts, setNoMorePosts] = useState(false);

  const deletePost = useCallback((postId) => {
    dispatch({
      type: "deletePost",
      postId,
    });
  }, []);

  const setPostsFromSSR = useCallback((postsFromSSR = []) => {
    dispatch({ type: "addPost", posts: postsFromSSR });
  }, []);

  const getPosts = useCallback(async (lastPostDate, getNewerPosts = false) => {
    const result = await fetch("/api/getPosts", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ lastPostDate, getNewerPosts }),
    });

    const json = await result.json();
    const getPostsResults = json.posts || [];
    if (getPostsResults.length < 5) {
      setNoMorePosts(true);
    }
    dispatch({ type: "addPost", posts: getPostsResults });
  }, []);

  return (
    <PostsContext.Provider
      value={{ posts, setPostsFromSSR, getPosts, noMorePosts, deletePost }}>
      {children}
    </PostsContext.Provider>
  );
};
