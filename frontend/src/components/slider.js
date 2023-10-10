import { Fragment, useState } from "react";
import Carousel from 'react-multi-carousel/lib/Carousel';
import 'react-multi-carousel/lib/styles.css';
import { Line } from 'rc-progress';
import InfoModal from './modal';
import BadlaSmall from '../images/BadlaSmall.jpg';
import { GrCirclePlay } from 'react-icons/gr';
import '../style/slider.css';
import { Link } from "react-router-dom";


export default function Sliders({ movie }) {
    const [showModal, setShowModal] = useState(false);
    const [changeDiv, setChangeDiv] = useState(false);
    const [clickedMovie, setClickedMovie] = useState();
    const imageLink = "https://image.tmdb.org/t/p/w500";
    // const [ changeDivSize, setChangeDivSize ] = useState({})
    const toggleModal = () => {
        setShowModal(!showModal)
    }
    const handleMouseOverChange = () => {
        setChangeDiv(true)
        // setChangeDivSize({width:"60vh",height:"45vh",backgroundColor:'white'})
    }
    const handleMouseOutChange = () => {
        setChangeDiv(false)
        // setChangeDivSize({})
    }

    const responsive = {
        desktop: {
            breakpoint: { max: 1400, min: 1200 },
            items: 4,
            slidesToSlide: 4
        },
        laptop: {
            breakpoint: { max: 1199, min: 992 },
            items: 3,
            slidesToSlide: 3
        },
        tablet: {
            breakpoint: { max: 991, min: 769 },
            items: 2,
            slidesToSlide: 2
        },
        mobile: {
            breakpoint: { max: 767, min: 576 },
            items: 1,
            slidesToSlide: 1
        }
    };

    // console.log("Genres in sldiers are ", genre);
    console.log("MOvies are ", movie)
    // console.log("Movies in sliders are ", imageLink + movie[genre][0].poster_path);

    return <Fragment>
        <Carousel responsive={responsive} customTransition="all .5" transitionDuration={500}>
            {
                
                
            movie.map((movie) => (
                <div id="carouselDiv" key={movie.id} onClick={() => {
                    setClickedMovie(movie)
                    console.log("Information ", clickedMovie)
                    toggleModal()
                }}>
                    
                    <img src={imageLink + movie.poster_path} alt={movie.title} width="330px" height="200px" />
                    {
                        console.log(" movie.currentTime is ",  movie)
                    }
                    {
                        movie.currentTime && <Line percent={(movie.currentTime/movie.runtime)*100} strokeWidth="1" strokeColor="red" />
                    }
                </div>
            ))
            }
        </Carousel>
        {showModal && <InfoModal isOpen={showModal} toggle={toggleModal} movieInfo={clickedMovie} searchStatus={false}/>}



    </Fragment>
}