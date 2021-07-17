import React, { useContext } from "react";
import classnames from "classnames";
import { Link } from "react-router-dom";
import { AiTwotoneLike, AiTwotoneDislike } from "react-icons/ai";
import { RiChatDeleteFill } from "react-icons/ri";
import authContext from "../context/Auth/authContext";
import postContext from "../context/post/postContext";
import profileContext from "../context/Profile/profileContext";

const PostItem = ({ showActions, post }) => {
  // init both context
  const auth = useContext(authContext);
  const postCtx = useContext(postContext);
  const profileCtx = useContext(profileContext);
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

  console.log("From PostItem: post", post.user);

  return (
    <div className='card card-body mb-3'>
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

          {/* showActions props from post/Post.js  */}
          {showActions ? (
            <span>
              {/* like post */}
              <button
                onClick={() => onLikeClickHandler(post._id)}
                type='button'
                className='btn btn-light btn-sm mb-2 me-1'
              >
                {/* <i
                  className={classnames("fas fa-thumbs-up", {
                    "text-info": findUserLike(post.likes),
                  })}
                /> */}
                <AiTwotoneLike
                  className={classnames({
                    "text-info": findUserLike(post.likes),
                    "text-white": !findUserLike(post.likes),
                  })}
                  style={{ fontSize: "1.20rem" }}
                />
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
                  style={{ fontSize: "1.20rem" }}
                />
              </button>
              {/* unlike post */}

              {/* view comments for a single post */}
              <Link
                to={`/post/${post._id}`}
                className='btn btn-sm mb-2 btn-info me-1'
                style={{ textDecoration: "none" }}
              >
                {post.comments.length}
                {post.comments.length > 0 ? " comments" : " comment"}
              </Link>
              {/* view comments for a single post */}

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
