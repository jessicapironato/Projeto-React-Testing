import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import { NotFound } from '../pages';

describe('Teste o componente <NotFound.js />', () => {
  test('1.É exibido na tela um h2 com o texto Page requested not found', () => {
    renderWithRouter(<NotFound />);

    const title = screen.getByRole('heading', { name: /Page requested not found/i, level: 2 });

    expect(title).toBeInTheDocument();
  });

  test('2.Uma imagem é renderizada na página', () => {
    renderWithRouter(<NotFound />);

    const url = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    const altText = 'Pikachu crying because the page requested was not found';
    const image = screen.getByAltText(altText);
    expect(image.src).toContain(url);
  });
});
