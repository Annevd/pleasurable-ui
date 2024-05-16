// Variable Declarations

const menuButton = document.querySelector(".menu-button");
const nav = document.querySelector("nav");
const menuLinks = document.querySelectorAll(".menu a");
const firstMenuLink = menuLinks[0];
const lastMenuLink = menuLinks[menuLinks.length - 1];
let isOpen = false; // Initially, the menu is closed

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

  nav.classList.remove('menu-open')

  menuLinks.forEach((link) => link.setAttribute("tabindex", "-1"));

    menuButton.addEventListener("click", function () {
        nav.classList.toggle("menu-open");
        isOpen = !isOpen; // Toggle the menu state
        menuLinks.forEach((link) => link.setAttribute("tabindex", isOpen ? "0" : "-1"));
        if (isOpen) {
            firstMenuLink.focus();
        }
    });

    document.addEventListener("keydown", function (event) {
        if (isOpen) {
            const isTabPressed = event.key === "Tab";
            if (isTabPressed) {
                if (event.shiftKey && document.activeElement === firstMenuLink) {
                    event.preventDefault();
                    openMenuButton.focus();
                } else if (
                    !event.shiftKey &&
                    document.activeElement === menuButton
                ) {
                    event.preventDefault();
                    firstMenuLink.focus();
                } else if (
                    event.shiftKey &&
                    document.activeElement === menuButton
                ) {
                    event.preventDefault();
                    lastMenuLink.focus();
                }
            }
        }
    });


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