const loadMeal = (searchText) => {
  const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayMeals(data.meals))
    .catch((error) => {
      console.log(error);
    });
};
const displayMeals = (meals) => {
  console.log(meals);
  const mealsContainer = document.getElementById("meals-container");
  mealsContainer.innerText = "";
  //   console.log(meals.length);
  //   console.log(meals);

  const noMealFound = document.getElementById("not-found");
  if (meals.length === 0) {
    noMealFound.classList.remove("d-none");
  } else {
    noMealFound.classList.add("d-none");
  }

  // show more button
  const showMore = document.getElementById("show-more");
  if (meals.length > 10) {
    meals = meals.slice(0, 10);
    showMore.classList.remove("d-none");
  } else {
    showMore.classList.add("d-none");
  }

  meals.forEach((meal) => {
    // console.log(meal);
    const mealDiv = document.createElement("div");
    mealDiv.classList.add("col");
    mealDiv.innerHTML = `
        <div class="card mb-3" style="max-width: 540px;">
                    <div class="row g-0">
                        <div class="col-md-4">
                            <img src="${meal.strMealThumb}" class="img-fluid rounded-start " alt="...">
                        </div>
                        <div class="col-md-8">
                            <div class="card-body">
                                <h5 class="card-title"><strong>${meal.strMeal}</strong></h5>
                                <p class="card-text">A meal is an eating occasion that takes place at a certain time and includes consumption of food. The names used for specific meals in English vary, depending on the speaker's culture, the time of day, or the size of the meal.</p>
                                <!-- <a href="#" class="">View Details</a> -->
                                <!-- Button trigger modal -->
                                <button onclick="loadMealDetails(${meal.idMeal})" type="button" class="btnModal fst-italic"  data-bs-toggle="modal"
                                    data-bs-target="#exampleModal">
                                    View Details
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                `;
    mealsContainer.appendChild(mealDiv);
  });
  // stop loader
  toggleSpinner(false);
};

// search food
const searchMeals = () => {
  //   const searchField = document.getElementById("search-field");
  //   // start loader
  //   toggleSpinner(true);

  //   const searchText = searchField.value;
  //   loadMeal(searchText);
  //   searchField.value = "";
  processSearch(10);
};

const loadMealDetails = (idMeal) => {
  const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayMealDetails(data.meals[0]));

  console.log(idMeal);
};
// display meal details in modal
const displayMealDetails = (meal) => {
  const container = document.getElementById("modalSection");
  container.innerHTML = `
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">${meal.strMeal}</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div id="modal-body" class="modal-body mx-auto">
                        <div id="meal-image" class="">
                            <img src="${meal.strMealThumb}" alt="" srcset=""> 
                        </div>
                        <p class="mt-3"><strong>Catagory:</strong> 
                            <span>
                                ${meal.strCategory}
                            </span></p>
                        <p ><strong>Area:</strong> <span>${meal.strArea}</span></p>
                        <p><strong>Instructions:</strong> <span>${meal.strInstructions}</span></p>
                        <p><strong>Youtube:</strong> 
                            <span>
                                <a href="" id="Youtube">${meal.strYoutube}</a>
                            </span></p>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-warning" data-bs-dismiss="modal">Close</button>
                    </div>
                    </div>
    `;
};
const processSearch = (dataLimit) => {
  const searchField = document.getElementById("search-field");
  // start loader
  toggleSpinner(true);

  const searchText = searchField.value;
  loadMeal(searchText, dataLimit);
  searchField.value = "";
};

// loader
const toggleSpinner = (isLoading) => {
  const loaderSection = document.getElementById("loader");
  if (isLoading) {
    loaderSection.classList.remove("d-none");
  } else {
    loaderSection.classList.add("d-none");
  }
};

// show more button
// document.getElementById('show-more').addEventListener("click", function () {
//     // processSearch();
//     // displayMeals();
// });

loadMeal("");
