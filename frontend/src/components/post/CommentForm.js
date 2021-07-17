import React, { useContext, useState, useEffect } from "react";
import authContext from "../context/Auth/authContext";
import postContext from "../context/post/postContext";
import TextArea from "../common/TextArea";

const CommentForm = ({ postId }) => {
  // init both context
  const auth = useContext(authContext);
  const postCtx = useContext(postContext);
  // destructuring
  const { addComment, errors } = postCtx;
  // init state
  const [state, setState] = useState({
    errors: {},
    text: "",
  });

  // to update the error state
  useEffect(() => {
    setState({ ...state, errors: errors });
    console.log("CommentForm", state.errors.text, errors.text);

    // eslint-disable-next-line
  }, [errors.text, state.errors.text]);

  // checks if the submit button has been pressed and sets the state of pressed to true
  const onPressedHandler = () => {
    setState({ ...state, pressed: true });
  };

  // captures input values dynamically using the 'name' attribute on the input field
  const onChangeHandler = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();

    const newComment = {
      text: state.text,
      name: auth.user.name,
      avatar: auth.user.avatar,
    };

    addComment(postId, newComment);
    // reset form
    setState({ ...state, text: "" });
  };

  return (
    <div className='post-form mb-3'>
      <div className='card card-info'>
        <div className='card-header bg-info text-white'>Comment on post...</div>
        <div className='card-body'>
          <form onSubmit={onSubmitHandler}>
            <div className='form-group'>
              <TextArea
                placeholder='Reply to post'
                name='text'
                value={state.text}
                onChange={onChangeHandler}
                error={errors.text}
                isPressed={state.pressed}
              />
            </div>
            {/* submit input: type submit */}
            <div className='d-grid'>
              <input
                onClick={onPressedHandler}
                type='submit'
                className='btn btn-dark btn-sm btn-block mt-2'
                value='Comment'
              />
            </div>
            {/* submit input: type submit */}
          </form>
        </div>
      </div>
    </div>
  );
};

export default CommentForm;
