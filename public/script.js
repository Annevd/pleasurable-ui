// Variable Declarations

const openMenuButton = document.querySelector(".menu-button.home");
const closeMenuButton = document.querySelector(".menu-button.menu");
const navShown = document.querySelector("nav");
const menuLinks = document.querySelectorAll(".menu a");
const firstMenuLink = menuLinks[0];
const lastMenuLink = menuLinks[menuLinks.length - 1];

const prevButton = document.querySelector(".pagination button:first-of-type");
const nextButton = document.querySelector(".pagination button:nth-of-type(2)");
const carrousel = document.querySelector(".lessons .stories ul");
const storyWidth = document.querySelector(".story");

let forms = document.querySelectorAll("form.like-form");
const loader = document.querySelector(".loader-container");

const openSettingsButton = document.querySelector(".playlist-head button");
const closeSettingsButton = document.querySelector("button.close-settings");
const settingsShown = document.querySelector(".playlist-settings-container");

// Code Logic

document.addEventListener("DOMContentLoaded", function () {
  // Menu
  const menuButton = document.querySelector('.menu-button');
  const navMenu = document.querySelector('.nav-menu');
  const menuLinks = navMenu.querySelectorAll('.menu a');

  // Function to update tabindex
  const setTabIndex = (links, index) => {
      links.forEach(link => {
          link.setAttribute('tabindex', index);
      });
  };

  // Initially set menu links to be not focusable
  setTabIndex(menuLinks, '-1');

  menuButton.addEventListener('click', () => {
      const expanded = menuButton.getAttribute('aria-expanded') === 'true' || false;
      menuButton.setAttribute('aria-expanded', !expanded);
      
      if (!expanded) {
          menuButton.classList.add('cross');
          navMenu.classList.add('show-menu');
          setTabIndex(menuLinks, '0');  // Make links focusable
          menuLinks[0].focus();
      } else {
          menuButton.classList.remove('cross');
          navMenu.classList.remove('show-menu');
          setTabIndex(menuLinks, '-1');  // Remove links from tab order
          menuButton.focus();
      }
  });

  // Allow navigation through the menu with the keyboard
  document.addEventListener('keydown', (event) => {
      if (event.key === 'Tab' && menuButton.getAttribute('aria-expanded') === 'true') {
          if (document.activeElement === menuButton) {
              menuLinks[0].focus();
              event.preventDefault();
          } else if (document.activeElement === menuLinks[menuLinks.length - 1]) {
              menuButton.focus();
              event.preventDefault();
          }
      }

      if (event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') {
          menuButton.setAttribute('aria-expanded', false);
          menuButton.classList.remove('cross');
          navMenu.classList.remove('show-menu');
          setTabIndex(menuLinks, '-1');  // Remove links from tab order
          menuButton.focus();
      }
  });
});

// nav menu hamburger icon animation script

const menuBtn = document.querySelector(".hamburger")
const menuNav = document.querySelector(".nav-menu")

menuBtn.addEventListener("click", function() {
  menuBtn.classList.toggle("cross")
  menuNav.classList.toggle("show-menu")
})


  // Client-side Fetch

  forms.forEach(function (form) {

    form.addEventListener("submit", function (event) {

      loader.classList.add("show");

      let data = new FormData(this);

      data.append("enhanced", true);

      fetch(this.action, {
        method: this.method,
        body: new URLSearchParams(data),
      })

        .then(function (response) {
          return response.text();
        })

        .then(function (responseHTML) {
          if (document.startViewTransition) {
            document.startViewTransition(function() {
              document.querySelector(".liked-playlists > div").innerHTML =
              responseHTML
            })

          } else {
            document.querySelector(".liked-playlists > div").innerHTML =
            responseHTML;
          }

          loader.classList.remove("show");

        });
      event.preventDefault();
    });
  });


// Settings

if (openSettingsButton) {
 openSettingsButton.addEventListener("click", function () {
   document.documentElement.classList.add("no-scroll");
   settingsShown.classList.add("open-settings");
 });
 
 closeSettingsButton.addEventListener("click", function () {
   document.documentElement.classList.remove("no-scroll");
   settingsShown.classList.remove("open-settings");
 });
}

// GSAP carrousel pagination
document.addEventListener("DOMContentLoaded", function() {
 const buttons = document.querySelectorAll(".pagination button");
 const select = document.querySelector(".pagination .select");
 const storiesContent = document.querySelector(".stories-content");
 const columnWidth = storiesContent.scrollWidth / buttons.length;

 buttons.forEach((button, index) => {
     button.addEventListener("mouseenter", function(e) {
         animateSelect(e);
     });
     
     button.addEventListener("click", function() {
         scrollToColumn(index);
     });
// keyboard accessibility
     button.addEventListener("focus", function(e) {
      animateSelect(e);
  });

  button.addEventListener("keydown", function(e) {
      if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          scrollToColumn(index);
      }
  });
 });

 function animateSelect(e) {
     const target = e.currentTarget;
     gsap.to(select, {
         duration: 2, 
         x: target.offsetLeft - 37, // voor de positie van de selector
         ease: Elastic.easeOut.config(0.8, 0.5)
     });
 }

 function scrollToColumn(index) {
     const scrollPosition = columnWidth * index;
     gsap.to(storiesContent, {
         duration: 0.1,
         scrollLeft: scrollPosition,
         ease: 'power1.inOut'
     });
 }
});
