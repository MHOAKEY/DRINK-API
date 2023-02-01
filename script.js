const drinkContainer = document.getElementById("drinkContainer");
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

  let innerHTMLStr = `<h2>${drink.strDrink} (${drink.strAlcoholic})</h2>`;
  innerHTMLStr += `<img width="250px" src="${drink.strDrinkThumb}" />`;
  innerHTMLStr += `<h3>${drink.strCategory} (<i>${drink.strGlass})</i></h3>`;
  innerHTMLStr += `<ul>`;
  arr.forEach((string) => {
    innerHTMLStr += `<li>${string}</li>`;
  });
  innerHTMLStr += `</ul>`;
  innerHTMLStr += `<p><i>${drink.strInstructions}</i></p>`;
  drinkContainer.innerHTML = innerHTMLStr;
}

function renderIngredientsToList(ingredients) {
  let selectIngredientStr;

  ingredients.forEach((ingredient) => {
    selectIngredientStr += `<option value="${ingredient.strIngredient1}">${ingredient.strIngredient1}</option>`;
  });

  ingredientContainer.innerHTML = selectIngredientStr;
}

getIngredients();
