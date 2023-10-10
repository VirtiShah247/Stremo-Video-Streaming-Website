import { Fragment, useContext } from "react";
import NaamShabana from '../images/NaamShabana.jpg';
import { AiOutlinePlayCircle } from 'react-icons/ai';
import '../style/modalCard.css';
import { Link } from "react-router-dom";
export default function ModalCard({ recommendedDetails }) {
    try {

        const imageLink = "https://image.tmdb.org/t/p/w500";
        const movieUrl = "trackId-" + recommendedDetails.id;
        // console.log("recc ", recommendedDetails)
        return <Fragment>
            <div id='modalCardDiv'>
                <div id='modalCardImgDiv'>
                    <img src={imageLink + recommendedDetails.poster_path} alt='no img' height="180vh" width="204.5vh" />
                    <div id='modalCardDuration'>
                        {Math.floor(recommendedDetails.runtime / 60)}h {recommendedDetails.runtime % 60}m
                    </div>

                    <div id='modalCardPlay'>
                        <Link to={`/videos/${movieUrl}`}><AiOutlinePlayCircle /></Link>
                    </div>
                </div>
                <div id='modalCardInfo'>
                    
                    <div id='modalCardYear'>
                        {
                            recommendedDetails.release_date.split('-')[0]
                        }
                    </div>
                    <div id='modalCardDesc'>
                        {
                            recommendedDetails.overview
                        }
                    </div>
                </div>
            </div>
        </Fragment>
    } catch (error) {
        console.error(error)
    }
}