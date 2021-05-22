import React from "react";
import classnames from "classnames";
import PropTypes from "prop-types";

const SelectInput = ({
  name,
  value,
  error,
  info,
  onChange,
  options,
  isPressed,
}) => {
  const selectOptions = options.map((option) => (
    <option key={option.label} value={option.value}>
      {option.label}
    </option>
  ));

  return (
    <div className="form-group mb-3">
      <select
        className={classnames("form-control form-control-lg", {
          "is-invalid": error,
          "is-valid": !error && isPressed,
        })}
        name={name}
        value={value}
        onChange={onChange}
      >
        {selectOptions}
      </select>
      {info && <small className="form-text text-muted">{info}</small>}
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};
SelectInput.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  info: PropTypes.string,
  error: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.array.isRequired,
  isPressed: PropTypes.bool,
};

export default SelectInput;
