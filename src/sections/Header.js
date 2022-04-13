import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import { Link } from 'react-router-dom'



const Header = () => {
  const { user, setUser, isLogged } = useContext(AuthContext);
  const logout = () => {
    localStorage.clear();
    setUser({});
  }


  return (
    <>
      <nav className={`navbar  navbar-expand-lg  ${isLogged() ?  "navbar-light bg-light": "navbar-dark bg-custom"} `}>
        <Link to="/" className='navbar-brand logo'>
          <span className="material-icons color-primary">
          explore
        </span><span>&nbsp;EmprenD</span>
        </Link>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
        </div>
        {isLogged() ?
          <>
            <span className="navbar-text logout" onClick={e => logout()}>
              <div className="btn-primary">
              {user.name}&nbsp;
              <span className="material-icons-outlined">
                close
              </span>
              </div>
            </span>
          </> : <Link to="/register" className='btn btn-primary'>Registro</Link>}

      </nav>
    </>
  )
}

export default Header