import Button from './../../components/Button/Button';
import { Input, Label } from '../Form/Form';

import React, { Component } from 'react';

class LearningPage extends Component {
  state = {
    error: null
  };

  static defaultProps = {
    location: {},
    history: {
      push: () => {}
    }
  };

  render() {
    const { nextWord, incorrect, correct } = this.props;
    const { error } = this.state;
    return (
      <section className="nextWord">
        <div role="alert">{error && <p>{error}</p>}</div>
        <h2>Translate the word:</h2>
        <span>{nextWord}</span>
        <p>You have answered this word correctly {correct} times.</p>
        <p>You have answered this word incorrectly {incorrect} times.</p>
        <form onSubmit={this.props.handleGuess} className="answer-form">
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
  }
}
