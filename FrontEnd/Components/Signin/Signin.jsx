import React, { useState } from 'react'
import { Link ,useNavigate} from 'react-router-dom'
import '../Signin/Signin.css'
import axios from 'axios'
const key = "token"



function Signin() {

  const navigate = useNavigate()

  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const [invalid,setInvalid] = useState(false)

  async function onSiginHandler(e) {
    e.preventDefault()
    const message =  await axios.post('http://localhost:3000/api/v1/user/login',{
      email : email,
      password : password
    })
    
    if (message.data.token) {
    localStorage.setItem(key,message.data.token)
    console.log(message.data.token)
    navigate('/about')
    } else {
      setInvalid(true)
    }
    

  }
  return (
    <div className="signInContainer">
      <div className="topPart">
        <div className="header">
          <div className="title-login">
            Sign in to
            <div>
              Courseinit
            </div>
          </div>
          <div className="signIn-login">
            Not a member?
            <div>
              <Link to={'/signup'} className='signupLink'>Create Account</Link>
            </div>
          </div>
        </div>
        <form onSubmit={onSiginHandler} className='formDiv'>
          <div className="field">
            <label>Your Email Address</label>
            <input type="email" placeholder='Your Email Address' onChange={(e) => {setEmail(e.target.value)}}/>
          </div>
          <div className="field">
            <label>Your Password</label>
            <input type="password" placeholder='Your Password' onChange={(e) => {setPassword(e.target.value)}}/>
          </div>
          <div>
            {invalid ? <p>Invalid email or password</p> : null}
          </div>
          <div className="field-check">
            <div>
            <input type="checkbox" name="check" className='checkBox'/>
            <label>Remember me</label>
            </div>
            <label>Forgot Password?</label>
          </div>
          <div className="sbtButton">
            <button>Login</button>
          </div>
        </form>
        
      </div>
    </div>
  )
}

export default Signin