export const ACTION_SAVE_EMAIL = 'ACTION_SAVE_EMAIL';

export const saveEmail = (email) => ({
  type: ACTION_SAVE_EMAIL,
  payload: email,
});
