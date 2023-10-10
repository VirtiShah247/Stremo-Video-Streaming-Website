import { useContext, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Modal, Button, Container } from 'react-bootstrap';
import { FaPlay } from 'react-icons/fa';
import ModalCard from './modalCard';
import { MovieContext } from "./movieList";
import axios from "axios";
import '../style/modal.css';

const InfoModal = ({ isOpen, toggle, movieInfo, searchMovieDetails, searchStatus }) => {
    const MovieContextDetails = useContext(MovieContext);
    const movieDetails = searchStatus?searchMovieDetails:MovieContextDetails;
    const targetDivRef = useRef(null);
    console.log("Movie info ", movieInfo);
    console.log("isopen ", isOpen);
    try {
        const { id, title, overview, release_date, runtime, director, writer, cast, genres, poster_path, recommendedIds, tagline, video } = movieInfo;
        const movieUrl = "trackId-" + id;
        console.log("videos is ", video);
        console.log("movieUrl is ", movieUrl);
        const imageLink = "https://image.tmdb.org/t/p/w500";

        const downloadVideo = async () => {
            try {
                const response = await axios.post('/api/v1/user/download', { video: video }, { responseType: 'blob' });

                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', `${movieUrl}.mp4`); // replace with your filename
                document.body.appendChild(link);
                link.click();

                // clean up and remove the link
                document.body.removeChild(link);
                window.URL.revokeObjectURL(url);
            } catch (error) {
                console.error('Download error:', error);
            }
        };

        const scrollToDiv = () => {
          if (targetDivRef.current) {
              targetDivRef.current.scrollIntoView({ behavior: 'smooth' });
          }
      };
      
      return (
          <Modal
              show={isOpen}
              size="lg"
              aria-labelledby="contained-modal-title-vcenter"
              centered
              id='mainModal'
          >
              <div id='modalImage'>
                  <button onClick={() => toggle(false)} id='modalCloseButton'>X</button>
                  <img src={imageLink + poster_path} alt='modal img' />
                  <Link to={`/videos/${movieUrl}`} className="btn" id='modalBannerPlay' >
                      <div className="row">
                          <div className="col-3"><FaPlay /></div>
                          <div className="col-9">Play</div>
                      </div>
                  </Link>
                  {/* <button onClick={() => downloadVideo()}>Download</button> */}
              </div>

              <Container>
                  <div id='modalInfo'>
                      <div id='modalInfoLeft'>
                          <div id='modalInfoLeftTop'>
                              <div id='yearDuration'>
                                  <span id='year'>
                                      {release_date.split('-')[0]}
                                  </span>
                                  <span id='duration'>
                                      {Math.floor(runtime / 60)}h {runtime % 60}m
                                  </span>
                              </div>
                              <div id='contentType'>
                                  {tagline}
                              </div>
                          </div>
                          <div id='description'>
                              {overview}
                          </div>
                      </div>
                      <div id='modalInfoRight'>
                          <div id='cast'>
                              <span>Cast: </span>
                              <span>
                                  {cast.slice(0, 3)?.join(', ')},
                                  <button onClick={scrollToDiv}>more</button>
                              </span>
                          </div>
                          <div id='genres'>
                              <span>Genres: </span>
                              <span>
                                  {genres?.join(', ')}
                              </span>
                          </div>
                      </div>
                  </div>

                    <div id='moreLikeThis'>
                      <Container>
                          <h4>More Like this</h4>
                          <div className='row'>
                              {recommendedIds
                                  .filter((recommendedId) => {
                                      const recommendedDetails = movieDetails.find((movie) => movie.id === recommendedId);
                                      return recommendedDetails !== undefined;
                                  })
                                  .map((recommendedFilteredId, index) => {
                                      const recommendedDetails = movieDetails.find((movie) => movie.id === recommendedFilteredId);
                                      return index < 6 && (
                                          <div className='col-lg-4 col-md-5 col-sm-6'>
                                              <ModalCard recommendedDetails={recommendedDetails} />
                                          </div>
                                      );
                                  })
                              }
                          </div>
                      </Container>
                  </div>
                  

                  <div id='aboutModal' ref={targetDivRef}>
                      <h4>
                          <span>About </span>
                          <span>
                              {title}
                          </span>
                      </h4>
                      <div id='aboutDetails'>
                          <div id='aboutDirector'>
                              <span id='aboutTitle'>Director : </span>
                              <span id='aboutName'>
                                  {director}
                              </span>
                          </div>
                          <div id='aboutCast'>
                              <span id='aboutTitle'>Cast : </span>
                              <span id='aboutName'>
                                  {cast.slice(0, 3)?.join(', ')}
                              </span>
                          </div>
                          <div id='aboutWriter'>
                              <span id='aboutTitle'>Writer : </span>
                              <span id='aboutName'>
                                  {writer}
                              </span>
                          </div>
                          <div id='aboutGenres'>
                              <span id='aboutTitle'>Genres : </span>
                              <span id='aboutName'>
                                  {genres?.join(', ')}
                              </span>
                          </div>
                      </div>
                  </div>
              </Container>
          </Modal>
      );
  } catch (error) {
      console.log("Modal catch error ", error);
  }
};

export default InfoModal;
