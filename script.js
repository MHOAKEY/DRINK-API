const drinkContainer = document.getElementById("drinkContainer-image");
const drinkTypeIngredients = document.getElementById(
  "drinkContainer-typeAndIngredients"
);
const drinkInstructions = document.getElementById(
  "drinkContainer-instructions"
);
const ingredientContainer = document.getElementById("ingredients");
let selectedIngredient = "";

ingredientContainer.addEventListener("change", () => {
  selectedIngredient = ingredientContainer.value;
});

function getDrinkById(idNumber) {
  fetch("https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=" + idNumber)
    .then((response) => response.json())
    .then((jsonResponse) => {
      renderDrinkData(jsonResponse.drinks[0]);
    });
}

function getIngredients() {
  fetch("https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list")
    .then((response) => response.json())
    .then((jsonResponse) => {
      renderIngredientsToList(jsonResponse.drinks);
    });
}

function getDrinkData() {
  fetch("https://www.thecocktaildb.com/api/json/v1/1/random.php")
    .then((response) => response.json())
    .then((jsonResponse) => {
      renderDrinkData(jsonResponse.drinks[0]);
    });
}

function getDrinkDataFromIngredientSelect() {
  fetch(
    "https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=" +
      selectedIngredient
  )
    .then((response) => response.json())
    .then((jsonResponse) => {
      getDrinkById(jsonResponse.drinks[0].idDrink);
    });
}

function renderDrinkData(drink) {
  let arr = [];

  for (let i = 1; i < 16; i++) {
    if (
      drink[`strIngredient${i}`] !== null &&
      drink[`strMeasure${i}`] !== null
    ) {
      arr.push(drink[`strMeasure${i}`] + " " + drink[`strIngredient${i}`]);
    } else if (
      drink[`strIngredient${i}`] !== null &&
      drink[`strMeasure${i}`] === null
    ) {
      arr.push(drink[`strIngredient${i}`]);
    }
  }

  let innerHTMLStr = `<img width="250px" src="${drink.strDrinkThumb}" />`;
  drinkContainer.innerHTML = innerHTMLStr;

  let typeIngredientsInHtmlStr = `<h2>${drink.strDrink} (${drink.strAlcoholic})</h2>`;
  arr.forEach((string) => {
    typeIngredientsInHtmlStr += `<li>${string}</li>`;
  });
  typeIngredientsInHtmlStr += `</ul>`;
  typeIngredientsInHtmlStr += `<h3>${drink.strCategory} (<i>${drink.strGlass})</i></h3>`;
  typeIngredientsInHtmlStr += `<ul>`;
  drinkTypeIngredients.innerHTML = typeIngredientsInHtmlStr;

  const instructionsInHtmlStr = `<p><i>${drink.strInstructions}</i></p>`;
  drinkInstructions.innerHTML = instructionsInHtmlStr;
}

function renderIngredientsToList(ingredients) {
  let selectIngredientStr;
  selectIngredientStr += `<option>Select Ingredient</option>`;

  ingredients.forEach((ingredient) => {
    selectIngredientStr += `<option value="${ingredient.strIngredient1}">${ingredient.strIngredient1}</option>`;
  });

  ingredientContainer.innerHTML = selectIngredientStr;
}

getIngredients();
