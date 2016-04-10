import React, { Component, PropTypes } from 'react';

const FuelSavingsTextInput = (props) => {
  const handleChange = (e) => {
    props.onChange(props.name, e.target.value);
  };

  return (
  <div>
   <h1>Game Container</h1>
   <p>This is going to be fun</p>
    </div>
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
