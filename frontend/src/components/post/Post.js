import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import postContext from "../context/post/postContext";
import Spinner from "../layout/Spinner";
import PostItem from "../posts/PostItem";
import CommentForm from "./CommentForm";
import CommentFeed from "./CommentFeed";

const Post = (props) => {
  const postCtx = useContext(postContext);
  // destructuring
  const { getPost, post, loading } = postCtx;

  let postContent;

  if (post === null || loading || Object.keys(post).length === 0) {
    postContent = <Spinner />;
  } else {
    postContent = (
      <div>
        <PostItem post={post} showActions={false} />
        <CommentForm postId={post._id} />
        <CommentFeed postId={post._id} comments={post.comments} />
      </div>
    );
  }

  // getPost
  useEffect(() => {
    getPost(props.match.params.id);

    // eslint-disable-next-line
  }, []);

  return (
    <div className='post'>
      <div className='container'>
        <div className='row'>
          <div className='col-md-12'>
            <Link to='/feed' className='btn btn-light mb-3'>
              Back To Feed
            </Link>
            {postContent}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
