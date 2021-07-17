import React, { useContext } from "react";
import authContext from "../context/Auth/authContext";
import postContext from "../context/post/postContext";

const CommentItem = ({ comment, postId }) => {
  // init both context
  const auth = useContext(authContext);
  const postCtx = useContext(postContext);
  // destructuring
  const { deleteComment } = postCtx;

  // deletes a single comment from a post
  const onDeleteClickHandler = (postId, commentId) => {
    deleteComment(postId, commentId);
  };

  return (
    <div className='card card-body mb-3'>
      <div className='row'>
        <div className='col-md-2'>
          <a href='profile.html'>
            <img
              className='rounded-circle d-none d-md-block'
              src={comment.avatar}
              alt={auth.user.name}
            />
          </a>
          <br />
          <p className='text-center'>{comment.name}</p>
        </div>
        <div className='col-md-10'>
          <p className='lead'>{comment.text}</p>
          {comment.user === auth.user.id ? (
            <button
              onClick={() => onDeleteClickHandler(postId, comment._id)}
              type='button'
              className='btn btn-sm btn-danger mr-1'
            >
              <i className='fas fa-times' />
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default CommentItem;
