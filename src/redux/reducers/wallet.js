// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { CURRENCIES_ACTION,
  SAVE_ACTION,
  REMOVE_EXPENSE,
} from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: 0,
};

const wallet = (state = INITIAL_STATE, action) => {
  const newExpenses = state.expenses;

  switch (action.type) {
  case CURRENCIES_ACTION:
    return {
      ...state,
      currencies: action.payload,
    };

  case SAVE_ACTION:
    return {
      ...state,
      expenses: [...state.expenses,
        action.payload],
    };

  case REMOVE_EXPENSE:
    return {
      ...state,
      expenses: newExpenses.filter((expenses) => expenses.id !== action.payload),
    };

  default:
    return state;
  }
};

export default wallet;
