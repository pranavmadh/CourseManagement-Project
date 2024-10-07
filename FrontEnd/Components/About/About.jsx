import { useEffect, useState } from 'react'
import './About.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


const About = () => {

    const navigate = useNavigate()
    const [user,setUser] = useState({})

    const getData = async () => {

        const token = localStorage.getItem("token")
        console.log(token)

        const user = await axios.get('http://localhost:3000/me',{
            headers : {
                token : token
            }
        })

        setUser(user.data)
    }

    useEffect(() => {
        getData()
    },[])

    const onLogOutHandler = () => {
        localStorage.removeItem("token")
        navigate('/login')
    }

    const content = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."

    return (
        <div className="aboutContainer">
            <div className="contentContainer">
                <div className="nameContainer">
                    <div className="welcome">
                    <h1>Welcome ,</h1>
                    <h1 className="name">{user.name}</h1>
                    </div>
                    <div className="logoutBtn" onClick={onLogOutHandler}>
                        <button>Logout</button>
                    </div>
                </div>
                <div className="about">
                    <h2>Your Name is <span>{user.name}</span></h2>
                    <p>{content}</p>

                    <h2>Your Email is <span>{user.email}</span></h2>
                    <p>{content}</p>
                </div>
                <div className="100x">
                    You are <span>100xdev</span>
                </div>
            </div>
        </div>
    )
}

export default About