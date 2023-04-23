import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';

class Header extends Component {
  render() {
    const { email, expenses } = this.props;
    return (
      <header>

        <span>
          <p data-testid="email-field">
            { `E-mail: ${email}` }
          </p>
        </span>

        <span>
          Despesa Total:
          <p data-testid="total-field">
            {expenses
              .reduce((acc, expense) => acc + (Number(expense
                .value) * Number(expense.exchangeRates[expense.currency].ask)), 0)
              .toFixed(2)}
          </p>
        </span>

        <span>
          <p data-testid="header-currency-field">
            { `Moeda: ${'BRL'}`}
          </p>
        </span>

      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

Header.propTypes = {
  email: propTypes.string.isRequired,
  expenses: propTypes.shape({}),
}.isRequired;

export default connect(mapStateToProps)(Header);
