class PokemonGame {
  constructor() {
    this.baseUrl = `https://pokeapi.co/api/v2/pokemon/`;
  }
  async getPokemon() {
    const id = Math.floor(Math.random() * (500 - 1) + 1);
    const baseUrl = `${this.baseUrl}${id}/`;
    const res = await axios.get(baseUrl);
    return { img: res.data.sprites.front_shiny, name: res.data.species.name };
  }
}

export default PokemonGame;
