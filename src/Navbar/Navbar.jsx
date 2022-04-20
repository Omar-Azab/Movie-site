import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar(props) {
  return <>

  <nav className="navbar navbar-expand-lg navbar-dark bg-transparent">
  <div className="container-fluid">
    <Link className="navbar-brand fw-bold" to="Home">NOXE</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">

        {
          props.userData?<> 
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to="Home">Home</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="About">About</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="Movies">Movies</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="Network">Network</Link>
        </li>    
          </>:""
        }


      </ul>

      <ul className="navbar-nav mb-2 mb-lg-0">

        <li className="nav-item d-flex align-items-center me-3 mb-2 mb-md-0">
        <i className="mx-2 fa-brands fa-facebook-f"></i>
        <i className="mx-2 fa-brands fa-instagram"></i>
        <i className="mx-2 fa-brands fa-twitter"></i>
        <i className="mx-2 fa-brands fa-spotify"></i>
        </li>

        {
          props.userData?
          <>
          <li className="nav-item">
          <span className="nav-link" onClick={props.logOut}>LogOut</span>
        </li>
         </>:<>
         <li className="nav-item">
          <Link className="nav-link" to="Register">Register</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="Login">Login</Link>
        </li>
         </>
        }

          </ul>
    </div>
  </div>
</nav>  
  
  
  
  
  
  
  </>
}
