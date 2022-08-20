export default class Movie

class SearchForm {
    constructor()

}

drawForm () {
    //the job of this method is to display a form to the HTML
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
    </form>
}

search() {
    //the job of this method is to send the 
    //search to the cloud (OMDB)
}

displayResults() {
    //the job of this meethod is to display the movie
    // once the response comes back from
}