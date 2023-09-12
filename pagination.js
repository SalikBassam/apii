/*let elems = document.querySelectorAll(".elem")
let nums = document.querySelectorAll(".num")





nums.forEach(function(e) {
    e.addEventListener("click",function(){
        nums.forEach(function(el){
            el.classList.remove("activeN");
        });      

        e.classList.add("activeN")

        elems.forEach(function(elm){
            elm.classList.remove("active");
            elems.forEach(function (ee) {
                if (e.classList[1] === ee.classList[1]) {
                    ee.classList.add("active")                  
                }
            })
        });
        
        
    })
})
/*
let elems = document.querySelectorAll(".elem");
let nums = document.querySelectorAll(".num");

nums.forEach(function(e) {
    e.addEventListener("click", function() {
      removeActiveClass(nums, "activeN");
      e.classList.add("activeN");
      removeActiveClass(elems, "active");
      addActiveClass(elems, e);
    });
});

function removeActiveClass(elements, className) {
    elements.forEach(function(elem) {
        elem.classList.remove(className);
    });
}

function addActiveClass(elements, activeElement) {
    elements.forEach(function(elem) {
        if (activeElement.classList.contains(elem.classList[1])) {
            elem.classList.add("active");
        }
    });
}


*/