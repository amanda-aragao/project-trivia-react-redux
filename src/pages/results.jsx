import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header/Header';
import { clearPlayerState, saveUserRank, updateRank } from '../redux/actions';

const validateAssertions = 3;

class Feedback extends Component {
  playAgain = (event) => {
    event.preventDefault();
    const { history } = this.props;
    history.push('/');
  };

  goToRanking = (event) => {
    event.preventDefault();
    const { history, playerRank, dispatch, rank } = this.props;
    if (rank.length === 0) {
      dispatch(saveUserRank(playerRank));
    } else {
      dispatch(updateRank(playerRank));
    }
    dispatch(clearPlayerState());
    history.push('/ranking');
  };

  render() {
    const { assertions, score } = this.props;
    return (
      <div>
        <Header />
        <h1>Feedback</h1>
        <p data-testid="feedback-text">
          {
            assertions < validateAssertions ? 'Could be better...' : 'Well Done!'
          }
        </p>
        <p>
          Parabens, você fez:
          {' '}
          <span data-testid="feedback-total-score">{score}</span>
        </p>
        <p>
          Parabens, você acertou:
          {' '}
          <span data-testid="feedback-total-question">
            {assertions}
          </span>
        </p>
        <button
          data-testid="btn-play-again"
          onClick={ this.playAgain }
        >
          Play Again
        </button>

        <button
          data-testid="btn-ranking"
          onClick={ this.goToRanking }
        >
          Ranking
        </button>
      </div>
    );
  }
}

Feedback.propTypes = {
  dispatch: PropTypes.func.isRequired,
  assertions: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
  playerRank: PropTypes.shape().isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  rank: PropTypes.arrayOf().isRequired,
};

const mapStateToProps = (state) => ({
  assertions: state.player.assertions,
  score: state.player.score,
  playerRank: state.player,
  rank: state.rank,
});

export default connect(mapStateToProps)(Feedback);
