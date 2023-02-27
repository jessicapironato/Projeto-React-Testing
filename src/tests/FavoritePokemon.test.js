import React from 'react';
import { act, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import FavoritePokemon from '../pages/FavoritePokemon';
import App from '../App';

describe('Teste o componente FavoritePokemon.js', () => {
  test('1.É exibido na tela a mensagem No favorite pokemon found', () => {
    renderWithRouter(<FavoritePokemon />);

    const notFoundText = screen.getByText(/No favorite Pokémon found/i);
    expect(notFoundText).toBeVisible();
  });

  test('2.São exibidos na tela apenas os Pokémon favoritados', () => {
    const { history } = renderWithRouter(<App />);

    act(() => {
      history.push('/pokemon/25');
    });

    const favoritePokemonInput = screen.getByRole('checkbox');
    expect(favoritePokemonInput).toBeVisible();
    userEvent.click(favoritePokemonInput);

    act(() => {
      history.push('/favorites');
    });

    const favoritePokemon = screen.getByText('Pikachu');
    expect(favoritePokemon).toBeVisible();
  });
});
