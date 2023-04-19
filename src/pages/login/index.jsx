import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { openSettings } from '../../redux/actions';
import GameSettings from '../../components/GameSettings';

const MIN_LENGTH = 0;

class Login extends Component {
  state = {
    email: '',
    name: '',
    buttonIsDisable: true,
  };

  handleChange = ({ target }) => {
    this.setState({
      [target.name]: target.value,
    });

    const { email, name } = this.state;
    if (email.length > MIN_LENGTH && name.length > MIN_LENGTH) {
      this.setState({
        buttonIsDisable: false,
      });
    }
  };

  render() {
    const { email, name, buttonIsDisable } = this.state;
    const { dispatch, settings } = this.props;
    return (
      settings
        ? <GameSettings />
        : (
          <form>
            <input
              type="email"
              name="email"
              onChange={ this.handleChange }
              value={ email }
              placeholder="Digite seu email"
              data-testid="input-gravatar-email"
            />
            <input
              type="text"
              name="name"
              onChange={ this.handleChange }
              value={ name }
              placeholder="Digite seu nome"
              data-testid="input-player-name"
            />

            <button
              type="button"
              data-testid="btn-play"
              onClick={ this.handleClick }
              disabled={ buttonIsDisable }
            >
              Play

            </button>
            <button
              type="button"
              data-testid="btn-settings"
              onClick={ () => dispatch(openSettings()) }
            >
              Configurações

            </button>
          </form>
        )

    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  settings: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  settings: state.login.settings,
});

export default connect(mapStateToProps)(Login);
