import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { closeSettings } from '../../redux/actions';

class GameSettings extends Component {
  render() {
    const { dispatch } = this.props;
    return (
      <>
        <h1 data-testid="settings-title">Configurações do jogo</h1>
        <button
          type="button"
          onClick={ () => dispatch(closeSettings()) }
        >
          Salvar Configurações

        </button>
      </>
    );
  }
}
GameSettings.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default connect()(GameSettings);
