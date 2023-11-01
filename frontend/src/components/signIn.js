import { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import TextField from '@mui/material/TextField';
import { Form } from "react-bootstrap";
import logo from '../images/Stremo.png'
import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../style/signIn.css'
// // import Email from '@mui/material/Email';
// import InputEmailField from '@mui/material/InputEmailField';

export default function Signin(){
    

    // redirect to browse page if user is already logged in
    const [user, setUser] = useState({
        email:"",
        password: ""
    })

    // useEffect(()=>{
    //     const signedIn = localStorage.getItem("Signedin");
    //     if(signedIn){
    //         window.location.href = './'
    //     }
    // },[])

    const handleLoginChange = e =>{
    const {name,value} = e.target
    setUser({...user,[name]:value})
    console.log(user.password);

    }
    const handleLoginSubmit = async (e)=>{
        e.preventDefault()
        console.log("Login user ", user);
        try {
            const res = await axios.post("/api/v1/user/login", user);
            if (res.data.success) {
              console.log("data user",res.data.user)
              localStorage.setItem("Userdetail", JSON.stringify(res.data.user));
              localStorage.setItem("Usertoken", res.data.token);
              localStorage.setItem("Signedin", res.data.success);
              console.log("Login Success");
              window.location.href = "./browse";
            } else {
              console.error("try error ",res.data.message);
              toast.error(res.data.message, { theme: "dark"});
            }
          } catch (error) {
            console.log(error);
            console.error("something went wrong");
          }



    }

    return <Fragment>
        <div>
            <div className="homeBgImg"></div>
            <div className="netflixLogo">
                <img src={logo} alt='not found' className='stremoLogoSignIn'/>
            </div>
            <div className="signInForm">
                <h3>Sign In</h3>

                <Form onSubmit={handleLoginSubmit}>
                    <TextField className="signInField" required type="email" id="filled-basic" label="Email or Phone number" variant="filled" name='email' onChange={(e)=>handleLoginChange(e)}/>
                    <br/>
                    <TextField className="signInField" required type="password" id="filled-basic" label="Password" variant="filled" name='password' onChange={(e)=>handleLoginChange(e)}/>
                    <br/>
                    <input type="submit" className="btn btn-danger text-white" value="Sign In" />
                </Form>
                <div className="newToNetflix">
                    New to Stremo? 
                    <Link to="/">Sign up now.</Link>
                </div>
                
                
            </div>
            <div className="signInFooter row">
                <a href="/" className="col-4">Contact us</a>
                <a href="/" className="col-4">About us</a>
                <a href="/" className="col-4">Help</a>
            </div>
        </div>
        
    </Fragment>
}