import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './Header.css';

class Header extends React.Component {
  render() {
    const { name, scoreBoard, imgGravatar, score } = this.props;

    return (
      <header>
        <div>
          <img
            data-testid="header-profile-picture"
            src={ imgGravatar }
            alt={ name }
          />
          <p data-testid="header-player-name">
            {name}
          </p>
        </div>
        <p data-testid="header-score">
          { score > 0 ? score : scoreBoard }
        </p>
      </header>
    );
  }
}
Header.propTypes = {
  name: PropTypes.string.isRequired,
  scoreBoard: PropTypes.number.isRequired,
  imgGravatar: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  name: state.login.name,
  scoreBoard: state.login.scoreBoard,
  imgGravatar: state.login.imgGravatar,
  score: state.player.score,
});
export default connect(mapStateToProps)(Header);
