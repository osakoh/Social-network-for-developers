import React, { useState, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import TextField from "../common/TextField";
import TextArea from "../common/TextArea";
import profileContext from "../context/Profile/profileContext";

const AddEducation = () => {
  // init profile context
  const profileCtx = useContext(profileContext);
  // destructure from profile context
  const { errors, addEducation } = profileCtx;
  // init history
  const history = useHistory();
  // init states for adding experience
  const [state, setState] = useState({
    school: "",
    degree: "",
    fieldofstudy: "",
    from: "",
    to: "",
    current: false,
    description: "",
    disabled: false,
    pressed: false,
  });
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

  // disables the To field if checked
  const onCheckHandler = () => {
    setState({
      ...state,
      disabled: !state.disabled,
      current: !state.current,
      to: "",
    });
  };

  const onSubmitHandler = (e) => {
    e.preventDefault(); // prevent page refresh

    const newEdu = {
      school: state.school,
      degree: state.degree,
      fieldofstudy: state.fieldofstudy,
      from: state.from,
      to: state.to,
      current: state.current,
      description: state.description,
      disabled: state.disabled,
      pressed: state.pressed,
    };

    // add experience action
    addEducation(newEdu, history);
  };

  return (
    <section className='container'>
      <div className='row'>
        <div className='col-md-8 m-auto'>
          <Link to='/dashboard' className='btn btn-sm btn-primary mt-3 mb-3'>
            Back to dashboard
          </Link>
          <h4 className='card-header display-5 text-center rounded-3'>
            Add Education
          </h4>
          <p className='lead text-center'>
            Add any developer/programming positions that you have had in the
            past
          </p>
          <small className='d-block pb-3'>
            <span className='text-danger'>*</span> = required field
          </small>
          <form onSubmit={onSubmitHandler}>
            {/* School name */}
            <TextField
              placeholder='* Name of School'
              value={state.school}
              name='school'
              onChange={onChangeHandler}
              error={errors.school}
              isPressed={state.pressed}
            />
            {/* School name */}

            {/* Degree */}
            <TextField
              placeholder='* Degree'
              value={state.degree}
              name='degree'
              onChange={onChangeHandler}
              error={errors.degree}
              isPressed={state.pressed}
            />
            {/* Degree */}

            {/* Field of study */}
            <TextField
              placeholder='* Field of Study'
              value={state.fieldofstudy}
              name='fieldofstudy'
              onChange={onChangeHandler}
              error={errors.fieldofstudy}
              isPressed={state.pressed}
            />
            {/* Field of study */}

            {/* From */}
            <h6>From Date</h6>
            <TextField
              placeholder='* DD/MM/YYYY'
              value={state.from}
              name='from'
              onChange={onChangeHandler}
              error={errors.from}
              isPressed={state.pressed}
              type='date'
            />
            {/* From */}

            {/* To */}
            <h6>To Date</h6>
            <TextField
              placeholder='DD/MM/YYYY'
              value={state.to}
              name='to'
              onChange={onChangeHandler}
              error={errors.to}
              isPressed={state.pressed}
              type='date'
              disabled={state.disabled ? "disabled" : ""}
            />
            {/* To */}

            {/* Current check box */}
            <div className='form-check mb-3'>
              <input
                name='current'
                value={state.current}
                checked={state.current}
                className='form-check-input'
                type='checkbox'
                onChange={onCheckHandler}
                id='current'
              />
              <label className='form-check-label' htmlFor='current'>
                Current School
              </label>
            </div>
            {/* Current check box */}
            <TextArea
              placeholder='Program Description'
              value={state.description}
              name='description'
              onChange={onChangeHandler}
              error={errors.description}
              isPressed={state.pressed}
              info='Tell us more about your program'
            />
            {/* Job description */}

            {/* submit input: type submit */}
            <div className='d-grid'>
              <input
                onClick={onPressedHandler}
                type='submit'
                className='btn btn-dark btn-block mt-2'
                value='Add Education'
              />
            </div>
            {/* submit input: type submit */}
          </form>
        </div>
      </div>
    </section>
  );
};

export default AddEducation;
