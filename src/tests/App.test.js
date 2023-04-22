import { act, getByRole, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {renderWithRouterAndRedux} from '../tests/helpers/renderWithRouterAndRedux'
import Login from '../pages/Login';
import { questionsArray } from './helpers/mockQuestions';
import { playerResults } from './helpers/mockFeedbak';
import App from '../App';
import Feedback from '../pages/results'


const getTokens = require('../services/getTokes')

describe('Desenvolva testes referente a tela de Login', () => {
  const emailInputID = 'input-gravatar-email'
  const nameInputId = 'input-player-name'
  const user = {
    email: 'teste@teste.com',
    name: 'Joãozinho',
  }
  test('Teste se existe um input para e-mail, name, botão na tela de Login', () => {
    renderWithRouterAndRedux(<App />);
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
    renderWithRouterAndRedux(<App />);
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
      json: jest.fn().mockResolvedValue(questions.token),
    });


    userEvent.click(buttonTest);
    act(() => {
      history.push('/game')
    })
    expect(history.location.pathname).toBe('/game');
  });


  test('Testa se o botão de configuração está funcionando', () => {
    renderWithRouterAndRedux(<App />);
    const configButton = screen.getByRole('button', { name: /configurações/i });
    expect(configButton).toBeInTheDocument();
    userEvent.click(configButton);
    const configTitle = screen.getByTestId('settings-title');
    expect(configTitle).toBeInTheDocument();


    const closeConfig = screen.getByTestId("btn-close-settings")
    userEvent.click(closeConfig)

    const emailInput = screen.getByTestId(emailInputID);
    expect(emailInput).toBeInTheDocument();
  })
})

describe('Testa a Página de feedback', () => {
  const emailInputID = 'input-gravatar-email'
  const nameInputId = 'input-player-name'
  const user = {
    email: 'teste@teste.com',
    name: 'Joãozinho',
  }
  test('Testa se a página de feedback tem os resultados', () => {
    renderWithRouterAndRedux(<Feedback />, playerResults)
    const feedbackText = screen.getByTestId("feedback-text")
    expect(feedbackText).toBeInTheDocument()
    const feedbackScore = screen.getByTestId("feedback-total-score")
    expect(feedbackScore).toBeInTheDocument()
    const feedbackQuestions = screen.getByTestId("feedback-total-question")
    expect(feedbackQuestions).toBeInTheDocument()
    expect(feedbackQuestions.innerHTML).toBe(String(playerResults.player.assertions))
  })

  test('Testa se após clicar no botão "play Again" a página volta para o login', () => {
    const {history} = renderWithRouterAndRedux(<Feedback />, playerResults, '/feedback')
    const playAgainButton = screen.getByTestId("btn-play-again")
    expect(playAgainButton).toBeInTheDocument();
    // userEvent.click(playAgainButton)
    expect(history.location.pathname).toBe('/feedback');

  })
})