import React, { useContext, useEffect } from "react";
import postContext from "../context/post/postContext";
import Spinner from "../layout/Spinner";
import PostForm from "./PostForm";
import PostFeed from "./PostFeed";

const Posts = () => {
  // init post context
  const postCtx = useContext(postContext);
  // destructuring
  const { getPosts, posts, loading } = postCtx;

  // getPosts
  useEffect(() => {
    getPosts();
    // eslint-disable-next-line
  }, []);

  let postContent;

  if (posts === null || loading) {
    postContent = <Spinner />;
  } else {
    postContent = <PostFeed posts={posts} />;
  }

  return (
    <div className='feed'>
      <div className='container'>
        <div className='row'>
          <div className='col-md-12 p-2'>
            <PostForm />
            {postContent}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Posts;
