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

  handleChange = ({ target }) => {
    const { name, value } = target;
    const verifyValidate = (() => {
      const { email, password } = this.state;
      const minLength = 6;
      const passwordValidate = password.length >= minLength;
      const regularExpressionEmailValidate = /\S+@\S+\.\S+/;
      return regularExpressionEmailValidate.test(email) && passwordValidate;
    })();
    this.setState({ [name]: value, isDisabled: !verifyValidate });
  };

  loginBtn = () => {
    const { email } = this.state;
    const { dispatch, history } = this.props;
    dispatch(saveEmail(email));
    history.push('/carteira');
  };

  render() {
    const { email, password, isDisabled } = this.state;
    return (
      <div>
        <label htmlFor="email">
          E-mail
          <input
            data-testid="email-input"
            type="text"
            value={ email }
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="password">
          Senha
          <input
            data-testid="password-input"
            type="password"
            value={ password }
            onChange={ this.handleChange }
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
