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

  menuLinks.forEach((link) => link.setAttribute("tabindex", "-1"));

  openMenuButton.addEventListener("click", function () {
    document.documentElement.classList.add("no-scroll");
    navShown.classList.add("menu-open");
    openMenuButton.classList.add("hidden-menu");
    document.querySelector(".menu-button.menu").style.display = "flex";
    menuLinks.forEach((link) => link.setAttribute("tabindex", "0"));
    firstMenuLink.focus();
  });

  closeMenuButton.addEventListener("click", function () {
    document.documentElement.classList.remove("no-scroll");
    navShown.classList.remove("menu-open");
    openMenuButton.classList.remove("hidden-menu");
    document.querySelector(".menu-button.menu").style.display = "none";
    menuLinks.forEach((link) => link.setAttribute("tabindex", "-1"));
  });

  document.addEventListener("keydown", function (event) {
    if (navShown.classList.contains("menu-open")) {
      const isTabPressed = event.key === "Tab";
      if (isTabPressed) {
        if (event.shiftKey && document.activeElement === firstMenuLink) {
          event.preventDefault();
          closeMenuButton.focus();
        } else if (
          !event.shiftKey &&
          document.activeElement === closeMenuButton
        ) {
          event.preventDefault();
          firstMenuLink.focus();
        } else if (
          event.shiftKey &&
          document.activeElement === closeMenuButton
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