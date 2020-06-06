import React, { Component } from "react";
import { Link } from "react-router-dom";
import TokenService from "../../services/token-service";
import UserContext from "../../contexts/UserContext";
import './Header.css';
import madridImg from '../../imgs/madrid.jpg';

class Header extends Component {
  static contextType = UserContext;

  handleLogoutClick = () => {
    this.context.processLogout();
  };

  renderLogoutLink() {
    return (
      <div>
        <span className="user-name">Welcome, {this.context.user.name}!</span>
        <nav className="nav">
          <Link onClick={this.handleLogoutClick} to="/login">
            Logout
          </Link>
        </nav>
      </div>
    );
  }

  renderLoginLink() {
    return (
      <nav>
        <Link to="/login">Login</Link> <Link to="/register">Sign up</Link>
      </nav>
    );
  }

  render() {
    return (
      <header>
      <div>
        <h1>
          <Link to="/">Sirilla Learning</Link>
        </h1>  
          {TokenService.hasAuthToken()
          ? this.renderLogoutLink()
          : this.renderLoginLink()}
          </div>
        <div className="madrid-img">
          <img src={madridImg} alt="cityscape of madrid" />
        </div>

      </header>
    );
  }
}

export default Header;
