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

// close menu when clicked outside of it
document.onclick = function(e){
  if (!menuBtn.contains(e.target) && !menuNav.contains(e.target) ) {
      menuNav.classList.remove("show");
      menuBtn.classList.remove("move-btn");
      menuBtn.classList.remove("cross")
  }
}

menuNav.addEventListener("click", function() {
  console.log("click!")
})



// mouse eye follow animations

document.addEventListener('mousemove', (event) => {
  const cursorX = event.clientX
  const cursorY = event.clientY

  const rightEye = document.querySelector('.right-eye-area')
  const rightPupil = document.querySelector('.right-pupil')
  const leftEye = document.querySelector('.left-eye-area')
  const leftPupil = document.querySelector('.left-pupil')
  moveRightEye(rightEye, rightPupil, cursorX, cursorY)
  moveLeftEye(leftEye, leftPupil, cursorX, cursorY)
})

function moveRightEye(rightEye, rightPupil, cursorX, cursorY) {
  const rightEyeRect = rightEye.getBoundingClientRect()
  const rightEyeCenterX = rightEyeRect.left + rightEyeRect.width / 2
  const rightEyeCenterY = rightEyeRect.top + rightEyeRect.height / 2

  const rightDeltaX = cursorX - rightEyeCenterX;
  const rightDeltaY = cursorY - rightEyeCenterY;
  const rightDistance = Math.sqrt(rightDeltaX * rightDeltaX + rightDeltaY * rightDeltaY);

  // Limit the pupil movement to within the eyeball
  const rightMaxMovement = rightEyeRect.width / 8; // Maximum movement within the eye area (adjust as necessary)
  const rightLimitedDistance = Math.min(rightDistance, rightMaxMovement);
  const rightAngle = Math.atan2(rightDeltaY, rightDeltaX);
  const rightPupilX = rightLimitedDistance * Math.cos(rightAngle);
  const rightPupilY = rightLimitedDistance * Math.sin(rightAngle);

  rightPupil.style.transform = `translate(${rightPupilX}px, ${rightPupilY}px)`;
}

function moveLeftEye(leftEye, leftPupil, cursorX, cursorY) {
  const leftEyeRect = leftEye.getBoundingClientRect()
  const leftEyeCenterX = leftEyeRect.left + leftEyeRect.width / 2
  const leftEyeCenterY = leftEyeRect.top + leftEyeRect.height / 2

  const leftDeltaX = cursorX - leftEyeCenterX;
  const leftDeltaY = cursorY - leftEyeCenterY;
  const leftDistance = Math.sqrt(leftDeltaX * leftDeltaX + leftDeltaY * leftDeltaY);

  // Limit the pupil movement to within the eyeball
  const leftMaxMovement = leftEyeRect.width / 8; // Maximum movement within the eye area (adjust as necessary)
  const leftLimitedDistance = Math.min(leftDistance, leftMaxMovement);
  const leftAngle = Math.atan2(leftDeltaY, leftDeltaX);
  const leftPupilX = leftLimitedDistance * Math.cos(leftAngle);
  const leftPupilY = leftLimitedDistance * Math.sin(leftAngle);

  leftPupil.style.transform = `translate(${leftPupilX}px, ${leftPupilY}px)`;
}