
import Signup from '../Components/Signup/Signup'
import Signin from '../Components/Signin/Signin'
import './App.css'
import { Routes,Route,Link } from 'react-router-dom'
import AboutAuth from '../Components/About/AboutAuth'

const Home = () => {
  return (
    <div>
      <Link to={'/signup'}>Signup</Link>
      <Link to={'/login'}>Signin</Link>
    </div>
  )
}
function App() {


  return (
    <div>

        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/signup' element={<Signup/>}/>
          <Route path='/login' element={<Signin/>}/>
          <Route path='/about' element={<AboutAuth/>} />
        </Routes>  

    </div>
  )
}

export default App
