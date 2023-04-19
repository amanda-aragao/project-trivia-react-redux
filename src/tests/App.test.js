import { act, getByRole, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {renderWithRouterAndRedux} from '../tests/helpers/renderWithRouterAndRedux'
import Login from '../pages/Login';
import App from '../App';


const getTokens = require('../services/getTokes')

describe('Desenvolva testes referente a tela de Login', () => {
  const emailInputID = 'input-gravatar-email'
  const nameInputId = 'input-player-name'
  const nameTest = 'n'
  const user = {
    email: 'teste@teste.com',
    name: 'Joãozinho',
  }
  test('Teste se existe um input para e-mail, name, botão na tela de Login', () => {
    renderWithRouterAndRedux(<Login />);
    const emailInput = screen.getByTestId(emailInputID);
    expect(emailInput).toBeInTheDocument();
    const nameInput = screen.getByTestId(nameInputId);
    expect(nameInput).toBeInTheDocument();
    const buttonTest = screen.getByRole('button', {
      name: /play/i
    })
    expect(buttonTest).toBeInTheDocument();
    expect(buttonTest).toBeDisabled();
  });

  test('Teste se o botão inicia desabilidado e habilita ao ser preenchido', () => {
    renderWithRouterAndRedux(<Login />);
    const emailInput = screen.getByTestId(emailInputID);
    const nameInput = screen.getByTestId(nameInputId);
    userEvent.type(emailInput, user.email);
    userEvent.type(nameInput, user.name);
    

    const buttonTest = screen.getByRole('button', {
      name: /play/i
    })
    expect(buttonTest).not.toBeDisabled();

  });
  
  test('Teste se ao clicar no botão a função é chamada', async () => {
    const token = { 
      token : '7af87870a0384d27659a18b9bd620e0b2303b9d90e6258eac0fc20fb2817445c',
    }

    const { history } = renderWithRouterAndRedux(<App />);
    const emailInput = screen.getByTestId(emailInputID);
    const nameInput = screen.getByTestId(nameInputId);
    userEvent.type(emailInput, user.email);
    userEvent.type(nameInput, user.name);
    const buttonTest = screen.getByRole('button', {
      name: /play/i
    })
    
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValueOnce({
      json: jest.fn().mockResolvedValue(token),
    });
    userEvent.click(buttonTest);
    act(() => {
      history.push('/game');
    })
//   expect(global.fetch).toBeCalled(1);
    expect(history.location.pathname).toBe('/game');
    
  });

  test('Testa se o botão de configuração está funcionando', () => {
    renderWithRouterAndRedux(<Login />);
    const configButton = screen.getByRole('button', { name: /configurações/i });
    expect(configButton).toBeInTheDocument();
    userEvent.click(configButton);
    const configTitle = screen.getByTestId('settings-title');
    expect(configTitle).toBeInTheDocument();
  })
})