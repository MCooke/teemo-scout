import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import TextInput from './TextInput';
import GameContainer from './GameContainer';

// Since this component is simple and static, there's no parent container for it.
const TeemoScout = () => {
    return (
      <div>
        <TextInput />
        <GameContainer />
      </div>
    );
};

export default TeemoScout;
