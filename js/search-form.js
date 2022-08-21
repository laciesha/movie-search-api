import apiKey from "./key.js";
export default class SearchForm {
  constructor(stateManager) {
    this.stateManager = stateManager;
  }

  drawForm() {
    //the job of this method is to display a form to the HTML
    const formTemplate = `
    <form>
      <label class="control-label" for="title">Title:</label>

      <input
        type="text"
        placeholder="Title of the movie"
        id="title"
        
      />
      <span id="title-error"></span>
      <br />

      <label class="control-label" for="plot">Plot:</label>

      <select name="plot" id="plot" style="width: 100px">
        <option value="short" selected="">Short</option>
        <option value="full">Full</option>
      </select>
      <label class="control-label" for="year">Year:</label>

      <input
        type="number"
        placeholder="Year"
        minlength="4"
        maxlength="4"
        id="year"
      /><br />
      <button id="go" type="submit">go</button>
    </form>`;
    document.querySelector(".form-container").innerHTML = formTemplate;
    document.querySelector("form").addEventListener("submit", this.search.bind(this));
  }

  search(ev) {
    //the job of this method is to send the
    //search to the cloud (OMDB)
    ev.preventDefault();
    console.log("go!");
    const title = document.querySelector("#title");
    const year = document.querySelector("#year");
    const plot = document.querySelector("#plot");
    const button = document.querySelector("#go");
    if (title.value === "") {
      document.querySelector("#title-error").textContent = "title is required";
      return;
    }

    const url = `https://www.omdbapi.com/?t=${title.value}&y=${year.value}&plot=${plot.value}&apikey=${apiKey}`;
    title.disabled = true;
    year.disabled = true;
    plot.disabled = true;
    button.disabled = true;
    
    console.log(url);
    fetch(url)
      .then((response) => response.json())
      .then(((data) => {
        console.log(data);
        
        this.stateManager.notify('movie-found', [data]);
      }).bind(this));
      
  }

  displayResults() {
    //the job of this meethod is to display the movie
    // once the response comes back from
  }
}
