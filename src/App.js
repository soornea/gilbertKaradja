import React, { useState } from 'react';
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

function generateMovieId() {
  return `${Date.now()}`;
}

function App(props) {
  const [movies, setMovies] = useState(getCachedMovies());
  const [watchedMoviesData, getWatchedMoviesData] = useState(
    getCachedWatchedMoviesData()
  );

  const [newMovieTitle, setNewMovieTitle] = useState('');
  const [newMovieImageUrl, setNewMovieImageUrl] = useState('');
  const [newMovieComment, setNewMovieComment] = useState('');

  const addNewMovieHandler = () => {
    if(!newMovieTitle || !newMovieImageUrl) return;

    const movieId = generateMovieId();

    const newMovie = new Movie(
      movieId, newMovieTitle, newMovieImageUrl, newMovieComment
    );

    const newMovies = [newMovie, ...movies];

    setMovies(newMovies);

    setNewMovieTitle('');
    setNewMovieImageUrl('');
    setNewMovieComment('');
  };

  const deleteMovieHandler = (movieId) => {
    const newMovies = movies.filter(movie => movie.id != movieId);
    setMovies(newMovies);
  }


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
            deleteHandler={() => deleteMovieHandler(id)}
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
