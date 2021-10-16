import React, { useState } from 'react';
import styled from 'styled-components';

import MovieItem from './MovieItem';
import './App.css';

const Container = styled.div`
  max-width: 600px;
  padding: 0px 20px; 
  box-sizing: border-box;
  margin: auto;
`;

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;

`;

const FormItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;

  label {
    margin-bottom: 10px;
  }

  input {
    height: 35px;
  }
`


/**
 * @param {String} id 
 * @param {String} title 
 * @param {String} imageUrl 
 * @param {String} comment 
 */
function Movie(id, title, imageUrl, comment) {
  this.id = id;
  this.title = title;
  this.imageUrl = imageUrl;
  this.comment = comment;
}

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
      new Movie(
        2,
        'http://d21lz9b0v8r1zn.cloudfront.net/wp-content/uploads//2012/03/detail.jpg',
        'New York blows up in this!'
      ),
      new Movie(
        'Dark City',
        'https://i.chzbgr.com/full/5569379584/hA96709E0/',
        'This looks mysterious. Cool!'
      ),
      new Movie(
        'Hot Tub Time Machine',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTG7vNmphIcVhEcybvSvMgbTkV6EE2twHBNanKvgDx3ZS7Ivn6Dtg',
        'Someone said this was fun. Maybe!'
      ),
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
    const { title, image, comment } = movie;

    components.push(
      <MovieItem
        title={title}
        imageUrl={image}
        comment={comment}
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

function getCachedMovies() {
  return [
    {
      id: '1',
      title: 'The Avengers',
      imageUrl: 'http://d21lz9b0v8r1zn.cloudfront.net/wp-content/uploads//2012/03/detail.jpg',
      comment: 'New York blows up in this!'
    },
    {
      id: '2',
      title: 'Dark City',
      imageUrl: 'https://i.chzbgr.com/full/5569379584/hA96709E0/',
      comment: 'This looks mysterious. Cool!'
    },
    {
      id: '3',
      title: 'Hot Tub Time Machine',
      imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTG7vNmphIcVhEcybvSvMgbTkV6EE2twHBNanKvgDx3ZS7Ivn6Dtg',
      comment: 'Someone said this was fun. Maybe!'
    },
  ];
}

function getCachedWatchedMoviesData() {
  return {};
}

function App(props) {
  const [movies, setMovies] = useState(getCachedMovies());
  const [watchedMoviesData, getWatchedMoviesData] = useState(
    getCachedWatchedMoviesData()
  );

  const [newMovieTitle, setNewMovieTitle] = useState('');
  const [newMovieImageUrl, setNewMovieImageUrl] = useState('');
  const [newMovieComment, setNewMovieComment] = useState('');

  return (
    <Container>
      <h1>Codest Movies!</h1>

      <FormContainer>
        <h1>Add movie!</h1>

        <FormItemContainer>
          <label>Movie Title</label>
          <input
            type="text"
            value={newMovieTitle}
            onChange={(e) => setNewMovieTitle(e.target.value)}
          />
        </FormItemContainer>

        <FormItemContainer>
          <label>Image Url</label>
          <input
            type="text"
            value={newMovieImageUrl}
            onChange={(e) => setNewMovieImageUrl(e.target.value)}
          />
        </FormItemContainer>

        <FormItemContainer>
          <label>Comment:</label>
          <input
            type="text"
            value={newMovieComment}
            onChange={(e) => setNewMovieComment(e.target.value)}
          />
        </FormItemContainer>

        <input type="button" onClick={() => { }} value="ADD MOVIE" />
      </FormContainer>



      <h1>My Movies:</h1>
      {movies.map(movie => {
        const { id, title, imageUrl, comment } = movie;

        return (
          <MovieItem
            key={id}
            title={title}
            imageUrl={imageUrl}
            comment={comment}
          />
        );
      })}
    </Container>
  );
}

export default App;
