import { Fragment } from "react";
import { Link } from "react-router-dom";
// import Container from 'react-bootstrap/Container';
// import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@coreui/coreui/dist/css/coreui.min.css'
import Accordion from 'react-bootstrap/Accordion';
import logo from '../images/Stremo.png'
import Footer from './footer'
import '../style/home.css';
import '../style/video.css'

export default function Home() {
    
    return <Fragment>
        <div className="home">
            <div className="homeBgImg"></div>
            <nav className="navbar navbar-expand-lg">
                <div className="container">
                    <div>
                        <img src={logo} alt='not found' id='stremoLogoHome'/>

                    </div>
                    <div>
                        {/* <button className="btn btn-danger">Sign in</button> */}
                        <Link to="signin" type="button" className="btn btn-danger">Sign in</Link>
                    </div>
                </div>
            </nav>
            <div id="getStarted">
                {/* <h1>Unlimited movies</h1>
                <p>Watch anywhere. Cancel anytime.</p> */}
                <h1>Ready to watch? Enter your email to create or restart your membership.</h1>
                <form>
                    <Link to='signup' className="btn btn-danger text-white" type="submit">Get Started &gt; </Link>
                </form>
            </div>
            <hr className="homeHr" />
            <div className="section1 row">
                <div className="col tv">
                    <h1>Enjoy on your TV</h1>
                    <p>Watch on smart TVs, PlayStation, Xbox, Chromecast, Apple TV, Blu-ray players and more.</p>
                </div>
                <div className="col">
                    <img src="https://assets.nflxext.com/ffe/siteui/acquisition/ourStory/fuji/desktop/tv.png" alt="TV not found" />
                    <video autoplay="autoplay" muted loop controls={false} id="tvVideo">
                        <source src="https://assets.nflxext.com/ffe/siteui/acquisition/ourStory/fuji/desktop/video-tv-in-0819.m4v" type="video/mp4" />
                    </video>
                </div>
            </div>
            <hr className="homeHr" />
            <div className="section1 row">
                <div className="col mobile">
                    <img src="https://assets.nflxext.com/ffe/siteui/acquisition/ourStory/fuji/desktop/mobile-0819.jpg" alt="Mobile not found" />
                </div>
                <div className="col mobileText">
                    <h1>Download your shows to watch offline</h1>
                    <p>Save your favourites easily and always have something to watch.</p>
                </div>
            </div>
            <hr className="homeHr" />
            <div className="section1 row">
                <div className="col laptopText">
                    <h1>Watch everywhere</h1>
                    <p>Stream unlimited movies and TV shows on your phone, tablet, laptop, and TV.</p>
                </div>
                <div className="col laptop">
                    <video autoplay='autoplay' muted loop controls={false} id='laptopVideo'>
                        <source src="https://assets.nflxext.com/ffe/siteui/acquisition/ourStory/fuji/desktop/video-devices-in.m4v" type="video/mp4" />
                    </video>
                    <img src="https://assets.nflxext.com/ffe/siteui/acquisition/ourStory/fuji/desktop/device-pile-in.png" alt="Laptop not found" />

                </div>
            </div>
            <hr className="homeHr" />
            <div id="faq">
                <h1>Frequently Asked Question</h1>
                <div id="accor">  
                    <Accordion>
                        <Accordion.Item eventKey="0" className="accordian">
                            <Accordion.Header>Accordion Item #1</Accordion.Header>
                            <Accordion.Body>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                                minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                                aliquip ex ea commodo consequat. Duis aute irure dolor in
                                reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                                pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                                culpa qui officia deserunt mollit anim id est laborum.
                            </Accordion.Body>
                        </Accordion.Item>
                        <br/>
                        <Accordion.Item eventKey="1">
                            <Accordion.Header>Accordion Item #2</Accordion.Header>
                            <Accordion.Body>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                                minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                                aliquip ex ea commodo consequat. Duis aute irure dolor in
                                reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                                pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                                culpa qui officia deserunt mollit anim id est laborum.
                            </Accordion.Body>
                        </Accordion.Item>
                        <br/>
                        <Accordion.Item eventKey="2">
                            <Accordion.Header>Accordion Item #3</Accordion.Header>
                            <Accordion.Body>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                                minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                                aliquip ex ea commodo consequat. Duis aute irure dolor in
                                reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                                pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                                culpa qui officia deserunt mollit anim id est laborum.
                            </Accordion.Body>
                        </Accordion.Item>
                        <br/>
                        <Accordion.Item eventKey="3">
                            <Accordion.Header>Accordion Item #4</Accordion.Header>
                            <Accordion.Body>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                                minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                                aliquip ex ea commodo consequat. Duis aute irure dolor in
                                reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                                pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                                culpa qui officia deserunt mollit anim id est laborum.
                            </Accordion.Body>
                        </Accordion.Item>
                        <br/>
                    </Accordion>
                </div>

                <h5>Ready to watch? Enter your email to create or restart your membership.</h5>
                <form>
                    <Link to='/signup' className="btn btn-danger text-white" type="submit">Get Started &gt; </Link>
                </form>
            </div>
            <hr className="faqHr"/> 
            <Footer/>
           
        </div>
        {/* <div className="homeFooter row">
                <a href="/" className="col-4">Contact us</a>
                <a href="/" className="col-4">About us</a>
                <a href="/" className="col-4">Help</a>
            </div> */}


    </Fragment>
}