import React, { Fragment, useState } from "react";
import { useLocation } from 'react-router-dom';
import InfoModal from './modal';
import '../style/searchList.css';
import { Container } from "react-bootstrap";

export default function SearchList() {
    const location = useLocation();
    const state = location.state; // Access the state object
    const [showModal, setShowModal] = useState(false);
    const [clickedMovie, setClickedMovie] = useState(null);
    const queryParams = new URLSearchParams(location.search);
    const searchParams = queryParams.get('q');

    const imageLink = "https://image.tmdb.org/t/p/w500";

    console.log('State received in SearchList:', state);
    console.log("Search params is ", searchParams);
    const MovieContextDetails = state ? state.MovieContextDetails : null;
    const searchParamsArray = searchParams.split(" ");
    // Filter and remove duplicate movies
    const filteredAndUniqueMovies = MovieContextDetails
    ? MovieContextDetails.filter((movie) =>
        searchParamsArray.some((term) =>
          movie.title.toLowerCase().includes(term.toLowerCase())
        )
    ).filter((movie, index, self) =>
        index === self.findIndex((m) => m.id === movie.id)
    )
    : [];

    const openModal = (movie) => {
        try {
            console.log("Opening modal for movie:", movie);
            setClickedMovie(movie);
            setShowModal(true);
            console.log("movie status ", showModal);
        }
        catch (error) {
            console.log("Error is ", error);
        }
    };

    const closeModal = () => {
        setShowModal(false);
    };

    return (
        <Fragment>
            <div className="homeSearchList">
                <Container fluid>
                    <div className="row">
                        {filteredAndUniqueMovies.map((movie) => {
                            return (
                                <div key={movie.id} id="carouselDiv" className="col" onClick={() => openModal(movie)}>
                                    <img src={imageLink + movie.poster_path} alt={movie.title} width="300px" height="200px" />
                                </div>
                            );
                        })}
                    </div>
                </Container>
            </div>

            { showModal && <InfoModal isOpen={showModal} toggle={closeModal} movieInfo={clickedMovie} searchMovieDetails={MovieContextDetails} searchStatus={true}/> }
        </Fragment>
    );
}
