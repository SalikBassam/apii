let root = document.getElementById("root2");
let modal = document.querySelectorAll(".modal");
let Searchbtn = document.querySelector("#Searchbtn");
let countries = document.querySelector(".countries");
let categories = document.querySelector(".categories");
let SearchCatego = document.querySelector("#SearchCatego");

/////////////////////////// content of card

function Content(e) {
  root.innerHTML += `
  <div class="card text-center" style="width: 18rem;">
    <img src="${e.strMealThumb}" class="card-img-top" alt="...">
    <div class="card-body">
      <h5 class="card-title">${e.strMeal}</h5>
      <button class="btn btn-primary mx-5 btnMore">More</button>
    </div>
    </div>
  `;
}

/////////List all areas///////////////
async function getAreaOpt() {
  try {
    const responce = await fetch(
      "https://www.themealdb.com/api/json/v1/1/list.php?a=list"
    );
    const data = await responce.json();
    console.log(data.meals);
    for (let i = 0; i < data.meals.length; i++) {
      if (data.meals[i].strArea === "Moroccan") {
        countries.innerHTML += `<option selected>${data.meals[i].strArea}</option>`;
      } else {
        countries.innerHTML += `<option>${data.meals[i].strArea}</option>`;
      }
    }
  } catch (error) {
    console.error(error);
  }
}
getAreaOpt();

/////////List all categories///////////////
async function getCategoryOpt() {
  const responce = await fetch(
    "https://www.themealdb.com/api/json/v1/1/list.php?c=list"
  );
  const data = await responce.json();
  for (let i = 0; i < data.meals.length; i++) {
    if (data.meals[i].strCategory === "Lamb") {
      categories.innerHTML += `<option selected>${data.meals[i].strCategory}</option>`;
    } else {
      categories.innerHTML += `<option>${data.meals[i].strCategory}</option>`;
    }
  }
}
getCategoryOpt();

///////////////////////////// search by category and area

async function getElements() {
  const responceArea = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?a=${countries.value}`
  );
  const dataArea = await responceArea.json();
  const array = [];

  const responce = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?c=${categories.value}`
  );
  const data = await responce.json();

  if (categories.value === "All Categories") {
    root.innerHTML = "";
    for (let i = 0; i < dataArea.meals.length; i++) {
      Content(dataArea.meals[i]);
    }

  }else if(countries.value === "All countries"){
    root.innerHTML = "";
    for (let i = 0; i < data.meals.length; i++) {
      Content(data.meals[i]);
    }
  }else if(countries.value === "All countries" && categories.value === "All Categories"){
    root.innerHTML = "";
    let arrBoth = []
    for (let i = 0; i < data.meals.length; i++) {
arrBoth.push(data.meals[i])
    }
    for (let i = 0; i < dataArea.meals.length; i++) {
      arrBoth.push(dataArea.meals[i])
          }
      Content(arrBoth);    
  } else {
    for (let i = 0; i < dataArea.meals.length; i++) {
      array.push(dataArea.meals[i].idMeal);
    }

    root.innerHTML = "";
    for (let i = 0; i < data.meals.length; i++) {
      if (array.includes(data.meals[i].idMeal)) {
        Content(data.meals[i]);
      }
    }
  }
}



