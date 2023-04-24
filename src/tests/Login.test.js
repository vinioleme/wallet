import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWith';

describe('Página Login', () => {
  const emailInvalid = 'vinileme';
  const emailValidate = 'vinileme@vinileme.com';
  const invalidPassword = '1234';
  const passwordTest = '123456';
  const passwordTestId = 'password-input';
  const emailTestId = 'email-input';

  beforeEach(() => {
    renderWithRouterAndRedux(<App />);
  });

  it('deve renderizar dois inputs e um botão inicialmente desabilitado', () => {
    expect(screen.getByTestId(emailTestId)).toBeInTheDocument();
    expect(screen.getByTestId(passwordTestId)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /entrar/i })).toBeDisabled();
  });

  it('deve redirecionar o usuário para a página de carteira após digitar um email e uma senha válidos e clicar no botão', () => {
    const { history, store } = renderWithRouterAndRedux(<App />);
    const emailInput = screen.getByTestId(emailTestId);
    const passwordInput = screen.getByTestId(passwordTestId);
    const button = screen.getByRole('button', { name: /entrar/i });

    expect(history.location.pathname).toBe('/');

    userEvent.type(emailInput, emailValidate);
    userEvent.type(passwordInput, passwordTest);
    userEvent.click(button);

    expect(history.location.pathname).not.toBe('/');
    expect(history.location.pathname).toBe('/carteira');
    expect(store.getState().user.email).toBe(emailValidate);
    expect(screen.getByTestId('value-input')).toBeInTheDocument();
  });

  it('deve habilitar o botão apenas quando ambos email e senha forem válidos', () => {
    const emailInput = screen.getByTestId(emailTestId);
    const passwordInput = screen.getByTestId(passwordTestId);
    const button = screen.getByRole('button', { name: /entrar/i });
    expect(button).toHaveProperty('disabled', true);

    userEvent.type(emailInput, emailInvalid);
    expect(button).toHaveProperty('disabled', true);

    userEvent.type(passwordInput, invalidPassword);
    expect(button).toHaveProperty('disabled', true);

    userEvent.clear(emailInput);
    userEvent.clear(passwordInput);

    expect(passwordInput).toHaveValue('');
    expect(emailInput).toHaveValue('');

    userEvent.type(emailInput, emailValidate);
    expect(button).toHaveProperty('disabled', true);

    userEvent.type(passwordInput, passwordTest);
    expect(button).toHaveProperty('disabled', false);

    userEvent.clear(emailInput);
    expect(button).toHaveProperty('disabled', true);
  });
});
