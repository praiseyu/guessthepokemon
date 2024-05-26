import PokemonGame from "./pokemonGame-api.js";

const pokemonGame = new PokemonGame();
const imgContainer = document.querySelector(".pokemon__container");
const image = document.createElement("img");
const guessForm = document.querySelector(".guess-form");
let attempts = 0;

let makePokemon = async () => {
  image.removeAttribute("class");
  let pokemon = await pokemonGame.getPokemon();
  const src = pokemon.img;
  const pokemonName = pokemon.name;
  image.classList.add("pokemon__image");
  image.setAttribute("src", src);
  imgContainer.appendChild(image);
  // makeGuess();
  return pokemonName;
};

let pokemonName = await makePokemon();
makeGuess();
console.log(pokemonName);

// let pokemon = await pokemonGame.getPokemon();
// const src = pokemon.img;
// const pokemonName = pokemon.name;

// const imgContainer = document.querySelector(".pokemon__container");
// const image = document.createElement("img");
// image.classList.add("pokemon__image");
// image.setAttribute("src", src);
// imgContainer.appendChild(image);

// const guessForm = document.createElement("form");
// const guessFeild = document.createElement("input");
// guessForm.appendChild(guessFeild);

function makeGuess() {
  const feedback = document.querySelector(".pokemon__message");
  guessForm.addEventListener("submit", (e) => {

    e.preventDefault();
    feedback.innerText="";
    //attempts++;
    
    const guess = e.target.guess.value;
    // console.log(guess);
    // if (!inputValidation(guess)) {
    //   feedback.classList.add("pokemon__message--incorrect");
    //   feedback.innerText = "please enter a name... no numbers";
    //   return;
    // }
    guessForm.reset();
    console.log(pokemonName);
    onGuess(guess, pokemonName, feedback);
    
  });
}

function checkGuess(name, pokemon) {
  if (name == pokemon) {
    return true;
  }
  console.log(name);
  console.log(pokemon);
  return false;
}
const resetButton = document.querySelector(".guess-form__reset");
console.log(resetButton);

function onGuess(guess, pokemonName, feedback) {
  if (checkGuess(guess, pokemonName)) {
    console.log("correct");
    image.classList.add("pokemon__image--original");

    feedback.classList.add("pokemon__message--correct");
    feedback.innerText = "Congratulations you are a master Pokémon poacher ";

    resetButton.classList.add("guess-form__reset--newgame");
    displayName();
    // newGame(resetButton);
    //New button shows up
    //on click get a new pokemon
  } else {
    attempts++;

    feedback.innerText = `you guessed ${guess}, that is incorrect! Try again`;
    feedback.classList.add("pokemon__message--incorrect");
    switch (attempts) {
      case 1:
        image.classList.add("pokemon__image--second");
        console.log("Try again first fail");
        break;
      case 2:
        image.classList.add("pokemon__image--third");
        console.log("Try again second fail");
        break;
      default:
        image.classList.add("pokemon__image--original");
        feedback.classList.add("pokemon__message--correct");
        feedback.innerText = `The correct answer is ${pokemonName}! New Game?`;
        console.log("new game");
        displayName();
        resetButton.classList.add("guess-form__reset--newgame");
        //newGame(resetButton);
        resetButton.addEventListener("click", async (e) => {
          e.preventDefault();
          pokemonName = await makePokemon();

          console.log(pokemonName);
          console.log("newgamepoke");
          attempts = 0;
          
          title.classList.remove("pokemon__name--show");
          feedback.innerText="";
          feedback.classList.remove("pokemon__message--correct");
          feedback.classList.remove("pokemon__message--incorrect");
          resetButton.classList.remove("guess-form__reset--newgame");
          newGame(resetButton);
        });
        break;
    }
  }
}

function inputValidation(string) {
  return /^[A-Za-z]/.test(string.trim().toLowerCase());
}


const title = document.querySelector(".pokemon__name");
function newGame(button) {
  button.addEventListener("click", async (e) => {
    e.preventDefault();
    title.classList.remove("pokemon__name--show");
    pokemonName = await makePokemon();
    console.log(pokemonName);
    console.log("newgamebutton")
    attempts = 0;
    button.classList.remove("guess-form__reset--newgame");
  });
}

const input = document.querySelector("input");
input.addEventListener("invalid", (event) => {
  event.preventDefault();
  input.classList.add("pokemon__error");
});

input.addEventListener("click", (event) => {
  event.preventDefault();
  input.classList.remove("pokemon__error");
});

function displayName() {
  title.innerText = pokemonName;
  title.classList.add("pokemon__name--show");
}
