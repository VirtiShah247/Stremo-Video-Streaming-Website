import { Fragment, useContext, useEffect, useState } from "react";
import NetflixNavbar from "./navbar";
import Banner from './banner';
import Sliders from './slider';
import Footer from './footer';
import { MovieContext } from "./movieList";
import '../style/browse.css'
import axios from "axios";

export default function Browse({ moviesGenres }) {
    const allMovieDetails = useContext(MovieContext);
    const [continueWatchingMovies, setContinueWatchingMovies] = useState([]);
    const [continueMovieDetails, setContinueMovieDetails] = useState(null);
    useEffect(() => {
        fetchContinueWatchingMovies();
    }, []);

    const fetchContinueWatchingMovies = async () => {
        try {
            const userId = JSON.parse(localStorage.getItem("Userdetail"))._id
            const res = await axios.post('/api/v1/user/continueWatchingMovies', { userId: userId });
            console.log("res.data.continueMovies in browse is ", res.data.continueMovies)
            setContinueWatchingMovies(res.data.continueMovies);

        } catch (err) {
            console.log("Browser error is ", err)
        }
    }


    useEffect(() => {
        console.log("Movie context details in browse is ", allMovieDetails);
        console.log("continueWatchingMovies in browse is ", continueWatchingMovies)
        const filteredMovies = allMovieDetails.filter((movies) => {
            return continueWatchingMovies.find((continueMovie) => {
                return movies.id === parseInt(continueMovie.videoId.substring("trackId-".length));
            });
        })
        .map((movie) => {
            const matchingMovie = continueWatchingMovies.find(
                (continueMovie) => parseInt(continueMovie.videoId.substring("trackId-".length)) === movie.id
            );
            console.log("matchingMovie is ", matchingMovie)
            // Merge fields from both objects, giving preference to MovieContextDetails fields
            return {
                ...movie, ...matchingMovie
            };
        });
        console.log("filteredMovies is ", filteredMovies)
        setContinueMovieDetails(filteredMovies);
    }, [allMovieDetails,continueWatchingMovies]);

    return (
        <Fragment>
            <div className="home">
                <div><NetflixNavbar /></div>
                <div><Banner /></div>

                {
                    continueMovieDetails && <div id='slider'>
                        <h5 className="ms-4">Continue Watching</h5>
                        <Sliders movie={continueMovieDetails} />
                    </div>
                }



                {
                    Object.keys(moviesGenres).map((genre) => (
                        <div key={genre} id="slider">
                            <h5 className="ms-4">{genre}</h5>
                            <Sliders movie={moviesGenres[genre]} />
                        </div>
                    ))
                }

                <div><Footer /></div>
            </div>
        </Fragment>
    );
}