import { Fragment, useContext, useState } from "react";
import { Link } from 'react-router-dom';
import { FaPlay } from 'react-icons/fa';
import { TfiInfoAlt } from 'react-icons/tfi'
// import { Link } from "react-router-dom";
import InfoModal from './modal';
import { MovieContext } from "./movieList";
import NoHardFeelings from '../images/BannerNoHardFeelings.jpg';
import bannerText from '../images/BannerText.png';

export default function Banner() {
    const allMovieDetails = useContext(MovieContext);
    
    const [ showModal, setShowModal ] = useState(false);
    const [clickedMovie, setClickedMovie] = useState();
    const toggleModal = () =>{
    }
    const handleFetchBannerData = () =>{
        setShowModal(!showModal)
        const movie = allMovieDetails.filter((movies)=> movies.id === 884605);
        console.log("In banner modal ",showModal)

        setClickedMovie(movie)
    }
    return <Fragment>
        <div id='homePageTopBanner'>
            <img src={NoHardFeelings} alt='not found' width='100%' />

            <div id='homePageTopBannerImg'>
                <div id='homePageTopBannerInfo'>
                    <img src={bannerText} alt='not found' />
                    <p>A bartender who's down on her luck takes on an unusual challenge when a 
                        wealthy couple hires her to romance their socially awkward son.</p>
                    <Link to='/videos/trackId-884605' className="btn btn-outline" id='bannerPlay' >
                        <div className="row">
                            <div className="col-3"><FaPlay /></div>
                            <div className="col-9">Play</div>
                        </div>
                    </Link>

                    <button className="btn btn-outline" id='bannerMoreInfo' onClick={()=>{
                        handleFetchBannerData()
                        }} >
                        <div className="row">
                            <div className="col-3"><TfiInfoAlt /></div>
                            <div className="col-9">More Info</div>
                            {/* <Link to='/browse' className='col-9'>More Info</Link> */}
                        </div>
                    </button>
                </div>
            </div>
        </div>
        <InfoModal isOpen={showModal} toggle={toggleModal} movieInfo={clickedMovie} searchStatus={true} searchMovieDetails={clickedMovie}/>

        
    </Fragment>
}