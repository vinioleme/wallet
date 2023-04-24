import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import mockData from './helpers/mockData';

describe('Testes na rota /carteira e no componente Wallet', () => {
  const initialEntries = ['/carteira'];
  const descriptionTag = 'despesa de medicamentos';
  const descriptionInput = 'description-input';
  const valueInput = 'value-input';
  const initialState = {
    user: { email: 'vinileme@vinileme.com' },
    wallet: {
      expenses: [{
        exchangeRates: mockData,
        currency: 'USD',
        value: '6',
        description: descriptionTag,
        method: 'Dinheiro',
        tag: 'Alimentacao',
        id: 0,
      }],
      currencies: [
        'USD', 'CAD', 'GBP',
        'ARS', 'BTC', 'LTC',
        'EUR', 'JPY', 'CHF',
        'AUD', 'CNY', 'ILS',
        'ETH', 'XRP', 'DOGE',
      ],
    },
  };

  beforeEach(() => {
    renderWithRouterAndRedux(<App />, { initialEntries });
  });

  it('Verifica se um header com um campo de email, um de despesa e outro de moeda são renderizados na rota', () => {
    const renderEmail = screen.getByTestId('email-field');
    const textTag = screen.getByText('Despesa Total: R$');
    const tagTotal = screen.getByTestId('total-field');
    const current = screen.getByTestId('header-currency-field');

    expect(renderEmail).toBeInTheDocument();
    expect(textTag).toBeInTheDocument();
    expect(tagTotal).toBeInTheDocument();
    expect(current).toBeInTheDocument();
    expect(tagTotal).toHaveTextContent('0.00');
    expect(current).toHaveTextContent('BRL');
  });

  it('Verifica se quando existe uma despesa salva, se o seu valor é atualizado no Header', () => {
    renderWithRouterAndRedux(<App />, { initialEntries, initialState });
    const tagTotal = screen.getByTestId('total-field');

    expect(tagTotal).toHaveTextContent('28.52');
  });

  it('Verifica se é renderizado no Header um email salvo na store, quando ele existe ', () => {
    renderWithRouterAndRedux(<App />, { initialEntries, initialState });
    expect(renderEmail).toHaveTextContent(/Email: vinileme@vinileme.com/i);
    expect(renderEmail).toHaveTextContent(/Email: vinileme@vinileme.com/i);
  });

  it('Verifica se todos os campos do formulário e o botão são renderizados, e se é possível digitar nos campos', async () => {
    const optionUsd = await screen.findByRole('option', { name: 'USD' });
    const trybeWallet = screen.getByText(/trybeWallet/i);
    const inputNumber = screen.getByTestId(valueInput);
    const inputDescription = screen.getByTestId(descriptionInput);
    const selectCurrency = screen.getByTestId('currency-input');
    const selectMethod = screen.getByTestId('method-input');
    const selectTag = screen.getByTestId('tag-input');
    const button = screen.getByRole('button', { name: /adicionar despesa/i });

    expect(inputDescription).toBeInTheDocument();
    expect(inputNumber).toBeInTheDocument();
    expect(selectCurrency).toBeInTheDocument();
    expect(selectMethod).toBeInTheDocument();
    expect(selectTag).toBeInTheDocument();
    expect(button).toBeInTheDocument();
    expect(trybeWallet).toBeInTheDocument();
    expect(optionUsd).toBeInTheDocument();

    userEvent.type(inputDescription, descriptionTag);
    userEvent.type(inputNumber, '6');
    userEvent.selectOptions(selectCurrency, 'USD');
    userEvent.selectOptions(selectMethod, 'Dinheiro');
    userEvent.selectOptions(selectTag, 'Alimentacao');

    expect(inputDescription).toHaveValue(descriptionTag);
    expect(inputNumber).toHaveValue('6');
    expect(selectCurrency).toHaveValue('USD');
    expect(selectMethod).toHaveValue('Dinheiro');
    expect(selectTag).toHaveValue('Alimentacao');
  });
});
