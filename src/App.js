import './App.css';
import About from './About/About';
import Home from './Home/Home';
import Login from './Login/Login';
import Register from './Register/Register';
import Movies from './Movies/Movies';
import Navbar from './Navbar/Navbar';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import Network from './Network/Network';
import { useEffect, useState } from 'react';
import jwtDecode from 'jwt-decode';
import Moviedetails from './MovieDetalis/Moviedetails';
import Tvdetails from './Tvdetails/Tvdetails';

function App() {
  const [userData, setfUserData] = useState(null) 
  let navigate = useNavigate();


  useEffect( () => {
    if(localStorage.getItem("userToken"))
    {
      getUserData()
    }
  } , []);



  function getUserData()
  {
   let decoded = jwtDecode(localStorage.getItem('userToken'));
   setfUserData(decoded);
  }

  useEffect( ()=> {console.log(userData)} , [userData]);

  function logOut()
  {
    localStorage.removeItem("userToken");
    setfUserData(null);
    navigate("/login")
  }
  function ProtecttedRroute({children})
  {
    if(!localStorage.getItem('userToken')) 
    {
      return <Navigate to='/login'/>
    }   
    else {
      return children;
    }
  }

  return ( <>
    <Navbar userData={userData} logOut={logOut}/> 
    <div className='container'> 
    <Routes>
    
    <Route path='/' element={ <ProtecttedRroute><Home/></ProtecttedRroute> }/>
    <Route path='Home' element={ <ProtecttedRroute> <Home/>  </ProtecttedRroute>  }/>
    <Route path='Moviedetails' element={<Moviedetails/> }/>
    <Route path='Tvdetails' element={<Tvdetails/> }/>
    <Route path='About' element={<ProtecttedRroute> <About/></ProtecttedRroute> }/>
    <Route path='Network' element={<ProtecttedRroute><Network/></ProtecttedRroute> }/>
    <Route path='Login' element={<Login getUserData={getUserData}/>}/>
    <Route path='Register' element={<Register/>}/>
    <Route path='Movies' element={<ProtecttedRroute> <Movies/></ProtecttedRroute>  }/>
    <Route path='*' element={<h2>Not Found 404</h2>}/>

    </Routes>
    </div>
    </>
  )
}

export default App;
