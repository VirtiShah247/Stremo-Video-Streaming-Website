import React, { Fragment, useEffect, useState, createContext } from 'react';
import axios from 'axios';
import AllMovieDetails from './allMovieDetails';
import Browse from './browse';
const MovieContext = createContext();
const MovieList = () => {
  const apiKey = '1da960a4b9d3fbafd769d3b4fb755c12';
  const maxPageCount = 3;
  const [movies, setMovies] = useState([]);
  const [allMovieDetails, setAllMovieDetails] = useState([]);
  const [moviesByGenre, setMoviesByGenre] = useState({});
  const [count, setCount] = useState(0);

  // Function to fetch movie details and update state
  // const fetchMovieDetails = async (movieId) => {
  //   try {
  //     const response = await axios.get(
  //       `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}`
  //     );
  //     const movieDetails = response.data;
  //     setAllMovieDetails([...allMovieDetails, movieDetails]);
  //   } catch (error) {
  //     console.error('Error fetching movie details:', error);
  //   }
  // };
  const fetchMovieDetails = (movieId, movieDetails) => {
    // Update the movieData array with the new movie details
    // console.log("movie details ", movieDetails);
    // setCount(count++);
    // console.log("count is ", count)


    setAllMovieDetails((prevMovieData) => [...prevMovieData, movieDetails]);

    movieDetails.genres.forEach((genre) => {
      setMoviesByGenre((prevMoviesByGenre) => {
        // Create a Set to ensure unique movies in the genre
        const uniqueMovies = new Set([...(prevMoviesByGenre[genre] || [])]);
    
        // Check if the movieDetails is not already in the genre
        if (!uniqueMovies.has(movieDetails)) {
          uniqueMovies.add(movieDetails);
        }
    
        // Convert the Set back to an array
        const updatedMovies = [...uniqueMovies];
    
        return {
          ...prevMoviesByGenre,
          [genre]: updatedMovies,
        };
      });
    });
  console.log("moviesByGenre is ", moviesByGenre)

  };


  useEffect(() => {
    const fetchMovies = async () => {
      const movieData = [];

      // Create an array of page numbers from 1 to maxPageCount
      const pageNumbers = Array.from({ length: maxPageCount }, (_, i) => i + 1);

      // Use Promise.all to fetch data for multiple pages concurrently
      await Promise.all(
        pageNumbers.map(async (page) => {
          try {
            const response = await axios.get(
              `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_watch_providers=8&language=en-US&page=${page}`
            );
            movieData.push(...response.data.results);
          } catch (error) {
            console.error(error);
          }
        })
      );

      // Update the state with the combined movie data
      // Convert the array to a Set to remove duplicates.
      const uniqueMovieData = new Set(movieData);

      // Convert the Set back to an array.
      const deDupedMovieData = Array.from(uniqueMovieData);
      console.log("deDupedMovieData is ",deDupedMovieData);
      setMovies(deDupedMovieData);
    };

    fetchMovies();
  }, []);

  return (
    <Fragment>
      <MovieContext.Provider value={allMovieDetails}>
        <div className='home'>
          {
            console.log("All ", allMovieDetails)
          }
         
          {movies.map((movie) =>
            <AllMovieDetails movie={movie} fetchMovieDetails={fetchMovieDetails} />
          )}
        </div>
        <div>
          <Browse moviesGenres={moviesByGenre} />
        </div>

      </MovieContext.Provider>
    </Fragment>
  );
};

export default MovieList;
export { MovieContext }