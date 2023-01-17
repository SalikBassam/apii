let root = document.getElementById("root2");
let modal = document.querySelectorAll(".modal");
let Searchbtn = document.querySelector("#Searchbtn");
let countries = document.querySelector(".countries");
let categories = document.querySelector(".categories");
let SearchCatego = document.querySelector("#SearchCatego");

/////////List all areas///////////////
  async function getAreaOpt() {
    try {
      const responce = await fetch("https://www.themealdb.com/api/json/v1/1/list.php?a=list");
      const data = await responce.json();
      console.log(data.meals);
for (let i = 0; i < data.meals.length; i++) {
    if (data.meals[i].strArea === "Moroccan") {
        countries.innerHTML+=`<option selected>${data.meals[i].strArea}</option>`
   }else{
    countries.innerHTML+=`<option>${data.meals[i].strArea}</option>`
   }
}

} catch (error) {
console.error(error);
}
}
getAreaOpt();

/////////List all categories///////////////
async function getCategoryOpt() {
  const responce = await fetch("https://www.themealdb.com/api/json/v1/1/list.php?c=list");
  const data = await responce.json();
for (let i = 0; i < data.meals.length; i++) {

if (data.meals[i].strCategory === "Lamb") {
    categories.innerHTML+=`<option selected>${data.meals[i].strCategory}</option>`
}else{
categories.innerHTML+=`<option>${data.meals[i].strCategory}</option>`  
}
}
}
getCategoryOpt()



//################ create Element by searching

async function getElements(){
    
      


      const responceArea = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${countries.value}`);
    const dataArea = await responceArea.json();
   const array = []

   const responce = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${categories.value}`);
   const data = await responce.json();

    for (let i = 0; i < dataArea.meals.length; i++) {
      array.push(dataArea.meals[i].idMeal)
    }

////////////////////////////////////////////

root.innerHTML = "";
    for (let i = 0; i < data.meals.length; i++) {
      if (array.includes(data.meals[i].idMeal)) {
        root.innerHTML += `
        <div class="card text-center" style="width: 18rem;">
          <img src="${data.meals[i].strMealThumb}" class="card-img-top" alt="...">
          <div class="card-body">
            <h5 class="card-title">${data.meals[i].strMeal}</h5>
            <button class="btn btn-primary mx-5 btnMore">More</button>
          </div>
          </div>
        `;
      }
  
    }

}
  
















/////////////////////////////pagination
let searchResultPaginationArray = [];

function pagination(output) {

  if (searchResultPaginationArray.length > 6) {

    let current_page = 1;
    let cards = 6;

    function DisplayList(wrapper, page) {
      wrapper.innerHTML = "";
      page--;

      let start = cards * page;
      let end = start + cards;
      let paginatedItems = searchResultPaginationArray.slice(start, end);

      for (let i = 0; i < paginatedItems.length; i++) {
        let item = paginatedItems[i];

        let item_element = document.createElement("div");
        item_element.classList.add("item");
        item_element.classList.add("col-sm-3");
        item_element.classList.add("d-inline-block");
        item_element.classList.add("m-3");
        item_element.innerHTML = item;

        wrapper.appendChild(item_element);
      }
    }

    function SetupPagination() {
      pagination_element.innerHTML = "";

      let page_count = Math.ceil(searchResultPaginationArray.length / cards);
      for (let i = 1; i < page_count + 1; i++) {
        let btn = PaginationButton(i);
        pagination_element.appendChild(btn);
      }
    }

    function PaginationButton(page) {
      let button = document.createElement("button");
      button.classList.add("btn");
      button.classList.add("btn-outline-primary");
      button.classList.add("pagination-buttons");
      button.innerText = page;

      if (current_page == page) button.classList.add("active");

      button.addEventListener("click", function () {
        current_page = page;
        DisplayList(root, current_page);
        let current_btn = document.querySelector("button.active");
        current_btn.classList.remove("active");
        button.classList.add("active");
      });

      return button;
    }

    DisplayList(root, current_page);
    SetupPagination();
  } else {
    pagination_element.innerHTML = "";

    let parentDiv = document.createElement("div");
    parentDiv.classList.add("col-sm-3");
    parentDiv.classList.add("d-inline-block");
    parentDiv.classList.add("m-3");

    let appendingParentDiv = root.appendChild(parentDiv);

    appendingParentDiv.innerHTML = output;
  }
}