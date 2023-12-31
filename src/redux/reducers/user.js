import { ACTION_SAVE_EMAIL } from '../actions';

const INITIAL_STATE = {
  email: '',
};

const user = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case ACTION_SAVE_EMAIL:
    return {
      ...state,
      email: action.payload,
    };
  default:

    return state;
  }
};

export default user;
