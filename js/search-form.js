import apiKey from "./key.js";
export default class SearchForm {
  constructor(stateManager) {
    this.stateManager = stateManager;
  }

  drawForm() {
    //the job of this method is to display a form to the HTML
    const formTemplate = `
    <h2>Search Movies</h2>
    <form>
    <div class="form-group">
    <label class="control-label" for="title">Title:</label>
    <input
      type="text"
      placeholder="Title of the movie"
      id="title"
      
    />
    <span id="title-error"></span>
    </div>  
   
    <div class="form-group">
      <label class="control-label" for="plot">Plot:</label>

      <select name="plot" id="plot" style="width: 100px">
        <option value="short" selected="">Short</option>
        <option value="full">Full</option>
      </select>
    </div>

    <div class="form-group">
      <label class="control-label" for="year">Year:</label>

      <input
        type="number"
        placeholder="Year"
        minlength="4"
        maxlength="4"
        id="year"
      />
      </div>
      <button id="go" type="submit">go</button>
      <button id="reset" type="reset">reset</button>
      <button id="show-favorites" type="Favorites">favorites</button>

    </form>`;
    document.querySelector(".form-container").innerHTML = formTemplate;
    document.querySelector("form").addEventListener("submit", this.search.bind(this));
    document.querySelector('#reset').addEventListener('click', this.clearScreen.bind(this));
    document.querySelector('#show-favorites').addEventListener('click', this.loadFavorites.bind(this));
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

  clearScreen(ev) {
    ev.preventDefault();
    document.querySelector('#title').value = "";
    //document.querySelector('#plot').value = "short";
    document.querySelector('#year').value = "";

    this.stateManager.notify('clear-everything');
  }


  loadFavorites(ev) {
    ev.preventDefault();
    this.stateManager.loadFavorites();
}
}