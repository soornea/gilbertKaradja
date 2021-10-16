import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import MovieItem from './MovieItem';
import './App.css';

const MOVIES_CACHE_KEY = 'movies-all';
const WATCHED_MOVIES_CACHE_KEY = 'movies-watched';

const Container = styled.div`
  max-width: 600px;
  padding: 0px 20px; 
  box-sizing: border-box;
  margin: auto;
`;

const HeaderContainer = styled.div`
  border-bottom: 2px solid black;
  margin-bottom: 20px;
`;


const FormContainer = styled.form`
  max-width: 350px;
  display: flex;
  flex-direction: column;
  margin-bottom: 50px;

  input[type=button] {
    background-color: black;
    color: white;
    height: 40px;
    border-radius: 3px;
    cursor: pointer;
  }
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
    padding: 0px 10px;
  }
`;

const FormErrorMessage = styled.span`
  font-size: 14px;
  color: red;
  margin-top: 5px;
`;


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


function getCachedMovies() {
  const movies = localStorage.getItem(MOVIES_CACHE_KEY);

  if (movies) {
    return JSON.parse(movies);
  }

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
  const watchedMoviesData = localStorage.getItem(WATCHED_MOVIES_CACHE_KEY);

  if (watchedMoviesData) {
    return JSON.parse(watchedMoviesData);
  }

  return {};
}

function generateMovieId() {
  return `${Date.now()}`;
}

function App(props) {
  const [movies, setMovies] = useState(getCachedMovies());
  const [watchedMoviesData, setWatchedMoviesData] = useState(
    getCachedWatchedMoviesData()
  );

  const [newMovieTitle, setNewMovieTitle] = useState('');
  const [newMovieImageUrl, setNewMovieImageUrl] = useState('');
  const [newMovieComment, setNewMovieComment] = useState('');

  const [showFormErrors, setShowFormErrors] = useState(false);

  const addNewMovieHandler = () => {
    setShowFormErrors(true);

    // Make title and image url required
    if (!newMovieTitle || !newMovieImageUrl) return;

    const movieId = generateMovieId();

    const newMovie = new Movie(
      movieId, newMovieTitle, newMovieImageUrl, newMovieComment
    );

    const newMovies = [newMovie, ...movies];

    setMovies(newMovies);

    // reset form content and errors after creating an entry
    setNewMovieTitle('');
    setNewMovieImageUrl('');
    setNewMovieComment('');

    setShowFormErrors(false);
  };

  const deleteMovieHandler = (movieId) => {
    const newMovies = movies.filter(movie => movie.id != movieId);
    setMovies(newMovies);
  }

  const getIsMovieWatched = (movieId) => {
    return !!watchedMoviesData[movieId];
  };

  const toggleMovieWatched = (movieId) => {
    const isMovieWatched = getIsMovieWatched(movieId);

    const newWatchedMoviesData = Object.assign({}, watchedMoviesData);

    // if movie is currenly watched delete its id key in the watched movies data
    // otherwise add the movie id as key instead
    if (isMovieWatched) {
      delete newWatchedMoviesData[movieId];
    } else {
      newWatchedMoviesData[movieId] = true;
    }

    setWatchedMoviesData(newWatchedMoviesData);
  };

  // Cache movie entries in local storage whenever the movies list changes
  useEffect(() => {
    localStorage.setItem(
      MOVIES_CACHE_KEY,
      JSON.stringify(movies),
    );
  }, [movies]);

  // Cache movie watched data entries in local storage whenever 
  // the movies watched data changes
  useEffect(() => {
    localStorage.setItem(
      WATCHED_MOVIES_CACHE_KEY,
      JSON.stringify(watchedMoviesData),
    );
  }, [watchedMoviesData]);

  return (
    <Container>
      <HeaderContainer>
        <h1>Codest Movies!</h1>
      </HeaderContainer>

      <FormContainer>
        <h2>Add movie!</h2>

        <FormItemContainer>
          <label>Movie Title</label>
          <input
            type="text"
            value={newMovieTitle}
            onChange={(e) => setNewMovieTitle(e.target.value)}
          />
          {showFormErrors && !newMovieTitle && (
            <FormErrorMessage>Movie Title is required</FormErrorMessage>
          )}

        </FormItemContainer>

        <FormItemContainer>
          <label>Image URL</label>
          <input
            type="text"
            value={newMovieImageUrl}
            onChange={(e) => setNewMovieImageUrl(e.target.value)}
          />
          {showFormErrors && !newMovieImageUrl && (
            <FormErrorMessage>Movie Image URL is required</FormErrorMessage>
          )}
        </FormItemContainer>

        <FormItemContainer>
          <label>Comment (Optional)</label>
          <input
            type="text"
            value={newMovieComment}
            onChange={(e) => setNewMovieComment(e.target.value)}
          />
        </FormItemContainer>

        <input type="button" onClick={addNewMovieHandler} value="ADD MOVIE" />
      </FormContainer>

      <h2>My Movies:</h2>

      {movies.map(movie => {
        const { id, title, imageUrl, comment } = movie;

        return (
          <MovieItem
            key={id}
            title={title}
            imageUrl={imageUrl}
            comment={comment}
            isAlreadyWatched={getIsMovieWatched(id)}
            deleteHandler={() => deleteMovieHandler(id)}
            toggleWatchedHandler={() => toggleMovieWatched(id)}
          />
        );
      })}

      {movies.length === 0 && (
        <p>Nothing here yet. Go ahead and add a movie!</p>
      )}
    </Container>
  );
}

export default App;
