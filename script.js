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
  innerHTMLStr += `<h3>${drink.strCategory}</h3>`;
  innerHTMLStr += `<ul>
  <li>${drink.strIngredient1} ${drink.strMeasure1}</li>
  <li>${drink.strIngredient2} ${drink.strMeasure2}</li>
  <li>${drink.strIngredient3} ${drink.strMeasure3}</li>
  <li>${drink.strIngredient4} ${drink.strMeasure4}</li>
  <li>${drink.strIngredient5} ${drink.strMeasure5}</li>
  </ul>`;
  drinkContainer.innerHTML = innerHTMLStr;
}
