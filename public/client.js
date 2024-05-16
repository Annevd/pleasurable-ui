const menuBtn = document.querySelector(".menu-btn")
const nav = document.querySelector("nav")
const header = document.querySelector("header")
const hamOne = document.querySelector(".rect-one")
const hamTwo = document.querySelector(".rect-two")
const hamThree = document.querySelector(".rect-three")

menuBtn.addEventListener("click", function() {
    nav.classList.toggle("show")
    hamOne.classList.toggle("cross-one")
    hamTwo.classList.toggle("fade-rect")
    hamThree.classList.toggle("cross-two")
})

