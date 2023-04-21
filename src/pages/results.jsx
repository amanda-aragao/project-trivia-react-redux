import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header/Header';

const validateAssertions = 3;

class Feedback extends Component {
  render() {
    const { assertions } = this.props;
    return (
      <div>
        <Header />
        <h1>Feedback</h1>
        <p data-testid="feedback-text">
          {
            assertions < validateAssertions ? 'Could be better...' : 'Well Done!'
          }

        </p>
      </div>
    );
  }
}

Feedback.propTypes = {
  assertions: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  assertions: state.player.assertions,
});

export default connect(mapStateToProps)(Feedback);
