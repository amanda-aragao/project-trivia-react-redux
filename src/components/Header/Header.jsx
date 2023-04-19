import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends React.Component {
  render() {
    const { name, scoreBoard, imgGravatar } = this.props;

    return (
      <>
        <img
          data-testid="header-profile-picture"
          src={ imgGravatar }
          alt={ name }
        />
        <p data-testid="header-player-name">
          {name}
        </p>
        <p data-testid="header-score">
          { scoreBoard }
        </p>
      </>
    );
  }
}
Header.propTypes = {
  name: PropTypes.string.isRequired,
  scoreBoard: PropTypes.number.isRequired,
  imgGravatar: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  name: state.login.name,
  scoreBoard: state.login.scoreBoard,
  imgGravatar: state.login.imgGravatar,
});
export default connect(mapStateToProps)(Header);
