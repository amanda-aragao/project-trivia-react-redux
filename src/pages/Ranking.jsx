import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Ranking extends Component {
  state = {
    rank: [],
  };

  componentDidMount() {
    const arrayRankking = JSON.parse(localStorage.getItem('rank'));
    this.setState({
      rank: arrayRankking.sort((a, b) => b.score - a.score),
    });
  }

  goHome = (event) => {
    event.preventDefault();
    const { history } = this.props;
    history.push('/');
  };

  render() {
    const { rank } = this.state;
    return (
      <div>
        <h1 data-testid="ranking-title">Ranking</h1>
        <button
          data-testid="btn-go-home"
          onClick={ this.goHome }
        >
          Inicio
        </button>
        {rank.map((player, index) => (
          <div key={ index }>
            <img src={ player.gravatarEmail } alt="avatar" />
            <p data-testid={ `player-name-${index}` }>{player.name}</p>
            <p data-testid={ `player-score-${index}` }>{player.score}</p>
          </div>
        ))}
      </div>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Ranking;
