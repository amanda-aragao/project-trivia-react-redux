import { act, getByRole, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {renderWithRouterAndRedux} from '../tests/helpers/renderWithRouterAndRedux'
import Login from '../pages/Login';
import { questionsArray } from './helpers/mockQuestions';
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

    const questions = {
      piada: 'Testando uma piada',
      correct: 'Essa é a correta',
      difficulty: 'hard',
      token: '49565da92564d651a4d0f718f8e4553aca05847a27c1bb40cb40b02bfc2c018f'
    };

    const { history } = renderWithRouterAndRedux(<App />, questionsArray);
    const emailInput = screen.getByTestId(emailInputID);
    const nameInput = screen.getByTestId(nameInputId);
    userEvent.type(emailInput, user.email);
    userEvent.type(nameInput, user.name);
    const buttonTest = screen.getByRole('button', {
      name: /play/i
    })
    
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValueOnce({
      json: jest.fn().mockResolvedValue(questions),
    });


    userEvent.click(buttonTest);
    act(() => {
      history.push('/game')
    })

    expect(history.location.pathname).toBe('/game');

    const getQuestion = screen.findByText(/Testando uma piada/i)
    await expect(getQuestion).toBeDefined();
    
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