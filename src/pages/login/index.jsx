import React, { Component } from 'react';

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
    return (
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
      </form>
    );
  }
}

export default Login;
