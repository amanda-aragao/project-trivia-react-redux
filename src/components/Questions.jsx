import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const sortNumber = 0.5;

class Questions extends Component {
  state = {
    renderQuestion: 0,
  };

  nextQuestion = (event) => {
    event.preventDefault();
    this.setState((prevState) => ({
      renderQuestion: prevState.renderQuestion + 1,
    }));
  };

  render() {
    const { renderQuestion } = this.state;
    const { questions } = this.props;
    return (
      <div className="questionsContainer">
        {
          questions.map((question, index) => {
            if (renderQuestion === index) {
              return (
                <div className="question" key={ index }>
                  <h2 data-testid="question-category">
                    {question.category}
                  </h2>
                  <p data-testid="question-text">{question.question}</p>
                  <div className="buttons" data-testid="answer-options">
                    {[question.correct_answer,
                      ...question.incorrect_answers]
                      .sort((a, b) => {
                        console.log(a, b);
                        return sortNumber - Math.random();
                      }).map((incorrect) => {
                        if (incorrect === question.correct_answer) {
                          return (
                            <button
                              type="button"
                              onClick={ this.nextQuestion }
                              data-testid="correct-answer"
                              key={ index }
                            >
                              {question.correct_answer}

                            </button>
                          );
                        }
                        return (
                          <button
                            type="button"
                            onClick={ this.nextQuestion }
                            data-testid={ `wrong-answer${index}` }
                            key={ index }
                          >
                            {incorrect}

                          </button>
                        );
                      })}
                  </div>
                </div>
              );
            }
            return console.log('erro');
          })
        }

      </div>
    );
  }
}

Questions.propTypes = {
  questions: PropTypes.arrayOf(PropTypes.shape({
    currency: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    exchangeRates: PropTypes.shape({
      USD: PropTypes.shape({
        code: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
  })).isRequired,
};

const mapStateToProps = (state) => ({
  questions: state.game.questions,
});

export default connect(mapStateToProps)(Questions);
