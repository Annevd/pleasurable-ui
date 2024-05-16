const menuBtn = document.querySelector(".menu-btn")
const nav = document.querySelector("nav")
const header = document.querySelector("header")

menuBtn.addEventListener("click", function() {
    nav.classList.toggle("show")
    header.style.backgroundColor = "#29292995"
    header.style.width = "100vw"
    header.style.height = "100vh"
})

