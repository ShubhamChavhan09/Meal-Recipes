const search = document.getElementById("search");
const submit = document.getElementById("submit");
const random = document.getElementById("random");
const mealsEl = document.getElementById("meals");
const resultHeading = document.getElementById("result-heading");
const single_mealEl = document.getElementById("single-meal");

function searchMeal(e) {
  e.preventDefault();

  //clear
  single_mealEl.innerHTML = "";

  // get the search input
  const term = search.value;

  if (term.trim()) {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        resultHeading.innerHTML = `<h2>Search results for '${term}' :</h2>`;

        if (data.meals === null) {
          resultHeading.innerHTML = `<p>There is no search results. Try again!</p>`;
        } else {
          mealsEl.innerHTML = data.meals
            .map(
              (meal) => `
                    <div class='meal'>
                        <img src='${meal.strMealThumb}' alt='${meal.strMeal}' />
                        <div class="meal-info" data-mealID="${meal.idMeal}">
                            <h3>${meal.strMeal}</h3>
                        </div>
                   </div>`
            )
            .join("");
        }
      });
    //clear search text
    search.value = "";
  } else {
    alert("Please enter a search term");
  }
}

submit.addEventListener("submit", searchMeal);

mealsEl.addEventListener("click", (e) => {
  const mealInfo = e.path.find((item) => {
    if (item.classList) {
      return item.classList.contains("meal-info");
    } else {
      return false;
    }
  });
  console.log(mealInfo);
});
