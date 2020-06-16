import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Button from './../../components/Button/Button';
import UserContext from '../../contexts/UserContext';
import Header from './../../components/Header/Header';

import ApiService from './../../services/api-service';
import './DashboardRoute.css';

class DashboardRoute extends Component {
  state = {
    error: null,
    language: '',
    score: null,
    wordsToPractice: ''
  };

  static contextType = UserContext;

  static defaultProps = {
    location: {},
    history: {
      push: () => {}
    }
  };

  componentDidMount() {
    ApiService.getLanguage().then(data => {
      this.setState({
        language: data.language.name,
        score: data.language.total_score
      });
      this.renderWords(data.words);
    });
  }

  renderWords = words => {
    let wordsToPractice = words.map(word => {
      return (
        <li key={word.id} className="word-to-practice">
          <h3 className="word">{word.original}</h3>
          <p className="correct-guesses">correct: {word.correct_count}</p>
          <p className="incorrect-guesses">incorrect: {word.incorrect_count}</p>
        </li>
      );
    });
    this.setState({
      wordsToPractice
    });
  };

  render() {
    const { error } = this.state;
    return (
      <section className="dashboard">
        <Header score={this.state.score} />
        <h2 className="user-name">Welcome, {this.context.user.name}!</h2>
        <h3>You are currently learning: {this.state.language}</h3>
        <div role="alert">{error && <p>{error}</p>}</div>
        <p className="word-list-title">Words to practice</p>
        <ul className="word-list">{this.state.wordsToPractice}</ul>
        <Link to="/learn">
          <Button>Start practicing</Button>
        </Link>
      </section>
    );
  }
}

export default DashboardRoute;
