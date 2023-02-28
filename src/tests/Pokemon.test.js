import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Teste o componente <Pokemon.js />', () => {
  it('1.Teste se é renderizado um card com o nome de determinado Pokémon', () => {
    renderWithRouter(<App />);

    const pokemonName = screen.getByText(/Pikachu/i);
    expect(pokemonName).toBeInTheDocument();
  });

  it('2.O tipo correto do Pokémon deve ser mostrado na tela', () => {
    renderWithRouter(<App />);

    const pokemonType = screen.getByTestId('pokemon-type');
    expect(pokemonType.textContent).toBe('Electric');
  });

  it('3.O peso médio do Pokémon deve ser exibido com um texto no formato Average weight: <value> <measurementUnit>', () => {
    renderWithRouter(<App />);

    const pokemonAverageWeight = screen.getByText(/Average weight: 6.0 kg/i);
    expect(pokemonAverageWeight).toBeInTheDocument();
  });

  it('4.A imagem do Pokémon deve ser exibida', () => {
    renderWithRouter(<App />);

    const url = 'https://archives.bulbagarden.net/media/upload/b/b2/Spr_5b_025_m.png';
    const altText = 'Pikachu sprite';
    const image = screen.getByAltText(altText);
    expect(image.src).toContain(url);
  });

  it('5.Teste se o card do Pokémon indicado na Pokédex contém um link de navegação para exibir detalhes deste Pokémon', () => {
    const { history } = renderWithRouter(<App />);

    const linkMoreDetails = screen.getByRole('link', { name: 'More details' });
    expect(linkMoreDetails).toBeInTheDocument();
    userEvent.click(linkMoreDetails);

    const { pathname } = history.location;
    expect(pathname).toBe('/pokemon/25');
  });

  it('6.Teste se existe um ícone de estrela nos Pokémon favoritados', () => {
    renderWithRouter(<App />);

    const linkMoreDetails = screen.getByText(/More Details/i);
    expect(linkMoreDetails).toBeInTheDocument();
    userEvent.click(linkMoreDetails);

    const pokemonCheck = screen.getByRole('checkbox');
    userEvent.click(pokemonCheck);
    const pokemonStar = screen.getByAltText('Pikachu is marked as favorite');
    expect(pokemonStar).toBeInTheDocument();
    expect(pokemonStar.src).toContain('/star-icon.svg');
    expect(pokemonStar.alt).toBe('Pikachu is marked as favorite');
  });
});
