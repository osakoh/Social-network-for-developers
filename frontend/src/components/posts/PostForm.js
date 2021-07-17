import React, { useState, useContext, useEffect } from "react";
import postContext from "../context/post/postContext";
import authContext from "../context/Auth/authContext";
import TextArea from "../common/TextArea";

const PostForm = () => {
  // init both context
  const auth = useContext(authContext);
  const postCtx = useContext(postContext);
  // destructuring
  const { addPost, errors } = postCtx;
  // init state
  const [state, setState] = useState({
    errors: {},
    text: "",
  });

  // to update the error state
  useEffect(() => {
    setState({ ...state, errors: errors });

    // eslint-disable-next-line
  }, [errors.text, state.errors.text]);

  const onSubmitHandler = (e) => {
    e.preventDefault();

    const newPost = {
      text: state.text,
      name: auth.user.name,
      avatar: auth.user.avatar,
    };

    addPost(newPost);
    // clear text field
    setState({ ...state, text: "", pressed: false });
  };

  // captures input values dynamically using the 'name' attribute on the input field
  const onChangeHandler = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  // checks if the submit button has been pressed and sets the state of pressed to true
  const onPressedHandler = () => {
    setState({ ...state, pressed: true });
  };

  return (
    <div className='post-form mb-3'>
      <div className='card card-info'>
        <div className='card-header bg-info text-white'>Say Somthing...</div>
        <div className='card-body'>
          <form onSubmit={onSubmitHandler}>
            <div className='form-group'>
              <TextArea
                placeholder='Create a post'
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
                value='New Post'
              />
            </div>
            {/* submit input: type submit */}
          </form>
        </div>
      </div>
    </div>
  );
};

export default PostForm;
