import React, {useEffect}from 'react';
import {
    Link , useLocation, useNavigate

} from "react-router-dom";

const Navbar = (props) => {
    let { theme, toggleMode } = props;
    let navigate = useNavigate();
    //uselocation is used to get the current end point like about , home etc is opened
    // here we have used it to highlight the tab in the navbar
    let location = useLocation();
    useEffect(()=>{
     console.log(location.pathname)
    },[location]);

    const handleLogout = ()=>{
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        navigate('/login')
    }

    return (
        <nav className={`navbar sticky-top navbar-expand-lg navbar-${theme} bg-${theme}`}>
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">Cloud Notes</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname==="/"?"active":""}`}  to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className= {`nav-link ${location.pathname==="/about"?"active":""}`} to="/about">About</Link>
                        </li>

                    </ul>
                    <div className={`form-check form-switch text-${theme === 'light' ? 'black' : 'light'}`}>
                        <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" onClick={toggleMode} />
                        <label className="form-check-label" htmlFor="flexSwitchCheckDefault">Enable Dark Mode</label>
                    </div>
                    {!localStorage.getItem('token')?<form className="d-flex">
                    <Link className="btn btn-outline-primary btn-sm mx-2" to={'/login'}>Login</Link>
                    <Link type="button" className="btn btn-outline-warning btn-sm mx-2" to={'/signup'}>Sign Up</Link>
                    </form>:<button className='btn btn-outline-danger mx-3' onClick={handleLogout}>Log out</button>}

                </div>
            </div>
        </nav>
    )
}

export default Navbar;
