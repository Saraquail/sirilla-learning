import React, { Component } from "react";
import ApiService from "../../services/api-service";
import Button from "./../../components/Button/Button";
import { Input, Label } from "./../../components/Form/Form";
import './LearningRoute.css'

class LearningRoute extends Component {
  state = {
    error: null,
    showResults: false,
    correct: 0,
    incorrect: 0,
    nextWord: "",
    score: 0,
    isCorrect: false,
    original: "",
    translation: "",
    guess: "",
  };

  static defaultProps = {
    location: {},
    history: {
      push: () => {},
    },
  };

  componentDidMount() {
    this.getFirstWord();
  }

  getFirstWord = () => {
    ApiService.getNextWord().then((data) => {
      this.setState({
        nextWord: data.nextWord,
        original: data.nextWord,
        score: data.totalScore,
        incorrect: data.wordIncorrectCount,
        correct: data.wordCorrectCount,
        showResults: false,
      });
    });
  }

  getNextWord = () => {
    ApiService.getNextWord().then((data) => {
      this.setState({
        original: data.nextWord,
        incorrect: data.wordIncorrectCount,
        correct: data.wordCorrectCount,
        showResults: false,
      });
    });
  };

  handleGuess = (e) => {
    e.preventDefault();

    let guess = e.target["learn-guess-input"].value;
    guess = guess.toLowerCase();
    this.setState({
      guess,
    });
    ApiService.getResults(guess).then((data) => {
      this.setState({
        nextWord: data.nextWord,
        score: data.totalScore,
        incorrect: data.wordIncorrectCount,
        correct: data.wordCorrectCount,
        isCorrect: data.isCorrect,
        showResults: true,
        translation: data.answer,
      });
    });
  };

  handleNextWord = (e) => {
    e.preventDefault();
    this.setState({
      showResults: false,
    });
    this.getNextWord()
  };

  renderNextWord = () => {
    const { nextWord, incorrect, correct } = this.state;
    return (
      <section className="nextWord">
        <h2>Translate the word:</h2>
        <span>{nextWord}</span>
        <p>You have answered this word correctly {correct} times.</p>
        <p>You have answered this word incorrectly {incorrect} times.</p>
        <form onSubmit={this.handleGuess} className="answer-form">
          <Label htmlFor="learn-guess-input">
            What's the translation for this word?
          </Label>
          <Input
            type="text"
            name="learn-guess-input"
            id="learn-guess-input"
            required
          ></Input>
          <Button type="submit">Submit your answer</Button>
        </form>
      </section>
    );
  };

  renderResults = () => {
    let { isCorrect, guess, original, translation } = this.state;
    return (
      <section className="results">
        {isCorrect ? (
          <h2>You were correct! :D</h2>
        ) : (
          <h2>Good try, but not quite right :(</h2>
        )}
        <p className="DisplayFeedback">
          The correct translation for {original} was {translation} and you chose{" "}
          {guess}!
        </p>
        <Button onClick={this.handleNextWord}>Try another word!</Button>
      </section>
    );
  };

  render() {
    let { score } = this.state;
    return (
      <section>
        <p className="DisplayScore">Your total score is: {score}</p>
        {this.state.showResults ? this.renderResults() : this.renderNextWord()}
      </section>
    );
  }
}

export default LearningRoute;
