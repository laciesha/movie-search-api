import Movie from './movie.js';

export default class MovieList {

    constructor(stateManager) {
        this.stateManager = stateManager;
        this.stateManager.subscribe('movie-found', this.drawMoviesToScreen.bind(this));
    }

    //this function should fire:
    // *when the server give back a movie result after they've clicked
    drawMoviesToScreen(moveieDataList){
        console.log(moveieDataList);
        //the job of this method is to draw all ot the 
        //movies to the screen
        for (let i = 0; i<moveieDataList.length; i++){
            
            //create movie screen
            const movie = new Movie(this.stateManager, moveieDataList[i]);
                
            const parentElement = document.querySelector(".movies");
            movie.attachMovieToDOM(parentElement);

             
        //     //get html representation from the movie data:
        //     const html = movie.toHTML(moveieDataList[i]);


        //     //insert html representing a single movie into the DOM:
        //     document.querySelector(".movies").insertAdjacentHTML('beforeend', html);
         }
    }
}