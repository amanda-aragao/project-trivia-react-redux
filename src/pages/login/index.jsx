import React, { Component } from 'react';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import PropTypes from 'prop-types';
import { fetchQuestions, openSettings, saveUser } from '../../redux/actions';
import GameSettings from '../../components/GameSettings';
import logo from '../../trivia.png';
import '../../App.css';
import getTokens from '../../services/getTokes';

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

  handleClick = async (event) => {
    event.preventDefault();
    const { email } = this.state;
    const { dispatch, history } = this.props;
    const changeEmailforImg = md5(email).toString();
    dispatch(saveUser(this.state, changeEmailforImg));
    await getTokens();
    dispatch(fetchQuestions());
    history.push('/game');
  };

  render() {
    const { email, name, buttonIsDisable } = this.state;
    const { dispatch, settings } = this.props;
    return (
      settings
        ? <GameSettings />
        : (
          <>
            <header className="App-header">
              <img src={ logo } className="App-logo" alt="logo" />
              <p>SUA VEZ</p>
            </header>
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
          </>
        )

    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  settings: PropTypes.bool.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  settings: state.login.settings,
});

export default connect(mapStateToProps)(Login);
