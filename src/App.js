import React from 'react';
import './App.css';

import { addWatchedMovie, add, removeWatchedMovie, getWatchedMovies, getAllMovies } from './index.js';

const getMoviesComponents = (movies) => {
  var components = [];

  movies.forEach(function (movie) {
    components.push(
      <div className="all">
        <div>
          <img src={movie.image} height="100px" />
        </div>
        <span>
          <a className="movie-watched" href="#" onClick={function () { addWatchedMovie(movie.title, movie.comment, movie.image) }}>
            {movie.title}
          </a>
        </span>
        <br />
        <span>
          {movie.comment}
        </span>
        <br />
        <br />
      </div>
    )
  })

  return components;
}

function getWatchedMoviesComponents(movies) {
  var components = [];

  movies.forEach(function (movie) {
    /* 
    Null check performed here before push becuase of how removeWatchedMovie was implemented.
    Pretty inconvinient to keep track of that design decision.
    */
    components.push(movie && (
      <div className="watched">
        <div>
          <img src={movie.image} height="100px" />
        </div>
        <span>
          <a className="movie-watched" href="#" onClick={function () { removeWatchedMovie(movie.title) }}>
            {movie.title}
          </a>
        </span>
        <br />
        <span>
          {movie.comment}
        </span>
        <br />
        <br />
      </div>
    ))
  })

  return components;
}

/* 
The App component receives props but does not use them since it uses the functions imported from
index.js to get the movie entries and the watched movie entries. Because of the way this component currenlty
works it will be very difficult to test in the future. Also it may be better to either move the logic 
of adding and removing movies out of the App component and make it purely presentational or keep all
logic related to managing movie ntries into APP. 
*/
function App(props) {
  return (
    <div className="App">
      <h1>Codest Movies!</h1>
      <h1>Add movie!</h1>
      <b>TITLE:<br /><input type="text" onChange={function (e) { title = e.target.value; }} /></b><br />
      <b>IMAGE URL:<br /><input type="text" onChange={function (e) { image = e.target.value; }} /></b><br />
      <b>COMMENT:<br /><input type="text" onChange={function (e) { comment = e.target.value; }} /></b><br />
      <input type="button" onClick={function (e) { add(title, image, comment); }} value="ADD MOVIE" />

      <h1>Watchlist:</h1>
      {/* Would be better to just track movies in local state instead of reading them from local storage all the time */}
      {getMoviesComponents(getAllMovies())}

      {/* Its a bit clumsy to have two separate lists to track what was watched or not. You will end up with a very long page
      of duplicate entries. Maybe find a different way to display when a movie was watched without creating a separate list */}
      <h1>Already watched:</h1>
      {getWatchedMoviesComponents(getWatchedMovies())}
    </div>
  );
}

/*
Hard to understand what these variables do when they have pretty generic names and are placed
somewhat out of context in the page. 
*/
var title = '';
var image = '';
var comment = '';

export default App;
