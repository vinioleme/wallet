import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { saveEmail } from '../redux/actions';

class Login extends React.Component {
  state = {
    email: '',
    password: '',
    isDisabled: true,
  };

  loginBtn = () => {
    const { email } = this.state;
    const { dispatch, history } = this.props;
    dispatch(saveEmail(email));
    history.push('/carteira');
  };

  validateForm = () => {
    const { email, password } = this.state;
    const minLength = 6;
    const isPasswordValid = password.length >= minLength;
    const emailRegex = /\S+@\S+\.\S+/;
    return emailRegex.test(email) && isPasswordValid;
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value }, () => {
      const isFormValid = this.validateForm(this.state);
      this.setState({ isDisabled: !isFormValid });
    });
  };

  render() {
    const { email, password, isDisabled } = this.state;
    return (
      <div className="login-div">
        <label htmlFor="email">
          E-mail
          <input
            data-testid="email-input"
            type="text"
            value={ email }
            onChange={ this.handleChange }
            name="email"
          />

        </label>

        <label htmlFor="password">
          Senha
          <input
            data-testid="password-input"
            type="password"
            value={ password }
            onChange={ this.handleChange }
            name="password"
          />

        </label>
        <button
          onClick={ this.loginBtn }
          disabled={ isDisabled }
        >
          Entrar
        </button>

      </div>
    );
  }
}

Login.propTypes = {
  dispatch: propTypes.func.isRequired,
  history: propTypes.shape({
    push: propTypes.func.isRequired,
  }).isRequired,
};

export default connect()(Login);
