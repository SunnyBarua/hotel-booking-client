import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'

const Navbar = () => {
  const history=useHistory()
  const dispatch=useDispatch()
  const {auth}=useSelector((state)=>({...state}));

  const logout=()=>{
    dispatch({
      type:'LOGOUT',
      payload:null,
    });
    window.localStorage.removeItem('auth')
    history.push("/login")
  }

    return (
  <nav className="navbar navbar-expand-lg navbar-light bg-primary t-white">
  <div className="container">
    <Link className="navbar-brand" to="/">Radison</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse " id="navbarNavAltMarkup">
      <div className="navbar-nav ">
        <Link className="nav-link active" aria-current="page" to="/">Home</Link>
        {auth !==null &&(
          <Link className="nav-link" to="/dashboard">Dashboard</Link>
        )}

        {auth !==null &&(
          <Link className="nav-link"  onClick={logout}>Logout</Link>
        )}
        {auth ===null &&(
          <>
        <Link className="nav-link" to="/login">Login</Link>
        <Link className="nav-link" to="/register">Register</Link>
          </>
        )}
      </div>
    </div>
  </div>
</nav>
    )
}

export default Navbar
