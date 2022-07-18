import "./style.css";
import { apiKey } from "./key.js";

document.querySelector("#app").innerHTML = `
  <h1>Movie Lookup Site</h1>
  <a href="https://vitejs.dev/guide/features.html" target="_blank">Documentation</a>
`;
const search = (ev) => {
  ev.preventDefault();
  const title = document.querySelector("#title").value;
  const year = document.querySelector("#year").value;
  const plot = document.querySelector("#plot").value;
  const url = `https://www.omdbapi.com/?t=${title}&y=${year}&plot=${plot}=full&apikey=${apiKey}`;

  console.log(url);
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      const parent = document.querySelector("#movie-details");
      while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
      }
     
      const movieTemplate = `
    
 
 
 
  <h2>${data.Title}</h2>
  <p>${data.Year}</p>
  <img src="${data.Poster}" alt= "poster image"/>
  <p>${data.Plot}</p>
  
  `;
      //Target information  or Movie  Details by adding to the DOM
      document
        .querySelector("#movie-details")
        .insertAdjacentHTML("beforeend", movieTemplate);
      

      console.log(data.Title);
      console.log(data.Poster);
    });
};

document.querySelector("form").addEventListener("submit", search);
