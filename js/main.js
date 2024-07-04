import PokemonGame from "./pokemonGame-api.js";
const pokemonGame = new PokemonGame();
const imgContainer = document.querySelector(".pokemon__container");
const image = document.createElement("img");
const guessForm = document.querySelector(".guess-form");
const title = document.querySelector(".pokemon__name");
const input = document.querySelector("input");
const enterGuessText = document.querySelector(".guess-form__text");
const feedback = document.querySelector(".pokemon__message");
const resetButton = document.querySelector(".guess-form__reset");
let attempts = 0;
let pokemonName;

const makePokemon = async () => {
  image.removeAttribute("class");
  let pokemon = await pokemonGame.getPokemon();
  const src = pokemon.img;
  const pokemonName = pokemon.name;
  image.classList.add("pokemon__image");
  image.setAttribute("src", src);
  imgContainer.appendChild(image);
  return pokemonName;
};

pokemonName = await makePokemon();
guessForm.addEventListener("submit", onSubmitGuess);

function onSubmitGuess(e) {
  e.preventDefault();
  feedback.innerText = "";
  if (e.target.guess.value.trim() === "") {
    input.classList.add("guess-form__input--invalid");
    feedback.innerText = "Enter a name please.";
  }
  else {
    const guess = e.target.guess.value;
    input.classList.remove("guess-form__input--invalid");
    guessForm.reset();
    evaluateGuess(guess, pokemonName, feedback);
  }

}

function evaluateGuess(guess, pokemonName, feedback) {
  if (checkGuess(guess, pokemonName)) {
    image.classList.add("pokemon__image--original");
    if (attempts >= 1) {
      feedback.classList.remove("pokemon__message--incorrect");
    }
    feedback.classList.add("pokemon__message--correct");
    feedback.innerText = "Congratulations you are a master Pokémon poacher ";
    resetButton.classList.add("guess-form__reset--newgame");
    displayName();
    resetButton.addEventListener("click", addNewGame);
    enterGuessText.classList.add("guess-form__text--hide");
  } else {
    attempts++;
    feedback.innerText = `You guessed "${guess}". That is incorrect! Two more tries.`;
    feedback.classList.add("pokemon__message--incorrect");
    switch (attempts) {
      case 1:
        image.classList.add("pokemon__image--second");
        break;
      case 2:
        image.classList.add("pokemon__image--third");
        feedback.innerText = `You guessed "${guess}": that is incorrect. One more try left.`;
        break;
      default:
        image.classList.add("pokemon__image--original");
        feedback.classList.add("pokemon__message--correct");
        feedback.innerText = `The correct answer is "${pokemonName}"! New Game?`;
        displayName();
        resetButton.classList.add("guess-form__reset--newgame");
        resetButton.addEventListener("click", addNewGame);
        enterGuessText.classList.add("guess-form__text--hide");
        break;
    }
  }
}

async function addNewGame(e) {
  e.preventDefault();
  pokemonName = await makePokemon();
  attempts = 0;
  title.classList.remove("pokemon__name--show");
  enterGuessText.classList.remove("guess-form__text--hide");
  feedback.innerText = "";
  feedback.classList.remove("pokemon__message--correct");
  feedback.classList.remove("pokemon__message--incorrect");
  resetButton.classList.remove("guess-form__reset--newgame");
}

// HELPER FUNCTIONS
function checkGuess(name, pokemon) {
  if (name == pokemon) {
    return true;
  }
  return false;
}

function displayName() {
  title.innerText = pokemonName;
  title.classList.add("pokemon__name--show");
}