import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import About from '../pages/About';

describe('1.Testar o componente About.js', () => {
  it('Testa se o título About Pokedex é renderizado', () => {
    renderWithRouter(<About />);

    const title = screen.getByRole('heading', { name: /About Pokédex/i, level: 2 });
    expect(title).toBeInTheDocument();
  });

  it('2.Testa se a url da imagem está presente no documento', () => {
    renderWithRouter(<About />);

    const url = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    const altText = 'Pokédex';
    const image = screen.getByAltText(altText);
    expect(image.src).toContain(url);
  });

  it('3.Teste se a página contém as informações sobre a Pokédex', () => {
    renderWithRouter(<About />);

    const infoPokedex = screen.getByText(/This application simulates a Pokédex, a digital encyclopedia containing all Pokémon/i);

    expect(infoPokedex).toBeInTheDocument();
  });

  it('4.Teste se a página contém dois parágrafos com texto sobre a Pokédex;', () => {
    renderWithRouter(<About />);

    const paragraphOne = screen.getByText(/This application simulates a Pokédex, a digital encyclopedia containing all Pokémon/i);
    expect(paragraphOne).toBeInTheDocument();

    const paragraphTwo = screen.getByText(/One can filter Pokémon by type, and see more details for each one of them/i);
    expect(paragraphTwo).toBeInTheDocument();
  });
});
