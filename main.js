import "./style.css";
import { apiKey } from "./key.js";
//import "./js/connection";
//import stateManager from './js/state-manager

let favoriteArray = [];
document.querySelector("#app").innerHTML = `
  <h1>Movie Lookup Site</h1>
  <a href="https://vitejs.dev/guide/features.html" target="_blank">Documentation</a>
`;
const search = (ev) => {
  ev.preventDefault();
  document.querySelector("#title-error").textContent=''
  const title = document.querySelector("#title");
  const year = document.querySelector("#year");
  const plot = document.querySelector("#plot");
  const button = document.querySelector("#go");
  if(title.value===""){
    document.querySelector("#title-error").textContent='title is required'
    return
  }
  const url = `https://www.omdbapi.com/?t=${title.value}&y=${year.value}&plot=${plot.value}&apikey=${apiKey}`;
title.disabled = true
year.disabled = true
plot.disabled = true
button.disabled = true
  
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      const parent = document.querySelector("#movie-details");
      while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
      }
     
      const movieTemplate = `
      <img src=${data.Poster}>
      <h2>${data.Title}</h2>
      <p>Rated: ${data.Rated}</p>
      <p>Release Date: ${data.Released}</p>
      <p>${data.Year}</p>
      <p>${data.Plot}</p>

  `;
      //Target information  or Movie  Details by adding to the DOM
      document
        .querySelector("#movie-details")
        .insertAdjacentHTML("beforeend", movieTemplate);
        title.disabled = false
        year.disabled = false
        plot.disabled = false
        button.disabled = false
    });
};
//
document.querySelector("form").addEventListener("submit", search);



// btnFavorite.Title = movieData.Title;
// btnFavorite.Year = movieData.Year;
// btnFavorite.Plot = movieData.Plot;
// btnFavorite.src = movieData.Poster;
// btnNote.addEventListener('click', (event) =>{
//   stateManager.addEventListener.bind(document.getElementById("id-addTooNote").value)
// })




// openRequest.onsuccess =function(e) {
//   console.log('running onsuccess');
//   db = e.target.result;
// }