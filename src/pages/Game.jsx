import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { savePoints } from '../redux/actions';
import Header from '../components/Header/Header';
import { numbers } from '../services/consts';

class Game extends Component {
  state = {
    renderQuestion: 0,
    borderCorrect: 'unset',
    borderIncorrect: 'unset',
    nextButton: false,
    answerDisabled: false,
    question: '',
    category: '',
    arrayAnswers: [],
    correct: '',
    difficulty: '',
    initialTime: numbers.RESPONSE_TIME,
    timeAnswered: '',
    responseTime: 0,
    isAnswerCorrect: false,
    assertions: 0,
    isComplete: false,
    loading: true,
  };

  componentDidMount() {
    this.randomizeQuestion(0);
    setTimeout(() => {
      this.setState({
        answerDisabled: true,
        nextButton: true,
        borderCorrect: '3px solid rgb(6, 240, 15)',
        borderIncorrect: '3px solid red',
      });
    }, numbers.timerAnswer);
    const { initialTime } = this.state;
    if (initialTime > 0) {
      setInterval(() => {
        this.setState((prevState) => ({
          initialTime: prevState.initialTime > 0 ? prevState.initialTime - 1 : 0,
        }));
      }, numbers.SET_INTERVAL);
    }
  }

  chooseAnswer = (event) => {
    event.preventDefault();
    const { correct } = this.state;
    this.setState((prevState) => ({
      nextButton: true,
      borderCorrect: '3px solid rgb(6, 240, 15)',
      borderIncorrect: '3px solid red',
      answerDisabled: true,
      timeAnswered: prevState.initialTime,
      responseTime: numbers.RESPONSE_TIME - prevState.initialTime,
      isAnswerCorrect: correct === event.target.innerText,
    }), () => {
      this.sumPoints();
    });
  };

  sumPoints = () => {
    const { difficulty, timeAnswered, isAnswerCorrect } = this.state;
    const { dispatch, name, gravatar, email } = this.props;
    const user = { name, gravatar, email };

    let sumPoints = 0;

    if (difficulty === 'easy' && isAnswerCorrect) {
      sumPoints = numbers.basePoints + (timeAnswered * numbers.easy);
      this.setState((prevState) => ({ assertions: prevState.assertions + 1 }), () => {
        const { assertions } = this.state;
        dispatch(savePoints(sumPoints, assertions, user));
      });
      return sumPoints;
    }

    if (difficulty === 'medium' && isAnswerCorrect) {
      sumPoints = numbers.basePoints + (timeAnswered * numbers.medium);
      this.setState((prevState) => ({ assertions: prevState.assertions + 1 }), () => {
        const { assertions } = this.state;
        dispatch(savePoints(sumPoints, assertions, user));
      });
      return sumPoints;
    }

    if (difficulty === 'hard' && isAnswerCorrect) {
      sumPoints = numbers.basePoints + (timeAnswered * numbers.hard);
      this.setState((prevState) => ({ assertions: prevState.assertions + 1 }), () => {
        const { assertions } = this.state;
        dispatch(savePoints(sumPoints, assertions, user));
      });
      return sumPoints;
    }

    sumPoints = 0;
    this.setState((prevState) => ({ assertions: prevState.assertions + 1 }), () => {
      const { assertions } = this.state;
      dispatch(savePoints(sumPoints, assertions, user));
    });
  };

  rerirectToFeedback = () => {
    const { isComplete } = this.state;
    const { history } = this.props;
    if (isComplete) {
      history.push('/feedback');
    }
  };

  nextQuestion = (event) => {
    const { renderQuestion } = this.state;
    event.preventDefault();
    this.setState((prevState) => ({
      renderQuestion: prevState.renderQuestion + 1,
      borderCorrect: 'unset',
      borderIncorrect: 'unset',
      nextButton: false,
      answerDisabled: false,
      initialTime: 30,
      timeAnswered: 0,
      isAnswerCorrect: false,
      isComplete: prevState.renderQuestion === numbers.completeTask,
    }), () => {
      this.rerirectToFeedback();
      const { isComplete } = this.state;
      if (!isComplete) {
        this.randomizeQuestion(renderQuestion + 1);
      }
    });

    setTimeout(() => {
      this.setState({ answerDisabled: true, nextButton: true });
    }, numbers.timerAnswer);
  };

  randomizeQuestion = (index) => {
    const { questions } = this.props;
    this.setState({
      loading: false,
      question: questions[index].question,
      category: questions[index].category,
      arrayAnswers: [...questions[index].incorrect_answers,
        questions[index].correct_answer].sort(() => numbers.sortNumber - Math.random()),
      correct: questions[index].correct_answer,
      difficulty: questions[index].difficulty,
    });
  };

  render() {
    const {
      borderCorrect,
      borderIncorrect,
      nextButton,
      answerDisabled,
      arrayAnswers,
      question,
      category,
      correct,
      initialTime,
      difficulty,
      timeAnswered,
      responseTime,
      loading,
    } = this.state;

    return (
      <>
        <Header />
        {loading ? <h2>Loading</h2>
          : (
            <div className="questionsContainer">
              <div className="question">
                <h2 data-testid="question-category">
                  {category}
                </h2>
                <p data-testid="question-text">{question}</p>
                <p>{difficulty}</p>
                <div className="buttons" data-testid="answer-options">
                  {arrayAnswers.map((answer, index) => (
                    <button
                      type="button"
                      onClick={ this.chooseAnswer }
                      data-testid={ answer === correct
                        ? 'correct-answer' : `wrong-answer${index}` }
                      key={ answer }
                      style={ answer === correct
                        ? { border: borderCorrect } : { border: borderIncorrect } }
                      disabled={ answerDisabled }
                    >
                      {answer}

                    </button>
                  ))}
                </div>
                <p>
                  {timeAnswered > 0
                    ? `Você respondeu em ${responseTime} segundos!`
                    : `Faltam ${initialTime} segundos`}

                </p>
                {nextButton
                  && (
                    <button
                      data-testid="btn-next"
                      onClick={ this.nextQuestion }
                    >
                      Next

                    </button>)}
              </div>

            </div>)}
      </>

    );
  }
}

Game.propTypes = {
  questions: PropTypes.arrayOf(PropTypes.shape({
    category: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    difficulty: PropTypes.string.isRequired,
    question: PropTypes.string.isRequired,
    correct_answer: PropTypes.string.isRequired,
    incorrect_answers: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  })).isRequired,
  dispatch: PropTypes.func.isRequired,
  email: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  gravatar: PropTypes.string.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  email: state.login.email,
  name: state.login.name,
  gravatar: state.login.imgGravatar,
  questions: state.game.questions,
});

export default connect(mapStateToProps)(Game);
