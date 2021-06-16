import React from "react";
import classnames from "classnames";
import PropTypes from "prop-types";

const InputGroup = ({
  name,
  placeholder,
  value,
  error,
  icon,
  type,
  onChange,
  isPressed,
}) => {
  return (
    <div className='input-group mb-3'>
      <span className='input-group-text'>{icon}</span>
      <input
        type={type}
        className={classnames("form-control form-control-lg", {
          "is-invalid": error,
          "is-valid": !error && isPressed,
        })}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
      />
      {error && <div className='invalid-feedback'>{error}</div>}
    </div>
  );
};

InputGroup.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  icon: PropTypes.object,
  type: PropTypes.string.isRequired,
  error: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  isPressed: PropTypes.bool,
};

InputGroup.defaultProps = {
  type: "text",
};
export default InputGroup;
