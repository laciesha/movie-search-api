/* 
The state manager's job is to:
(a) manage the application's data, 
(b) notify components when critical changes have happened, and 
(c) allow components to notify it that data has changed.
*/
import Database from "./database.js";
export default class StateManager {
  constructor() {
    // initialize the data store.
    // This is our state. When anything changes
    // with any of these variables, we need to
    // notify our components:

    this.movies = [];
    this.searchResults = [];
    this.favorites = [];
    this.subscribers = []; //so that compnents can listen for changes to the state
    this.searchMode = true;
    this.showNotes = false;
    this.data = [];
    this.database = new Database();
    this.loadFavorites();

    this.subscribe("like-requested", this.saveMovieToFavorites.bind(this));
    this.subscribe("movie-found", this.setSearchResults.bind(this));
    this.subscribe("favorites-loaded", this.setFavorites.bind(this));
    this.subscribe("show-notes", this.toggleNotes.bind(this));
  }

  setSearchResults(moveieDataList) {
    this.searchResults = moveieDataList;
    this.movies = this.searchResults;
  }

  setFavorites(moveieDataList) {
    this.favorites = moveieDataList;
    this.movies = this.favorites;
  }

  toggleNotes(val) {
    this.showNotes = val;
    this.notify("redraw", this.movies);
  }

  // A method to read a user's favorites from IndexedDB when the page first loads.

  loadFavorites() {
    //reads from IndexedDB

    const callbackFunction = function (movieDataList) {
      this.notify("favorites-loaded", movieDataList);
    };

    this.database.getAll(callbackFunction.bind(this));
  }

  // A method to add a new movie to the user's favorites and save it to IndexedDB.
  saveMovieToFavorites(movieData) {
    console.log("I am about to save the movie to the DB");
    console.log(movieData);
    this.database.addOrUpdate(movieData, function () {
      console.log("Successfully added to the database");
    });
  }

  // A method to notify components that something has changed.
  notify(eventName, data) {
    //loops through all of the subscribers
    //and invokes the subscriber's function if they're interested
    //in the particular event
    for (let i = 0; i < this.subscribers.length; i++) {
      const subscriber = this.subscribers[i];

      const subscriberEvent = subscriber[0];
      const callbackFunction = subscriber[1];

      //is the event tht waa just fired somthing that
      //the subscriver is interested in?
      if (eventName == subscriberEvent) {
        callbackFunction(data);
      }
    }
  }

  subscribe(eventName, callbackFunction) {
    //when a compnent wants to subscribe to the stateManager,
    //they need to tell the sm which event they're interested in,
    // and what should happen if that event is fired (callback function).
    this.subscribers.push([eventName, callbackFunction]);
  }
}

// //When using functions from other files import here
// import { addNote, addFavorite } from "./connection";

// import { apiKey } from "./key";

// /*
// The job of the state manager is to:
//     1. + organize the data.
//     2. update the data when a component notifies the state manager.
//     3. let other components know when the data has changed.
// Each comment has:
//     1. Name of the person
//     2. Email
//     3. Comment
//     4. Timestamp
// */

// export default class StateManager {
//   constructor() {}
//   //This function will  data to db
//   //This gets value from HTML adds to obj and adds note
//   //NoteElement gets input from the user
//   submitNote() {
//     let noteElement = document.getElementById("note").value;
//     let note = { note: noteElement };
//     addNote(note);
//   }

// //Needed to grab data from the url
//   submitFavorite(data) {
//     let title = data.Title
//     let plot = data.Plot
//     let year = data.Year
//     let favorite = { title: title, plot: plot, year: year,  api: apiKey };

//     addFavorite(favorite)

//   }
// }
