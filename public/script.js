// Variable Declarations 📦//
  // Menu
const menuBtn = document.querySelector(".hamburger")
const menuNav = document.querySelector(".nav-menu")
const heart = document.querySelector(".heart");
const tlAlert = gsap.timeline({ paused: true });
const heartAlert = document.querySelector(".menu li:last-of-type svg")

  // Carrousel
const prevButton = document.querySelector(".pagination button:first-of-type");
const nextButton = document.querySelector(".pagination button:nth-of-type(2)");
const carrousel = document.querySelector(".lessons .stories ul");
const storyWidth = document.querySelector(".story");

  // Form interaction
let forms = document.querySelectorAll("form.like-form");
const loader = document.querySelector(".loader-container");

  // Playlist settings
const openSettingsButton = document.querySelector(".playlist-head button");
const closeSettingsButton = document.querySelector("button.close-settings");
const settingsShown = document.querySelector(".playlist-settings-container");

// Code Logic 🖖//

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

// nav menu hamburger icon animation script

menuBtn.addEventListener("click", function() {
  menuBtn.classList.toggle("cross")
  menuNav.classList.toggle("show-menu")
})
