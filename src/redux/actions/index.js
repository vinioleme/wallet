export const ACTION_SAVE_EMAIL = 'ACTION_SAVE_EMAIL';
export const CURRENCIES_ACTION = 'CURRENCIES';
export const SAVE_ACTION = 'SAVE_ACTION';

export const saveEmail = (email) => ({
  type: ACTION_SAVE_EMAIL,
  payload: email,
});

// Para Salvar as moedas

export const currenciesAction = (currencies) => {
  const filteredCurrencies = currencies.reduce((acc, currency) => {
    if (currency !== 'USDT') {
      acc.push(currency);
    }
    return acc;
  }, []);
  return {
    type: CURRENCIES_ACTION,
    payload: filteredCurrencies };
};

export const API_CURRENCIES = () => (dispatch) => {
  fetch('https://economia.awesomeapi.com.br/json/all')
    .then((response) => response.json())
    .then((data) => {
      const values = Object.keys(data);
      dispatch(currenciesAction(values));
    });
};

// Para Salvar as despesas

export const saveAction = (data, state) => ({
  type: SAVE_ACTION,
  payload: {
    exchangeRates: data,
    ...state,
  },
});

export const API_EXPENSES = (state) => (dispatch) => {
  fetch('https://economia.awesomeapi.com.br/json/all')
    .then((response) => response.json())
    .then((data) => {
      dispatch(saveAction(data, state));
    });
};
