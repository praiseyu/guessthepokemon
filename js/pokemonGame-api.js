class PokemonGame {
    constructor() {
      this.baseUrl = `https://pokeapi.co/api/v2/pokemon/`; //id will be a randon number between 1-500
    }
    async getPokemon() {
      const id = Math.floor(Math.random() * (500 - 1) + 1);
      const baseUrl = `${this.baseUrl}${id}/`; //id will be a randon number between 1-500
      const res = await axios.get(baseUrl);
      // console.log(res.data.species.name);
      return { img: res.data.sprites.front_shiny, name: res.data.species.name };
    }
  }
  
  export default PokemonGame;
  