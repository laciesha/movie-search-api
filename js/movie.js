class Movie {
    constructor() {

    }

    toHTML(data) {
        //returns a Html representation of the json data
        const movieTemplate = `
      <img src=${data.Poster}>
      <h2>${data.Title}</h2>
      <p>Rated: ${data.Rated}</p>
      <p>Release Date: ${data.Released}</p>
      <p>${data.Year}</p>
      <p>${data.Plot}</p>

  `;
  return movieTemplate

    like () {
        //notifies the state manager that it would like to 
        //save the movie to the DB
    }

    saveComment () {
        //updates the comment after the user has added
        //some notes.
    }
}

