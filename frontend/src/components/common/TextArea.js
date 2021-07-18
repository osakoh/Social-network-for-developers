import React from "react";
import classnames from "classnames";
import PropTypes from "prop-types";

const TextArea = ({
  name,
  placeholder,
  value,
  error,
  info,
  onChange,
  isPressed,
}) => (
  <div className='form-group mb-3'>
    <textarea
      className={classnames("form-control", {
        "is-invalid": error,
        "is-valid": !error && isPressed,
      })}
      placeholder={placeholder}
      name={name}
      value={value}
      onChange={onChange}
    />
    {info && <small className='form-text text-muted'>{info}</small>}
    {error && <div className='invalid-feedback'>{error}</div>}
  </div>
);

TextArea.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  info: PropTypes.string,
  error: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  isPressed: PropTypes.bool,
};

export default TextArea;
