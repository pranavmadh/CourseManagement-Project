import React, { useEffect, useState } from 'react'
import About from './About'


function AboutAuth() {
    const [token,setToken] = useState("")
    useEffect(() => {
        setToken(localStorage.getItem("token"))
    })

  return (
    <div>
        {token ? <About/> : <p>Nice Try Diddy!</p>}
    </div>
  )
}

export default AboutAuth