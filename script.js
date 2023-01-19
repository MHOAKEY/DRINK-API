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
  <li>${drink.strMeasure1} ${drink.strIngredient1}</li>
  <li>${drink.strMeasure2} ${drink.strIngredient2}</li>
  <li>${drink.strMeasure3} ${drink.strIngredient3}</li>
  <li>${drink.strMeasure4} ${drink.strIngredient4}</li>
  <li>${drink.strMeasure5} ${drink.strIngredient5}</li>
  </ul>`;
  innerHTMLStr += `<p><i>${drink.strInstructions}</i></p>`;
  drinkContainer.innerHTML = innerHTMLStr;
}
