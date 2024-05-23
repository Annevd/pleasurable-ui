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

  // Carrousel
  if (carrousel) {
    prevButton.addEventListener("click", function () {
      carrousel.scrollBy({
        left: -storyWidth.offsetWidth,
        behavior: "smooth",
      });
    });

    nextButton.addEventListener("click", function () {
      carrousel.scrollBy({
        left: storyWidth.offsetWidth,
        behavior: "smooth",
      });
    });
  }

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
            document.startViewTransition(function () {
              document.querySelector(".liked-playlists > div").innerHTML =
                responseHTML;
            });
          } else {
            document.querySelector(".liked-playlists > div").innerHTML =
              responseHTML;
          }

          loader.classList.remove("show");
        });
      event.preventDefault();
    });
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

// menu

document.addEventListener('DOMContentLoaded', () => {
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

const menuBtn = document.querySelector(".hamburger");
const menuNav = document.querySelector(".nav-menu");

menuBtn.addEventListener("click", function () {
  menuBtn.classList.toggle("cross");
  menuNav.classList.toggle("show-menu");
});

// penguin eye follow

let penguinEyes = document.querySelector(".penguin-eyes");
let leftEye = document.querySelector(".left-eye-area");
let leftPupil = document.querySelector(".left-pupil");
let rightEye = document.querySelector(".right-eye-area");
let rightPupil = document.querySelector(".right-pupil");

// right eye code
let rightEyeArea = rightEye.getBoundingClientRect();
let rightR = rightEye.width / 2;
let rightr = rightPupil.width/2
let rightCenterX = rightEyeArea.left + rightR;
let rightCenterY = rightEyeArea.top + rightR;

document.addEventListener("mousemove", (e)=>{
  let x = e.clientX - rightCenterX,
      y = e.clientY - rightCenterY,
      theta = Math.atan2(y,x),
      angle = theta*180/Math.PI + 360;
  
  rightPupil.style.transform = `translateX(${rightR - rightr +"px"}) rotate(${angle + "deg"})`;
  rightPupil.style.transformOrigin = `${rightr +"px"} center`;
});
menuBtn.addEventListener("click", function() {
  menuBtn.classList.toggle("cross")
  menuNav.classList.toggle("show-menu")
})
