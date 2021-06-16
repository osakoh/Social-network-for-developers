import React from "react";
import classnames from "classnames";
import PropTypes from "prop-types";

const TextField = ({
  name,
  placeholder,
  value,
  label,
  error,
  info,
  type,
  onChange,
  disabled,
  isPressed,
}) => (
  <div className='form-group mb-3'>
    <input
      type={type}
      className={classnames("form-control form-control-lg", {
        "is-invalid": error,
        "is-valid": !error && isPressed,
      })}
      placeholder={placeholder}
      name={name}
      value={value}
      label={label}
      onChange={onChange}
      disabled={disabled}
    />
    {info && <small className='form-text text-muted'>{info}</small>}
    {error && <div className='invalid-feedback'>{error}</div>}
  </div>
);

TextField.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  info: PropTypes.string,
  error: PropTypes.string,
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.string,
  isPressed: PropTypes.bool,
};

TextField.defaultProps = {
  type: "text",
};
export default TextField;
