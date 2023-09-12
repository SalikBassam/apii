const root = document.getElementById("root");
const pagination_element = document.getElementById("pagination");

// ==================================== Random 6 meals in first screen ====================================
/////////Lookup a single random meal///////////////

for (let i = 0; i <= 5; i++) {
  async function get() {
    try {
      const responce = await fetch("https://www.themealdb.com/api/json/v1/1/random.php");
      const add = await responce.json();

// ############ loop for ingredients #############  
let ingredients = [];

for (let i = 1; i <= 20; i++) {
if (add.meals[0][`strIngredient${i}`]) {
  ingredients.push(add.meals[0][`strIngredient${i}`]);
}
}
let ingredientsList = ingredients.join(', ');

// ############ END OF loop for ingredients #############  

root.innerHTML += `
<div class="card text-center" style="width: 18rem;">
<img src="${add.meals[0].strMealThumb}" class="card-img-top" alt="...">
<div class="card-body">
<h5 class="card-title">${add.meals[0].strMeal}</h5>
<button class="btn btn-primary mx-5 btnMore">More</button>
</div>

<div class="modal">
<div class="modal-dialog text-start">
  <div class="modal-content">
    <div class="modal-header">
      <h5 class="modal-title">${add.meals[0].strMeal}</h5>
    </div>
    <div class="modal-body">
<img src="${add.meals[0].strMealThumb}" class="card-img-top img-modal" alt="...">
    <p><b>ingredients :</b> ${ingredientsList} </p>
      <p><b>Instruction :</b> ${add.meals[0].strInstructions}</p>
      <p><b>Category:</b> ${add.meals[0].strCategory}</p>
      <p><b>Area:</b> ${add.meals[0].strArea}</p>   
      <p><b>Tutorial:</b> <a href="${add.meals[0].strYoutube}">Click here </a></p>   
      
</div>
    <div class="modal-footer">
      <button type="button" class="btn btn-secondary closeModal" data-dismiss="modal" id="closeModal">Close</button>
    </div>
    </div>
</div>
</div>

`;



document.querySelectorAll(".btnMore").forEach(function (e) {
e.addEventListener("click",function () {
  e.parentNode.parentElement.children[2].style.display="block"
})
})

document.querySelectorAll(".closeModal").forEach(function (e) {
e.addEventListener("click",function () {
e.parentNode.parentElement.parentElement.parentElement.style.display="none"
})
})
} catch (error) {
console.error(error);
}
}

get();
}




/////////pagination///////////////
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
//////////////////////////////// END paginatiàon


/////////Search meal by name///////////////
const arr =[]
function getMealsList(){
root.innerHTML=""
searchResultPaginationArray = [];
async function get() {
try {
  const responce = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${SearchInput.value}`);
  const add = await responce.json();

  if (add.meals !== null) {
            let meals = "";
    
            add.meals.forEach((meal) => {
              meals = `
              
              <div class="card text-center" style="width: 18rem;">
      <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
      <div class="card-body">
      <h5 class="card-title">${meal.strMeal}</h5>
      <button class="btn btn-primary mx-5 btnMore">More</button>
      </div>
      
      <div class="modal">
      <div class="modal-dialog text-start">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">${meal.strMeal}</h5>
          </div>
          <div class="modal-body">
      <img src="${meal.strMealThumb}" class="card-img-top img-modal" alt="...">
            <p><b>Instruction :</b> ${meal.strInstructions}</p>
            <p><b>Category:</b> ${meal.strCategory}</p>
            <p><b>Area:</b> ${meal.strArea}</p>   
            <p><b>Tutorial:</b> <a href="${meal.strYoutube}">Click here </a></p>   
            
      </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary closeModal" data-dismiss="modal" id="closeModal">Close</button>
          </div>
          </div>
      </div>
      </div>
                              `;
              searchResultPaginationArray.push(meals);
              document.getElementById("SearchInput").value = "";
              pagination(meals);
            });
          } else {
            pagination_element.innerHTML = "";
            root.innerHTML = `<h2 id="nothingFound">Nothing found!</h2>`;
          }

// ############ END OF loop for ingredients #############  
document.querySelectorAll(".btnMore").forEach(function (e) {
e.addEventListener("click",function () {
  e.parentNode.parentElement.children[2].style.display="block"
})
})

document.querySelectorAll(".closeModal").forEach(function (e) {
e.addEventListener("click",function () {
e.parentNode.parentElement.parentElement.parentElement.style.display="none"
})
})
}

catch (error) {
  console.error(error);
}

}
get();
}


