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
  let innerHTMLStr = `<h2>${drink.strDrink} (${drink.strAlcoholic})</h2>`;
  innerHTMLStr += `<h3>${drink.strCategory} (<i>${drink.strGlass})</i></h3>`;
  innerHTMLStr += `<ul>
  <li>${drink.strMeasure1} <b>${drink.strIngredient1}</b></li>
  <li>${drink.strMeasure2} <b>${drink.strIngredient2}</b></li>
  <li>${drink.strMeasure3} <b>${drink.strIngredient3}</b></li>
  <li>${drink.strMeasure4} <b>${drink.strIngredient4}</b></li>
  <li>${drink.strMeasure5} <b>${drink.strIngredient5}</b></li>
  </ul>`;
  innerHTMLStr += `<p><i>${drink.strInstructions}</i></p>`;
  drinkContainer.innerHTML = innerHTMLStr;
}
