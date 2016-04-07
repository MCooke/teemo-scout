import React, { Component, PropTypes } from 'react';

const FuelSavingsTextInput = (props) => {
  const handleChange = (e) => {
    props.onChange(props.name, e.target.value);
  };

  return (
    <h1>Game Container</h1>
	);
};

FuelSavingsTextInput.propTypes = {
	name: PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired,
	placeholder: PropTypes.string,
	value: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number
	])
};

export default FuelSavingsTextInput;
