// Variable Declarations 📦//
  // Menu
const menuBtn = document.querySelector(".hamburger")
const menuNav = document.querySelector(".nav-menu")
const menuLinks = menuNav.querySelectorAll('.menu a');
const heart = document.querySelector(".heart");
const tlAlert = gsap.timeline({ paused: true });
const heartAlert = document.querySelector(".menu li:last-of-type svg")

  // Carrousel
const prevButton = document.querySelector(".pagination-wrapper button:first-of-type");
const nextButton = document.querySelector(".pagination-wrapper button:nth-of-type(2)");
const carrousel = document.querySelector(".lessons .stories ul");
const storyWidth = document.querySelector(".story");
const paginationWrapper = document.querySelector('.pagination-wrapper')

  // Form interaction
let forms = document.querySelectorAll("form.like-form");
const loader = document.querySelector(".loader-container");

  // Playlist settings
const openSettingsButton = document.querySelector(".playlist-head button");
const closeSettingsButton = document.querySelector("button.close-settings");
const settingsShown = document.querySelector(".playlist-settings-container");

// Code Logic 🖖//

document.addEventListener("DOMContentLoaded", function () {

if (carrousel) {
  prevButton.addEventListener("click", function () {
      if (carrousel.scrollLeft > 0) {
          carrousel.scrollBy({
              left: -storyWidth.offsetWidth,
              behavior: "smooth",
          });
          paginationWrapper.classList.add('transition-prev');
          setTimeout(cleanClasses, 500);
      }
  });

  nextButton.addEventListener("click", function () {
      if (carrousel.scrollLeft + carrousel.clientWidth < carrousel.scrollWidth) {
          carrousel.scrollBy({
              left: storyWidth.offsetWidth,
              behavior: "smooth",
          });
          paginationWrapper.classList.add('transition-next');
          setTimeout(cleanClasses, 500);
      }
  });

  document.addEventListener("keydown", function (event) {
      switch(event.key) {
          case 'ArrowLeft':
              if (carrousel.scrollLeft > 0) {
                  carrousel.scrollBy({
                      left: -storyWidth.offsetWidth,
                      behavior: "smooth",
                  });
                  paginationWrapper.classList.add('transition-prev');
                  setTimeout(cleanClasses, 500);
              }
              break;
          case 'ArrowRight':
              if (carrousel.scrollLeft + carrousel.clientWidth < carrousel.scrollWidth) {
                  carrousel.scrollBy({
                      left: storyWidth.offsetWidth,
                      behavior: "smooth",
                  });
                  paginationWrapper.classList.add('transition-next');
                  setTimeout(cleanClasses, 500);
              }
              break;
      }
  });
}

function cleanClasses() {
    paginationWrapper.classList.remove('transition-prev');
    paginationWrapper.classList.remove('transition-next');
}

  // Client-side Fetch

  forms.forEach(function (form) {
    form.addEventListener("submit", function (event) {
      loader.classList.add("show");

      let data = new FormData(this);
      data.append("enhanced", true);

      const playlistItem = this.closest(".playlist");
      const isLikeAction = playlistItem.classList.contains("unliked");

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
              document.querySelector(".liked-playlists > div").innerHTML = responseHTML;
            });
          } else {
            document.querySelector(".liked-playlists > div").innerHTML = responseHTML;
          }

          loader.classList.remove("show");

          // Update the playlist item state
          if (isLikeAction) {
            playlistItem.classList.remove("unliked");
          } else {
            playlistItem.classList.add("unliked");
          }
        });

      // Trigger the GSAP animation only for the like action
      if (isLikeAction) {
        tlAlert.restart();
        heartAlert.classList.add("heart-alert")
      }

      // Prevent default form submission
      event.preventDefault();
    });
  });

  // Function to update tabindex
  const setTabIndex = (links, index) => {
      links.forEach(link => {
          link.setAttribute('tabindex', index);
      });
  };

  // Initially set menu links to be not focusable
  setTabIndex(menuLinks, '-1');

  menuBtn.addEventListener('click', () => {
      const expanded = menuBtn.getAttribute('aria-expanded') === 'true' || false;
      menuBtn.setAttribute('aria-expanded', !expanded);
      
      if (!expanded) {
          menuBtn.classList.add('cross');
          menuNav.classList.add('show-menu');
          setTabIndex(menuLinks, '0');  // Make links focusable
          menuLinks[0].focus();
      } else {
          menuBtn.classList.remove('cross');
          menuNav.classList.remove('show-menu');
          setTabIndex(menuLinks, '-1');  // Remove links from tab order
          menuBtn.focus();
      }
  });

  // Allow navigation through the menu with the keyboard
  document.addEventListener('keydown', (event) => {
      if (event.key === 'Tab' && menuBtn.getAttribute('aria-expanded') === 'true') {
          if (document.activeElement === menuBtn) {
              menuLinks[0].focus();
              event.preventDefault();
          } else if (document.activeElement === menuLinks[menuLinks.length - 1]) {
              menuBtn.focus();
              event.preventDefault();
          }
      }

      if (event.key === 'Escape' && menuBtn.getAttribute('aria-expanded') === 'true') {
          menuBtn.setAttribute('aria-expanded', false);
          menuBtn.classList.remove('cross');
          menuNav.classList.remove('show-menu');
          setTabIndex(menuLinks, '-1');  // Remove links from tab order
          menuBtn.focus();
      }
  });

  // Like melding

  tlAlert
  .from(heart, {
    duration:.6,
    opacity:0,
  })
  .from(heart, {
    duration:.8,
    y:"-8em",
    scale:3,
    ease: "power2.in",
  }, "<")
  .to(menuBtn, {
    duration:.1,
    y:"0.3em",
  }, "-=.2")
  .to(menuBtn, {
    duration:1.5,
    y:"0em",
    ease: "elastic.out(1,0.3)",
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

menuNav.addEventListener("click", function() {
  console.log("click!")
})



// mouse eye follow animations

// Add an event listener to track mouse movement
document.addEventListener('mousemove', (event) => {
  // Get the current cursor position
  const cursorX = event.clientX;
  const cursorY = event.clientY;

  // Select the elements representing the right eye area and right pupil
  const rightEye = document.querySelector('.right-eye-area');
  const rightPupil = document.querySelector('.right-pupil');
  
  // Select the elements representing the left eye area and left pupil
  const leftEye = document.querySelector('.left-eye-area');
  const leftPupil = document.querySelector('.left-pupil');
  
  // Move the right pupil according to the cursor position
  moveRightEye(rightEye, rightPupil, cursorX, cursorY);
  
  // Move the left pupil according to the cursor position
  moveLeftEye(leftEye, leftPupil, cursorX, cursorY);
});

// Function to move the right pupil
function moveRightEye(rightEye, rightPupil, cursorX, cursorY) {
  // Get the bounding rectangle of the right eye area
  const rightEyeRect = rightEye.getBoundingClientRect();
  // Calculate the center coordinates of the right eye area
  const rightEyeCenterX = rightEyeRect.left + rightEyeRect.width / 2;
  const rightEyeCenterY = rightEyeRect.top + rightEyeRect.height / 2;

  // Calculate the difference between the cursor position and the eye center
  const rightDeltaX = cursorX - rightEyeCenterX;
  const rightDeltaY = cursorY - rightEyeCenterY;
  // Calculate the distance between the cursor and the eye center
  const rightDistance = Math.sqrt(rightDeltaX * rightDeltaX + rightDeltaY * rightDeltaY);

  // Limit the pupil movement to within the eyeball
  const rightMaxMovement = rightEyeRect.width / 8; // Maximum movement within the eye area (adjust as necessary)
  const rightLimitedDistance = Math.min(rightDistance, rightMaxMovement);
  // Calculate the angle between the cursor and the eye center
  const rightAngle = Math.atan2(rightDeltaY, rightDeltaX);
  // Calculate the new position for the right pupil
  const rightPupilX = rightLimitedDistance * Math.cos(rightAngle);
  const rightPupilY = rightLimitedDistance * Math.sin(rightAngle);

  // Move the right pupil to the new position
  rightPupil.style.transform = `translate(${rightPupilX}px, ${rightPupilY}px)`;
}

// Function to move the left pupil
function moveLeftEye(leftEye, leftPupil, cursorX, cursorY) {
  // Get the bounding rectangle of the left eye area
  const leftEyeRect = leftEye.getBoundingClientRect();
  // Calculate the center coordinates of the left eye area
  const leftEyeCenterX = leftEyeRect.left + leftEyeRect.width / 2;
  const leftEyeCenterY = leftEyeRect.top + leftEyeRect.height / 2;

  // Calculate the difference between the cursor position and the eye center
  const leftDeltaX = cursorX - leftEyeCenterX;
  const leftDeltaY = cursorY - leftEyeCenterY;
  // Calculate the distance between the cursor and the eye center
  const leftDistance = Math.sqrt(leftDeltaX * leftDeltaX + leftDeltaY * leftDeltaY);

  // Limit the pupil movement to within the eyeball
  const leftMaxMovement = leftEyeRect.width / 8; // Maximum movement within the eye area (adjust as necessary)
  const leftLimitedDistance = Math.min(leftDistance, leftMaxMovement);
  // Calculate the angle between the cursor and the eye center
  const leftAngle = Math.atan2(leftDeltaY, leftDeltaX);
  // Calculate the new position for the left pupil
  const leftPupilX = leftLimitedDistance * Math.cos(leftAngle);
  const leftPupilY = leftLimitedDistance * Math.sin(leftAngle);

  // Move the left pupil to the new position
  leftPupil.style.transform = `translate(${leftPupilX}px, ${leftPupilY}px)`;
}

// nav menu hamburger icon animation script

menuBtn.addEventListener("click", function() {
  menuBtn.classList.toggle("cross")
  menuNav.classList.toggle("show-menu")
})
