// Variable Declarations

const menuBtn = document.querySelector(".hamburger")
const menuNav = document.querySelector(".nav-menu")

const prevButton = document.querySelector(".pagination-wrapper button:first-of-type");
const nextButton = document.querySelector(".pagination-wrapper button:nth-of-type(2)");
const carrousel = document.querySelector(".lessons .stories ul");
const storyWidth = document.querySelector(".story");
const paginationWrapper = document.querySelector('.pagination-wrapper')

let forms = document.querySelectorAll("form.like-form");
const loader = document.querySelector(".loader-container");

const openSettingsButton = document.querySelector(".playlist-head button");
const closeSettingsButton = document.querySelector("button.close-settings");
const settingsShown = document.querySelector(".playlist-settings-container");

// Code Logic

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

// nav menu hamburger icon animation script

menuBtn.addEventListener("click", function() {
  menuBtn.classList.toggle("cross")
  menuNav.classList.toggle("show-menu")
})