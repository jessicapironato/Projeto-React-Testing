import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Testar se o topo da aplicação contém um conjunto fixo de links de navegação ', () => {
  it('1.Teste se é exibido na tela um link com o texto Home', () => {
    const { history } = renderWithRouter(<App />);

    const homeLink = screen.getByRole('link', { name: 'Home' });
    expect(homeLink).toBeInTheDocument();
    userEvent.click(homeLink);

    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });

  it('2.Teste se é exibido na tela um link com o texto About', () => {
    const { history } = renderWithRouter(<App />);

    const aboutLink = screen.getByRole('link', { name: 'About' });
    expect(aboutLink).toBeInTheDocument();
    userEvent.click(aboutLink);

    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });

  it('3.Teste se é exibido na tela um link com o texto Favorite Pokémon', () => {
    const { history } = renderWithRouter(<App />);

    const favoriteLink = screen.getByRole('link', { name: 'Favorite Pokémon' });
    expect(favoriteLink).toBeInTheDocument();
    userEvent.click(favoriteLink);

    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
  });
});
