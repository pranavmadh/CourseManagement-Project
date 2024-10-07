import { useState } from 'react';
import './Signup.css'
import { Link , useNavigate} from 'react-router-dom';
import axios from 'axios'


const Signup = () => {

    const [firstname,setFirstname] = useState("")
    const [lastname,setLastname] =  useState("")
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [confirm,setConfirm] = useState("")
    const [terms,setTerms] = useState(true)
    const [focus1,setFocus1] = useState(false)
    const [focus,setFocus] = useState(false)

    const navigate = useNavigate()
    const reviews = [
        {
          name: "Priya Nair",
          review: `"Great course! The mentors made complex topics easy, and I feel more confident coding."`,
          profilePic: "https://randomuser.me/api/portraits/women/2.jpg"
        }
      ];

    
      async function onSubmitHandler(e){
        e.preventDefault()

        const message = await axios.post('http://localhost:3000/api/v1/user/signup',{
            firstname : firstname,
            lastname : lastname,
            email : email,
            password : password
        })
        console.log(message.data)

        if (message.data.signup === true) {
            navigate('/login')
        }
      }
    return (
        <div className="container">
            <div className="mainPart1">
                <div className="subPart one">
                <div className="header">
                        <span>
                            CourseInit,<br/>
                            A Global Learning Platform
                        </span>
                        
                </div>
                <div className="desc">
                <strong>CourseInt</strong> is a global online platform offering accessible courses and degrees from top universities and companies worldwide.
                </div>
                </div>
                <div className="subPart two">
                    <div className="stars">
                        <img src="../assets/stars.png" alt="start" />
                    </div>
                    <div className="review">
                        <p>{reviews[0].review}</p>
                    </div>
                    <div className="profile">
                        <div className="profilePic">
                            <img src={reviews[0].profilePic} alt="profile pic" />
                        </div>
                        <div className="profileInfo">
                            <h1>{reviews[0].name}</h1>
                            <h2>Student At CourseInit</h2>
                        </div>
                    </div>
                </div>  
            </div>
            <div className="mainPart2">
            <div className="inputDiv">
                    <div className="header">
                        <div className="title">
                            Sign up to
                            <div>
                                CourseInit
                            </div>
                        </div>
                        <div className="signIn">
                            Already a member?
                            <div>
                                <Link to={'/login'} className='signinLink'>Log in here</Link>
                            </div>
                        </div>
                    </div>
                    <form onSubmit={onSubmitHandler}>
                        <div className="outer-field">
                        <div className="field">
                        <label>Your Firstname</label>
                        <input type="text" placeholder='You Full Name' onChange={(e) => {
                            setFirstname(e.target.value)
                        }}/>
                    </div>
                    <div className="field">
                        <label>Your Lastname</label>
                        <input type="text" placeholder='You Full Name' onChange={(e) => {
                            setLastname(e.target.value)
                        }}/>
                    </div>
                        </div>
                    <div className="field">
                        <label>Your Email Address</label>
                        <input type="text" placeholder='Your Email Address' onChange={(e) => {
                            setEmail(e.target.value)
                        }}/>
                    </div>
                    <div className="field">
                        <label>Create a Password</label>
                        <input type="password" placeholder='Create a Password' onChange={(e) => {
                            setPassword(e.target.value)
                        }} onBlur={() => {
                            setFocus1(true)
                        }}/>
                    </div>
                    <div className="errorMessage">
                    {focus1 && password.length < 8 ? <p>Password length must be atleast 8 characters.</p> : null}
                    </div>
                    <div className="field">
                        <label>Confirm Your Password</label>
                        <input type="password" placeholder='Confirm your Password' onChange={(e) => {
                            setConfirm(e.target.value)
                        }} onBlur={() => {
                            setFocus(true)
                        }} />
                    </div>
                    <div className="errorMessage">
                    {focus && password !== confirm ? <p>Passwords do not match!</p> : null}
                    </div>
                    <div className="terms">
                        <input type="checkbox" onChange={() => {
                            setTerms(!terms)
                        }} />
                        <span>By Signing up, you agree to our <strong>Terms of Service</strong> and <strong>Privacy Policy</strong></span>
                    </div>
                    <div className="submitButton">
                        <button disabled={terms}>Create Account</button>
                    </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Signup