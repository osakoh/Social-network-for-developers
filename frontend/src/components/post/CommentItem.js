import React, { useContext } from "react";
import { RiDeleteBack2Line } from "react-icons/ri";
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
    <div className='shadow bg-body rounded card-body mb-3'>
      <div className='row'>
        <div className='col-md-2'>
          <a href='profile.html'>
            <img
              className='img-fluid rounded-circle'
              src={comment.avatar}
              alt={auth.user.name}
            />
          </a>
          <br />
          <p className='float start mb-1 me-1'>{comment.name}</p>
        </div>

        <div className='col-md-10'>
          <p className='lead mb-2 float start mb-1 me-1'>{comment.text}</p>
          {comment.user === auth.user.id ? (
            <button
              onClick={() => onDeleteClickHandler(postId, comment._id)}
              type='button'
              className='btn btn-danger btn-sm mb-2 me-1'
            >
              <RiDeleteBack2Line />
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default CommentItem;
