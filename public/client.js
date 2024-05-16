const menuBtn = document.querySelector(".menu-btn")
const nav = document.querySelector("nav")

menuBtn.addEventListener("click", function() {
    nav.classList.toggle("show")
})

// 

const ham = document.querySelector(".menu-btn");
const menu = document.querySelector('nav.menu');
const links = menu.querySelectorAll('.menu-list li');

var tl = gsap.timeline({ paused: true });

tl.to(menu, {
	duration: 1,
	opacity: 1,
	height: '100vh', // change this to 100vh for full-height menu
	ease: 'expo.inOut',
})
tl.from(links, {
	duration: 1,
	opacity: 0,
	y: 20,
	stagger: 0.1,
	ease: 'expo.inOut',
}, "-=0.5");

tl.reverse();

ham.addEventListener('click', () => {
	tl.reversed(!tl.reversed());
});