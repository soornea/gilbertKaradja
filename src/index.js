import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';


export function getWatchedMovies() {
	var movies = localStorage.getItem('movies-watched');

	if (!movies) {
		return [];
	} else {
		return JSON.parse(movies);
	}
}

export function getAllMovies() {
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

/*
There is no validation logic for adding movies. Should probably have that (at least to validate
movie title). Also there is no way to remove a movie.
*/
export function add(title, description, image) {
	var movie = {};
	movie.title = title;
	movie.description = description;
	movie.image = image;

	var movies = getAllMovies();
	movies.push(movie);

	localStorage.setItem('movies-all', JSON.stringify(movies));

	render();
}

/* 
Because add watched does not do any sort of comparison check its possible to have
several entries in watched for just one movie.
*/
export function addWatchedMovie(title, description, image) {
	var movie = {};
	movie.title = title;
	movie.description = description;
	movie.image = image;

	var movies = getWatchedMovies();
	movies.push(movie);

	localStorage.setItem('movies-watched', JSON.stringify(movies));

	render();
}

/*
Removing movies by using the title means you can't have movies with the same name, as that
will lead to removing several entries erronously. 
*/ 
export function removeWatchedMovie(title) {
	var movies = getWatchedMovies();

	/* 
	Would be better to filter out titles and create a new array instead of assigning
	'null' to entries. This means you will have to perform a null check down the line
	everywhere you use this array. Not that obvious and not ideal.
	*/
	for (var i = 0; i < movies.length; i++) {
	   if (!movies[i]) continue;
		if (movies[i].title == title) {
			movies[i] = null
		}
	}

	localStorage.setItem('movies-watched', JSON.stringify(movies));

	render();
}

/* 
Ideally you would call ReactDOM.render once to mount your application in a container and allow component
state updates to trigger subsequent re-renders. Currently you have to call the "render" method everywhere
a "state" update is likely to occur in your application. This is not scalable, especially if you want to
implement something more elaborate in the future.
*/
function render() {
	// App component does not use any of the props passed
	ReactDOM.render(<App movies={getAllMovies()} watched={getWatchedMovies()} />, document.getElementById('root'))
}

render();
