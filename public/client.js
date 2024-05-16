const menuBtn = document.querySelector(".menu-btn");
const nav = document.querySelector("nav");
const header = document.querySelector("header");
const hamOne = document.querySelector(".rect-one");
const hamTwo = document.querySelector(".rect-two");
const hamThree = document.querySelector(".rect-three");

menuBtn.addEventListener("click", function () {
  nav.classList.toggle("show");
  menuBtn.classList.toggle("move-btn");
  menuBtn.classList.toggle("cross")
});

// close menu when clicked outside of it
document.onclick = function(e){
    if (!menuBtn.contains(e.target) && !nav.contains(e.target) ) {
        nav.classList.remove("show");
        menuBtn.classList.remove("move-btn");
        menuBtn.classList.remove("cross")
    }
}