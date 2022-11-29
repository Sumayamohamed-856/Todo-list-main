import React from 'react'
import { useNavigate } from "react-router"
import { FiLogOut } from 'react-icons/fi';


function Pages() {
  const navigate = useNavigate()
  const logout = () => {
    window.localStorage.removeItem("access_token")
    navigate('/')
  }

  return (
    <div className='nav-bar'>
      <nav className="navbar navbar-expand-lg navbar-dark">
        <div className="container-fluid mx-3">
          <a className="navbar-brand" href="/dashboard">
            TODO
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a
                  className="nav-link active"
                  aria-current="page"
                  href="/dashboard"
                >
                  Home
                </a>
              </li>
            </ul>
            <div className="d-flex">
              <div className="icon-bar me-2" onClick={logout}>
                <FiLogOut />
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Pages