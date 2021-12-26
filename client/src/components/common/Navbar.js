// import React, { useEffect } from 'react'
import React from 'react'
import { Link } from 'react-router-dom'


const Navbar = () => {

  // const history = useHistory()
  // const location = useLocation()

  // useEffect(() => {

  // }, [location.pathname])

  // const handleLogout = () => {
  //   window.localStorage.removeItem('token')
  //   history.push("/")
  // }


  return (
    <nav className="navbar">
      <div className="container-fluid">
        <div className="navbar-header">
          <Link to="/" className="navbar-brand">home</Link>
        </div>

        <div className="nav navbar-nav">
        <li className="nav-item">
            <Link to="/" className="nav-link">event list</Link>
          </li>
          <li className="nav-item">
            <Link to="/" className="nav-link">player list</Link>
          </li>
          <li className="nav-item">
            <Link to="/" className="nav-link">location list</Link>
          </li>
        </div>
      </div>
    </nav>
  )
}

export default Navbar