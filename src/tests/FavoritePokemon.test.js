import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import FavoritePokemon from '../pages/FavoritePokemon';

describe('Teste o componente FavoritePokemon.js', () => {
  test('1.É exibido na tela a mensagem No favorite pokemon found', () => {
    renderWithRouter(<FavoritePokemon />);

    const notFoundText = screen.getByText(/No favorite Pokémon found/i);
    expect(notFoundText).toBeVisible();
  });

  test('2.São exibidos na tela apenas os Pokémon favoritados', () => {

  });
});
