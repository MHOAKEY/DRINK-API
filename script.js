const drinkContainer = document.getElementById("drinkContainer");

function getDrinkData() {
  fetch("https://www.thecocktaildb.com/api/json/v1/1/random.php")
    .then((response) => response.json())
    .then((jsonResponse) => {
      renderDrinkData(jsonResponse.drinks[0]);
      console.log(jsonResponse.drinks[0]);
    });
}

function renderDrinkData(drink) {
  drinkContainer.innerHTML = drink.strDrink;
}
