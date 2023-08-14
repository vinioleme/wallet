import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { removeExpense } from '../redux/actions';

class Table extends Component {
  deleteFunction = (id) => {
    const { dispatch } = this.props;
    dispatch(removeExpense(id));
  };

  render() {
    const { expenses } = this.props;

    return (

      <div>

        <table>
          <thead>
            <tr>
              <th>Descrição</th>
              <th>Tag</th>
              <th>Método de pagamento</th>
              <th>Valor</th>
              <th>Moeda</th>
              <th>Câmbio utilizado</th>
              <th>Valor convertido</th>
              <th>Moeda de conversão</th>
              <th>Editar/Excluir</th>
            </tr>
          </thead>

          <tbody>
            {
              expenses.map((expense) => (

                <tr key={ expense.id }>
                  <td>{expense.description}</td>
                  <td>{expense.tag}</td>
                  <td>{expense.method}</td>
                  <td>{Number(expense.value).toFixed(2)}</td>
                  <td>{expense.exchangeRates[expense.currency].name}</td>
                  <td>
                    {Number(expense.exchangeRates[
                      expense.currency].ask).toFixed(2)}
                  </td>
                  <td>
                    {
                      Number(expense.value)
                      * (Number(expense.exchangeRates[expense.currency].ask))
                    }

                  </td>
                  <td>Real</td>
                  <td>

                    <button
                      data-testid="delete-btn"
                      type="button"
                      onClick={ () => this.deleteFunction(expense.id) }
                    >
                      Excluir
                    </button>

                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

Table.propTypes = {
  expenses: propTypes.arrayOf(propTypes.shape({
  })).isRequired,
  dispatch: propTypes.func.isRequired,
};

export default connect(mapStateToProps)(Table);
