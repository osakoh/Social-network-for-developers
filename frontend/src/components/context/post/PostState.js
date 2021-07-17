import { useReducer } from "react";
import axios from "axios";
import postReducer from "./postReducer";
import postContext from "./postContext";
import {
  ADD_POST,
  GET_ERRORS,
  CLEAR_ERRORS,
  GET_POSTS,
  GET_POST,
  POST_LOADING,
  DELETE_POST,
} from "../types";

const PostState = (props) => {
  // initial state
  const initialState = {
    posts: [],
    post: {},
    loading: false,
    errors: {},
  };

  // useReducer
  const [state, dispatch] = useReducer(postReducer, initialState);

  // functions

  // Clear errors
  const clearErrors = () => {
    return {
      type: CLEAR_ERRORS,
    };
  };

  // Set loading state
  const setPostLoading = () => {
    return {
      type: POST_LOADING,
    };
  };

  // Add Post
  const addPost = async (postData) => {
    try {
      dispatch(clearErrors());

      const res = await axios.post("/api/posts", postData);

      dispatch({ type: ADD_POST, payload: res.data });
    } catch (error) {
      dispatch({
        type: GET_ERRORS,
        payload: error.response.data,
      });
    }
  };

  // Get Posts
  const getPosts = async () => {
    try {
      dispatch(setPostLoading());

      const res = await axios.get("/api/posts");

      dispatch({ type: GET_POSTS, payload: res.data });
    } catch (error) {
      dispatch({ type: GET_POSTS, payload: null });
    }
  };

  // Get single Post
  const getPost = async (id) => {
    try {
      dispatch(setPostLoading());

      const res = await axios.get(`/api/posts/${id}`);
      dispatch({ type: GET_POST, payload: res.data });
    } catch (error) {
      dispatch({ type: GET_POST, payload: null });
    }
  };

  // Delete Post
  const deletePost = async (id) => {
    try {
      const res = await axios.delete(`/api/posts/${id}`);

      dispatch({ type: DELETE_POST, payload: id });
    } catch (error) {
      dispatch({
        type: GET_ERRORS,
        payload: error.response.data,
      });
    }
  };

  // Add Like
  const addLike = async (id) => {
    try {
      const res = await axios.post(`/api/posts/like/${id}`);
      dispatch(getPosts());
    } catch (error) {
      dispatch({ type: GET_ERRORS, payload: error.response.data });
    }
  };

  // unlike/remove Like
  const removeLike = async (id) => {
    try {
      const res = await axios.post(`/api/posts/unlike/${id}`);

      dispatch(getPosts());
    } catch (error) {
      dispatch({ type: GET_ERRORS, payload: error.response.data });
    }
  };

  // Add Comment
  const addComment = async (postId, commentData) => {
    try {
      dispatch(clearErrors());

      const res = await axios.post(`/api/posts/comment/${postId}`, commentData);

      dispatch({ type: GET_POST, payload: res.data });
    } catch (error) {
      dispatch({ type: GET_ERRORS, payload: error.response.data });
    }
  };

  // Delete Comment
  const deleteComment = async (postId, commentId) => {
    try {
      const res = await axios.delete(
        `/api/posts/comment/${postId}/${commentId}`
      );

      dispatch({ type: GET_POST, payload: res.data });
    } catch (error) {
      dispatch({ type: GET_ERRORS, payload: error.response.data });
    }
  };

  // return context provider
  return (
    <postContext.Provider
      value={{
        // state variables
        posts: state.posts,
        post: state.post,
        loading: state.loading,
        errors: state.errors,

        // functions/methods
        clearErrors,
        setPostLoading,
        addPost,
        getPosts,
        getPost,
        deletePost,
        addLike,
        removeLike,
        addComment,
        deleteComment,
      }}
    >
      {props.children}
    </postContext.Provider>
  );
};

export default PostState;
