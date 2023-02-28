import React from 'react';
import { act, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Teste o componente <PokemonDetails.js />', () => {
  it('1.Teste se as informações detalhadas do Pokémon selecionado são mostradas na tela', () => {
    renderWithRouter(<App />);
    const linkMoreDetails = screen.getByRole('link', { name: 'More details' });
    userEvent.click(linkMoreDetails);

    const pokemonTitleName = screen.getByRole('heading', { name: /Pikachu Details/i, level: 2 });
    expect(pokemonTitleName).toBeVisible();

    const pokemonSumary = screen.getByRole('heading', { name: /Summary/i, level: 2 });
    expect(pokemonSumary).toBeVisible();

    const pokemonParagraph = screen.getByText(/This intelligent Pokémon roasts hard berries with electricity to make them tender enough to eat./i);
    expect(pokemonParagraph).toBeInTheDocument();

    expect(linkMoreDetails).not.toBeInTheDocument();
  });

  it('2.Teste se existe na página uma seção com os mapas contendo as localizações do Pokémon', () => {
    renderWithRouter(<App />);
    const linkMoreDetails = screen.getByRole('link', { name: 'More details' });
    userEvent.click(linkMoreDetails);

    const pokemonTitleGame = screen.getByRole('heading', { name: /Game Locations of Pikachu/i, level: 2 });
    expect(pokemonTitleGame).toBeVisible();

    const pokemonLocationOne = screen.getByText(/Kanto Viridian Forest/i);
    expect(pokemonLocationOne).toBeVisible();

    const pokemonLocationTwo = screen.getByText(/Kanto Power Plant/i);
    expect(pokemonLocationTwo).toBeVisible();

    const image = screen.getAllByRole('img');
    const urlOne = 'https://archives.bulbagarden.net/media/upload/0/08/Kanto_Route_2_Map.png';
    const urlTwo = 'https://archives.bulbagarden.net/media/upload/b/bd/Kanto_Celadon_City_Map.png';

    expect(image[1]).toBeVisible();
    expect(image[2]).toBeVisible();
    expect(image[1]).toHaveAttribute('src', urlOne);
    expect(image[2]).toHaveAttribute('src', urlTwo);
    expect(image[1]).toHaveAttribute('alt', 'Pikachu location');
    expect(image[2]).toHaveAttribute('alt', 'Pikachu location');
  });

  it('3.Teste se o usuário pode favoritar um Pokémon através da página de detalhes', () => {
    const { history } = renderWithRouter(<App />);
    const linkMoreDetails = screen.getByText(/More Details/i);
    userEvent.click(linkMoreDetails);

    act(() => {
      history.push('/pokemon/4');
    });

    const pokemonStar = screen.getByLabelText(/Pokémon Favoritado?/i);
    userEvent.click(pokemonStar);
    expect(pokemonStar).toBeVisible();
    expect(screen.getByRole('img', { name: /Charmander is marked as favorite/i })).toBeInTheDocument();
  });
});
