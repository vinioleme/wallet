export const ACTION_SAVE_EMAIL = 'ACTION_SAVE_EMAIL';
export const CURRENCIES_ACTION = 'CURRENCIES';

const URL_BASE = 'https://economia.awesomeapi.com.br/json/all';

export const saveEmail = (email) => ({
  type: ACTION_SAVE_EMAIL,
  payload: email,
});

export const currenciesAction = (currencies) => {
  const filteredCurrencies = currencies.reduce((acc, currency) => {
    if (currency !== 'USDT') {
      acc.push(currency);
    }
    return acc;
  }, []);
  return { type: CURRENCIES_ACTION, payload: filteredCurrencies };
};

export const API_CURRENCIES = () => (dispatch) => {
  fetch(URL_BASE)
    .then((response) => response.json())
    .then((data) => {
      const values = Object.keys(data);
      dispatch(currenciesAction(values));
    });
};
