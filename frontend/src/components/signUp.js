import { Fragment, useState } from "react";
// // import Email from '@mui/material/Email';
// import InputEmailField from '@mui/material/InputEmailField';
import TextField from '@mui/material/TextField';
import logo from '../images/Stremo.png'
import { Link } from "react-router-dom";
import axios from 'axios';
import { Container } from "@mui/material";
import { toast } from 'react-toastify';
import '../style/signUp.css'

export default function Signup() {

    const [user, setUser] = useState({
        name: "",
        email: "",
        password: ""
    })

   
    // redirect to browse page if user is already logged in
    // useEffect(()=>{
    //     const signedIn = localStorage.getItem("Signedin");
    //     if(signedIn){
    //         window.location.href = './'
    //     }
    // },[])
    //validate function
    const validateForm = () => {
        let isValid = true;
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*])[^\s"'<>]{8,}$/;

        if (!emailRegex.test(user.email)) {
            // setErrors((prevState) => ({ ...prevState, email: 'Invalid email format' }));
            toast.error("Invalid Email!", { theme: "dark"});
            isValid = false;
        } else {
            // setErrors((prevState) => ({ ...prevState, email: '' }));
        }

        if (!passwordRegex.test(user.password)) {
            // setErrors((prevState) => ({ ...prevState, password: "Invalid password format"}));
            toast.error("Invalid Password!", { theme: "dark"});
            isValid = false;
        } else {
            // setErrors((prevState) => ({ ...prevState, password: '' }));
        }

        return isValid;
    };
    //handle user details change
    const handleDetailChange = e => {
        const { name, value } = e.target
        setUser({ ...user, [name]: value }
        )
    }

    //register function 
    const handleSignupSubmit = async (e) => {
        e.preventDefault()
        console.log(user);
        if (validateForm()) {
            try {
                const res = await axios.post('/api/v1/user/register', user)
                if (res.data.success) {
                    console.log('Register Successed')
                    window.location.href = "./signin";
                }
                else {
                    console.error(res.data.message)
                    // setErrors(res.data.message)
                    toast.error(res.data.message, { theme: "dark"});
                }
            }
            catch (error) {
                console.log(error)
                console.error('something went wrong')
            }
        }
    }



    return <Fragment>
        <div>
            {/* Bg image */}
            <div className="homeBgImg"></div>
            <div className="netflixLogo">
                <img src={logo} alt='not found' className='stremoLogoSignIn'/>
            </div>
            <Container>
                {/* sign up form */}
                <div className="signInForm">
                    <h3>Sign Up</h3>

                    <form onSubmit={(e) => handleSignupSubmit(e)}>
                        <TextField className="signInField filled-basic" required type="text" label="Username" variant="filled" name="name" onChange={(e) => handleDetailChange(e)} />
                        <br />
                        <TextField className="signInField filled-basic" required type="email" label="Email id" variant="filled" name="email" onChange={(e) => handleDetailChange(e)} />
                        {/* {errors.email && <div className="error">{errors.email}</div>} */}
                        <br />
                        <TextField className="signInField filled-basic" required type="password" label="Password" variant="filled" name="password" onChange={(e) => handleDetailChange(e)} />
                        {/* {errors.password && <div className="error">{errors.password}</div>} */}
                        <br />
                        {/* <TextField className="signInField filled-basic" required type="password"  label="Confirm Password" variant="filled" onChange={(e)=> setSignUpCpwd(e.target.value)}/>
                        <br /> */}
                       
                        <input type="submit" className="btn btn-danger text-white" value="Sign Up" />
                    </form>
                    <div className="newToNetflix">
                        Alredy a user? 
                        <Link to="/signin">Sign in now.</Link>
                    </div>

                </div>
            </Container>
            {/* footer */}
            <div className="signInFooter row">
                <a href="/" className="col-4">Contact us</a>
                <a href="/" className="col-4">About us</a>
                <a href="/" className="col-4">Help</a>
            </div>
        </div>

    </Fragment>
}