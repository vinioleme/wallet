import React, { Component } from 'react';
import proptypes from 'prop-types';
import { connect } from 'react-redux';
import { API_CURRENCIES } from '../redux/actions';

class WalletForm extends Component {
  state = {
    currency: 'USD',
    description: '',
    value: 0,
    method: 'Dinheiro',
    tag: 'Alimentação',
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(API_CURRENCIES());
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    const { currencies } = this.props;
    const { currency, description, value, method, tag } = this.state;
    return (

      <p>
        {/* Campo para Valor */}
        <span>
          <label htmlFor="value">
            Valor:
            <input
              name="value"
              value={ value }
              onChange={ this.handleChange }
              data-testid="value-input"
              type="number"
              id="value"
            />

          </label>
        </span>

        {/* Campo para descrição */}
        <span>
          <label htmlFor="description">
            Descrição:
            <input
              data-testid="description-input"
              type="text"
              id="description"
              name="description"
              value={ description }
              onChange={ this.handleChange }
            />
          </label>
        </span>

        {/* Campo para moeda: */}
        <span>
          <select
            data-testid="currency-input"
            name="currency"
            id="current"
            onChange={ this.handleChange }
            value={ currency }
          >
            Moeda:
            {currencies.map((currencie) => (
              <option
                key={ currencie }
                value={ currencie }
              >
                { currencie }
              </option>))}
          </select>
        </span>

        {/* Campo para método de pagamento  */}
        <span>
          <select
            data-testid="method-input"
            name="method"
            id="method"
            value={ method }
            onChange={ this.handleChange }
          >
            Método de pagamento:
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de crédito">Cartão de crédito</option>
            <option value="Cartão de débito">Cartão de débito</option>
          </select>
        </span>

        {/* Campo para tag */}
        <span>
          <select
            data-testid="tag-input"
            name="tag"
            id="tag"
            value={ tag }
            onChange={ this.handleChange }
          >
            Tag:
            <option value="Alimentação">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saúde">Saúde</option>
          </select>
        </span>

      </p>

    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
});

WalletForm.propTypes = {
  currencies: proptypes.arrayOf(proptypes.string).isRequired,
  dispatch: proptypes.func.isRequired,
};

export default connect(mapStateToProps)(WalletForm);
