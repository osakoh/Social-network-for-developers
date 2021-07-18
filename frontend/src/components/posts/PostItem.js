import React, { useContext } from "react";
import classnames from "classnames";
import { Link } from "react-router-dom";
import { AiTwotoneLike, AiOutlineLike, AiTwotoneDislike } from "react-icons/ai";
import { RiChatDeleteFill } from "react-icons/ri";
import authContext from "../context/Auth/authContext";
import postContext from "../context/post/postContext";

const PostItem = ({ showActions, post }) => {
  // init both context
  const auth = useContext(authContext);
  const postCtx = useContext(postContext);
  // destructuring
  const { deletePost, addLike, removeLike } = postCtx;

  // functions
  const onDeleteClickHandler = (id) => {
    deletePost(id);
  };

  const onLikeClickHandler = (id) => {
    addLike(id);
  };

  const onUnlikeClickHandler = (id) => {
    removeLike(id);
  };

  const findUserLike = (likes) => {
    if (likes.filter((like) => like.user === auth.user.id).length > 0) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <div className='shadow bg-body rounded  card-body mb-3'>
      <div className='row'>
        <div className='col-md-2 col-sm-4'>
          {/* check here */}
          <a href={`/profile/user/${post.user}`}>
            <img
              className='img-fluid rounded-circle'
              src={post.avatar}
              alt={auth.user.name}
            />
          </a>
          {/* check here */}

          <br />
          <p className='text-center mt-2 mb-2'>{post.name}</p>
        </div>

        <div className='col-md-8 col-sm-6'>
          <p className='lead'>{post.text}</p>
        </div>
        <div className='card-footer float-start bg-white'>
          {/* showActions props from post/Post.js  */}
          {showActions ? (
            <span>
              {/* like post */}
              <button
                onClick={() => onLikeClickHandler(post._id)}
                type='button'
                className='btn btn-light btn-sm mb-2 me-1'
              >
                {findUserLike(post.likes) ? (
                  <AiTwotoneLike
                    className={classnames({
                      "text-info": findUserLike(post.likes),
                      // "text-white": !findUserLike(post.likes),
                    })}
                    style={{ fontSize: "1.0rem" }}
                  />
                ) : (
                  <AiOutlineLike
                    className={classnames({
                      "text-info": findUserLike(post.likes),
                      // "text-white": !findUserLike(post.likes),
                    })}
                    style={{ fontSize: "1.0rem" }}
                  />
                )}
                <span className='badge badge-light text-dark'>
                  {post.likes.length}
                </span>
              </button>
              {/* like post */}

              {/* unlike post */}
              <button
                onClick={() => onUnlikeClickHandler(post._id)}
                type='button'
                className='btn btn-light btn-sm mb-2 me-1'
              >
                <AiTwotoneDislike
                  className='text-secondary'
                  style={{ fontSize: "1.0rem" }}
                />
              </button>
              {/* unlike post */}

              {/* delete post if auth user own post */}
              {post.user === auth.user.id ? (
                <button
                  onClick={() => onDeleteClickHandler(post._id)}
                  type='button'
                  className='btn btn-danger btn-sm mb-2 me-1'
                >
                  <RiChatDeleteFill />
                </button>
              ) : null}
              {/* delete post if auth user own post */}

              {/* view comments for a single post */}
              <Link
                to={`/post/${post._id}`}
                className='mx-1'
                style={{ textDecoration: "none" }}
              >
                <span className='text-dark commentLink'>
                  {post.comments.length}
                  {post.comments.length > 1 ? " comments" : " comment"}
                </span>
              </Link>
              {/* view comments for a single post */}
            </span>
          ) : null}
          {/* showActions props from post/Post.js  */}
        </div>
      </div>
    </div>
  );
};

PostItem.defaultProps = {
  showActions: true,
};

export default PostItem;
