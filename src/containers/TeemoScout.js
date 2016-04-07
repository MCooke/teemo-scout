import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import TeemoScout from '../components/TeemoScout';

class TeemoScoutPage extends Component {
  render() {
    return (
      <TeemoScout />
    );
  }
}

export default connect()(TeemoScoutPage);
