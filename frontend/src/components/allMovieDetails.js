import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AllMovieDetails = ({ movie, fetchMovieDetails }) => {
  const apiKey = '1da960a4b9d3fbafd769d3b4fb755c12';

  const [movieDetails, setMovieDetails] = useState({});
  const [posterImage, setPosterImage] = useState('');
  const [videoUrl, setVideoUrl] = useState();
  const [credits, setCredits] = useState({});
  const [genresList, setGenresList] = useState([]);
  const [recommendedMovieIds, setRecommendedMovieIds] = useState([]);

  const fetchVideoUrl = async (movieId) => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${apiKey}`
      );

      const trailer = response.data.results.find((video) => video.type === 'Trailer');
      return trailer ? `https://www.youtube.com/watch?v=${trailer.key}` : '';
    } catch (error) {
      console.error(error);
    }
  }

  // Fetch movie details
  useEffect(() => {
    axios
      .get(`https://api.themoviedb.org/3/movie/${movie.id}?api_key=${apiKey}`)
      .then((response) => {
        setMovieDetails(response.data);
        setPosterImage(`https://image.tmdb.org/t/p/w300${response.data.poster_path}`);

      })
      .catch((error) => {
        console.error('Error fetching movie details:', error);
      });
  }, [movie.id, apiKey]);
  console.log(posterImage)
  // Fetch movie credits
  useEffect(() => {
    axios.get(`https://api.themoviedb.org/3/movie/${movie.id}/credits?api_key=${apiKey}`)
      .then((response) => {
        setCredits(response.data);
      })
      .catch((error) => {
        console.error('Error fetching movie credits:', error);
      });
  }, [movie.id, apiKey]);

  // Fetch movie genres
  useEffect(() => {
    axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}`)
      .then((response) => {
        setGenresList(response.data.genres);
      })
      .catch((error) => {
        console.error('Error fetching movie genres:', error);
      });
  }, [apiKey]);

  // Fetch recommended movies
  useEffect(() => {
    axios.get(`https://api.themoviedb.org/3/movie/${movie.id}/recommendations?api_key=${apiKey}`)
      .then((response) => {
        const recommendedIds = response.data.results.map((movie) => movie.id);
        setRecommendedMovieIds(recommendedIds);
      })
      .catch((error) => {
        console.error('Error fetching recommended movie IDs:', error);
      });
  }, [movie.id, apiKey]);

  // Fetch movies youtube video link
  useEffect(() => {
    fetchVideoUrl(movie.id)
      .then((data) => {
        setVideoUrl(data)
      })
      .catch((error) => {
        console.error(error);
      })
  }, [movie.id, apiKey]);
  // Add movie data to the array when movieDetails and credits are available
  useEffect(() => {
    if (movieDetails && Object.keys(movieDetails).length > 0 && credits && Object.keys(credits).length > 0) {
      const movieData = {
        ...movieDetails,
        genres: movieDetails.genres?.map((genreId) =>
          genresList.find((genre) => genre.id === genreId.id)?.name
        ),
        director: credits.crew?.find((person) => person.job === 'Director')?.name,
        writer: credits.crew?.find((person) => person.department === 'Writing')?.name,
        cast: credits.cast?.map((person) => person.name),
        recommendedIds: recommendedMovieIds,
        video: videoUrl,
      };
      console.log("movieData.video is ", movieData.video);
      
      fetchMovieDetails(movie.id, movieData);
    }
  }, [movieDetails, credits, genresList]);

  return (
    <>

    </>
  );
};

export default AllMovieDetails;