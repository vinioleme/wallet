import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';

class Header extends Component {
  render() {
    const { email } = this.props;
    return (
      <div>
        <h1 data-testid="email-field">
          { `E-mail: ${email}`}
        </h1>

        <h1 data-testid="total-field">
          { `Despesa Total: ${0}`}
        </h1>

        <h1 data-testid="header-currency-field">
          { `Moeda: ${'BRL'}`}
        </h1>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
});

Header.propTypes = {
  email: propTypes.string.isRequired,
};

export default connect(mapStateToProps)(Header);
