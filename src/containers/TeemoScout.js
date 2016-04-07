import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class TeemoScoutPage extends Component {
  render() {
    return (
      <h1> hello </h1>
    );
  }
}

export default connect()(TeemoScoutPage);
