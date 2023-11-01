import { Fragment, useState, useEffect, useContext } from "react";
import { Container, Form, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import logo from '../images/Stremo.png'
import { BiHelpCircle } from "react-icons/bi";
import { CiUser } from 'react-icons/ci';
import { useNavigate } from 'react-router-dom';
import { MovieContext } from "./movieList";
import '../style/navbar.css'
import axios from "axios";

export default function NetflixNavbar() {
    const MovieContextDetails = useContext(MovieContext);
    const [pageScroll, setPageScroll] = useState(false);
    const [searchValue, setSearchValue] = useState("");
    
    const navigate = useNavigate();
    const handleScroll = () => {
        window.scrollY >= 50 ? setPageScroll(true) : setPageScroll(false)
    }
    const signOut = () => {
        localStorage.clear()
        window.location.href = "./";

    }
    const handleSearch = () => {
        console.log("Search value is ", searchValue);
        console.log("MovieContextDetails is in navbar ", MovieContextDetails);
        searchValue !== '' && navigate(`/search?q=${searchValue}`, { state: { MovieContextDetails } });
        setSearchValue("");
    }

    const handleNavMovie = () => {
        navigate(`/movie`, { state: { MovieContextDetails } })
    }

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        const token = localStorage.getItem("Usertoken");
        // console.log("token are ", token);
        const data = { "token": token };
        const fetchData = async () => {
            try {

                const res = await axios.post("/api/v1/user/browse", data);
                console.log("response", res.data.message);
                if (res.data.data === "token expired") {
                    console.log("At client side token is expired");
                    // alert("token expi    red error");
                    localStorage.clear();
                    window.location.href = "./";

                }
            } catch (error) {
                console.log("token expired error", error);
            }
        };

        fetchData();


    }, [])
    return <Fragment>

        <Navbar expand="lg" className={pageScroll ? 'netflixNav navColorChange' : 'netflixNav'}>
            <Container>
                <Navbar.Brand href="/">
                    {/* <svg width="90px" height="90px" viewBox="0 -109.31 300 300" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g fill="red"> <path d="M256.09 76.212c4.178.405 8.354.84 12.52 1.29l9.198-22.712 8.743 24.807c4.486.562 8.97 1.152 13.44 1.768l-15.328-43.501L299.996 0H287.01l-.135.186-8.283 20.455L271.32.003h-12.822l13.237 37.565-15.644 38.644zM246.393 75.322V0h-12.817v74.265c4.275.33 8.552.684 12.817 1.056M150.113 71.11c3.46 0 6.916.026 10.366.054V43.492h15.397V31.708H160.48v-19.91h17.733V0h-30.6v71.12c.831 0 1.666-.013 2.5-.01M110.319 71.83c4.27-.152 8.544-.28 12.824-.384V11.8h11.98V.003H98.339V11.8h11.982v60.03h-.002zM12.295 79.772V34.897L27.471 77.96c4.667-.524 9.341-1.017 14.028-1.483V.001H29.201v46.483L12.825.001H0v81.384h.077c4.063-.562 8.14-1.096 12.218-1.613M85.98 11.797V.001H55.377V75.202a1100.584 1100.584 0 0 1 30.578-2.211V61.184c-5.916.344-11.82.74-17.71 1.181V43.497h15.397V31.706H68.245V11.797H85.98zM203.614 60.62V-.003h-12.873v71.876c10.24.376 20.44.9 30.606 1.56V61.619c-5.9-.381-11.81-.712-17.733-1"></path> </g> </g></svg> */}
                    <img src={logo} alt='not found' className='stremoLogo'/>
                </Navbar.Brand>
                <Nav className="me-auto my-2 my-lg-0">
                    <Nav.Link href="/">Home</Nav.Link>
                    <Nav.Link onClick={()=>handleNavMovie()}>Movies</Nav.Link>
                </Nav>
                <Nav id='navbarSearchDropdown'>

                    <form className="d-flex navSearchForm" onSubmit={handleSearch}>
                        <Form.Control
                            type="search"
                            placeholder="Search Movies"
                            value={searchValue}
                            className="me-2"
                            aria-label="Search"
                            onChange={(e) => setSearchValue(e.target.value)}
                        />
                        <button type="submit">Search</button>
                    </form>

                    <NavDropdown eventKey={1}
                        title={
                            <div style={{ display: 'inline-block' }}>
                                <img src='https://is2-ssl.mzstatic.com/image/thumb/Purple128/v4/2a/19/23/2a1923d6-c740-5bbc-a4b5-afaa45f498aa/source/1200x630bb.jpg'
                                    alt='not found' className='dropDownImage' />
                            </div>
                        }
                        id="basic-nav-dropdown dropdownLeftBottom" drop="start">
                        <NavDropdown.Item href="/account">
                            <div className='row'>
                                <div className='col-2'><CiUser /></div>
                                <div className='col-10'>Account</div>
                            </div>

                        </NavDropdown.Item>
                        <NavDropdown.Item href="/help">
                            <div className='row'>
                                <div className='col-2'><BiHelpCircle /></div>
                                <div className='col-10'>Help center</div>
                            </div>
                        </NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item className="text-center">
                            <button onClick={signOut} id="signOutBtn">Sign out of netflix</button>
                        </NavDropdown.Item>
                    </NavDropdown>
                </Nav>
            </Container>
        </Navbar>

    </Fragment>
}