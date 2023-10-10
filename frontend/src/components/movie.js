import React, { Fragment, useState } from 'react'
import InfoModal from './modal';
import { Container } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';

const Movie = () => {
    const location = useLocation();
    const [showModal, setShowModal] = useState(false);
    const [clickedMovie, setClickedMovie] = useState(null);

    const state = location.state; // Access the state object
    console.log('State received in Movie is :', state);
    const MovieContextDetails = state ? state.MovieContextDetails : null;
    const imageLink = "https://image.tmdb.org/t/p/w500";
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
    <div className="home">
        <Container fluid>
            <div className="row">
                {MovieContextDetails.map((movie) => {
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
  )
}

export default Movie