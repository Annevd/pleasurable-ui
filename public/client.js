// playlist carousel

const itemWidth = 220;
const nextPlaylist = document.querySelector(".playlist-next-btn");
const prevPlaylist = document.querySelector(".playlist-prev-btn");
const listPlaylist = document.querySelector(".playlist-container");

prevPlaylist.addEventListener("click", function () {
  console.log("click");
  listPlaylist.scrollLeft -= itemWidth;
});

nextPlaylist.addEventListener("click", function () {
  listPlaylist.scrollLeft += itemWidth;
});

// fav list carousel buttons

const favWidth = 250;
const nextFav = document.querySelector(".fav-next-btn");
const prevFav = document.querySelector(".fav-prev-btn");
const listFav = document.querySelector(".fav-playlists");

prevFav.addEventListener("click", function () {
  console.log("click");
  listFav.scrollLeft -= favWidth;
});

nextFav.addEventListener("click", function () {
  listFav.scrollLeft += favWidth;
});
