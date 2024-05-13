/*** Express setup & start ***/

// 1. Opzetten van de webserver

// Importeer de zelfgemaakte functie fetchJson uit de ./helpers map
import fetchJson from "./helpers/fetch-json.js";

// Importeer het npm pakket express uit de node_modules map
import express from "express";

// Stel het basis endpoint in
const apiUrl = "https://fdnd-agency.directus.app/items";

// Maak een nieuwe express app aan
const app = express();

// Stel ejs in als template engine
// View engine zorgt ervoor dat data die je ophaalt uit de api , waar je in je code dingen mee doet, daar html van maakt
app.set("view engine", "ejs");

// Stel de map met ejs templates in
app.set("views", "./views");

// Gebruik de map 'public' voor statische resources, zoals stylesheets, afbeeldingen en client-side JavaScript
app.use(express.static("public"));

// Zorg dat werken met request data makkelijker wordt
app.use(express.urlencoded({ extended: true }));

/*** Routes & data ***/

// 2. Routes die HTTP Request and Responses afhandelen

// Maak een GET route voor de index

app.get("/", function (request, response) {
    response.render("index");
  });

  // Maak een GET route voor de testing pagina

app.get("/testing", function (request, response) {
    response.render("testing");
  });

  // Maak een GET route voor de lessons pagina

app.get("/lessons", function (request, response) {
    Promise.all([
      // Fetch data from all endpoints concurrently using Promise.all()
      fetchJson(apiUrl + "/tm_story"),
      fetchJson(apiUrl + "/tm_language"),
      fetchJson(apiUrl + "/tm_playlist"),
      fetchJson(apiUrl + "/tm_audio"),
      fetchJson(apiUrl + "/tm_likes"),
    ]).then(([storyData, languageData, playlistData, audioData, likeData]) => {
      // After all promises are resolved, this function will be executed with the fetched data
      // Maak een lijst met alle liked playlists op basis van de tm_likes tabel
      let likeList = playlistData.data.filter((playlist) => {
        return likeData.data.find((like) => like.playlist === playlist.id);
      });
      // Voeg het id uit de tm_likes tabel toe aan de lijst met liked playlists, nodig voor delete
      likeList.map((playlist) => {
        playlist.likeId = likeData.data.find(
          (like) => like.playlist === playlist.id
        ).id;
        return playlist;
      });
  
      // Render the 'index.ejs' template and pass all fetched data to the view
      response.render("lessons", {
        favorites: favorites,
        stories: storyData.data,
        languages: languageData.data,
        playlists: playlistData.data,
        likeList: likeList,
        audio: audioData.data,
        justUpdated: request.query.justUpdated,
        whatHappened: request.query.whatHappened,
      });
    });
  });

//   Hier komt de post van lessons

  // Maak een GET route voor de stories pagina

app.get("/lessons/stories", function (request, response) {
    Promise.all([
      fetchJson(apiUrl + "/tm_story"),
      fetchJson(apiUrl + "/tm_language"),
      fetchJson(apiUrl + "/tm_playlist"),
      fetchJson(apiUrl + "/tm_audio"),
    ]).then(([storyData, languageData, playlistData, audioData]) => {
      response.render("stories", {
        stories: storyData.data,
        languages: languageData.data,
        playlists: playlistData.data,
        audio: audioData.data,
      });
    });
  });

  // Maak een GET route voor de playlist pagina

app.get("/lessons/playlist/:slug", function (request, response) {
    Promise.all([
      fetchJson(apiUrl + "/tm_story"),
      fetchJson(apiUrl + "/tm_language"),
      fetchJson(
        apiUrl + '/tm_playlist/?filter={"slug":"' + request.params.slug + '"}'
      ),
      fetchJson(apiUrl + "/tm_audio"),
    ]).then(([storyData, languageData, playlistData, audioData]) => {
      response.render("playlist-detail", {
        stories: storyData.data,
        languages: languageData.data,
        playlists: playlistData.data,
        audio: audioData.data,
      });
    });
  });
  
  // Maak een GET route voor de statistics pagina
  
  app.get("/statistics", function (request, response) {
    response.render("statistics");
  });
  
  // Maak een GET route voor de profile pagina
  
  app.get("/profile", function (request, response) {
    response.render("profile");
  });
  
  // 3. Start de webserver
  
  // Stel het poortnummer in waar express op moet gaan luisteren
  app.set("port", process.env.PORT || 8000);
  
  // Start express op, haal daarbij het zojuist ingestelde poortnummer op
  app.listen(app.get("port"), function () {
    // Toon een bericht in de console en geef het poortnummer door
    console.log(`Application started on http://localhost:${app.get("port")}`);
  });
  