import React from 'react';
import MovieItem from './MovieItem';
import './App.css';

export function getWatchedMovies() {
  var movies = localStorage.getItem('movies-watched');

  if (!movies) {
    return [];
  } else {
    return JSON.parse(movies);
  }
}

function getAllMovies() {
  var movies = localStorage.getItem('movies-all');

  if (!movies) {
    return [
      {
        title: 'The Avengers',
        image: 'http://d21lz9b0v8r1zn.cloudfront.net/wp-content/uploads//2012/03/detail.jpg',
        comment: 'New York blows up in this!'
      },
      {
        title: 'Dark City',
        image: 'https://i.chzbgr.com/full/5569379584/hA96709E0/',
        comment: 'This looks mysterious. Cool!'
      },
      {
        title: 'Hot Tub Time Machine',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTG7vNmphIcVhEcybvSvMgbTkV6EE2twHBNanKvgDx3ZS7Ivn6Dtg',
        comment: 'Someone said this was fun. Maybe!'
      },
    ];
  } else {
    return JSON.parse(movies);
  }
}

function add(title, description, image) {
  var movie = {};
  movie.title = title;
  movie.description = description;
  movie.image = image;

  var movies = getAllMovies();
  movies.push(movie);

  localStorage.setItem('movies-all', JSON.stringify(movies));
}

function addWatchedMovie(title, description, image) {
  var movie = {};
  movie.title = title;
  movie.description = description;
  movie.image = image;

  var movies = getWatchedMovies();
  movies.push(movie);

  localStorage.setItem('movies-watched', JSON.stringify(movies));
}

function removeWatchedMovie(title) {
  var movies = getWatchedMovies();

  for (var i = 0; i < movies.length; i++) {
    if (!movies[i]) continue;
    if (movies[i].title == title) {
      movies[i] = null
    }
  }

  localStorage.setItem('movies-watched', JSON.stringify(movies));
}

const getMoviesComponents = (movies) => {
  var components = [];

  movies.forEach(function (movie) {
    const {title, image, comment} = movie;

    components.push(
      <MovieItem
        title={ title}
        imageUrl={ image}
        comment={ comment}
        isAlreadyWatched={false}
      />
    )
  })

  return components;
}

function getWatchedMoviesComponents(movies) {
  var components = [];

  movies.forEach(function (movie) {
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

function App(props) {
  return (
    <div className="App">
      <h1>Codest Movies!</h1>
      <h1>Add movie!</h1>
      <b>TITLE:<br /><input type="text" onChange={function (e) { title = e.target.value; }} /></b><br />
      <b>IMAGE URL:<br /><input type="text" onChange={function (e) { image = e.target.value; }} /></b><br />
      <b>COMMENT:<br /><input type="text" onChange={function (e) { comment = e.target.value; }} /></b><br />
      <input type="button" onClick={function (e) { add(title, image, comment); }} value="ADD MOVIE" />

      <h1>My Movies:</h1>
      {/* Would be better to just track movies in local state instead of reading them from local storage all the time */}
      {getMoviesComponents(getAllMovies())}
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
