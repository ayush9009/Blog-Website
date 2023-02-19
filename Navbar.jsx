import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../context/authContext'
import Logo from "../img/logo.png"

const Navbar = () => {

    const { currentUser, logout } = useContext(AuthContext);
    return (
        <div className='navbar'>
            <div className='container'>
                <div className='logo' logo>
                    <Link to="/">
                        <img src={Logo} alt="logo" />
                    </Link>

                </div>
                <div className='links'>
                    <Link className='link' to="/?cat=art">
                        <h6>ART</h6>
                    </Link>
                    <Link className='link' to="/?cat=science">
                        <h6>SCIENCE</h6>
                    </Link>
                    <Link className='link' to="/?cat=technology">
                        <h6>TECHNOLOGY</h6>
                    </Link>
                    <Link className='link' to="/?cat=cinema">
                        <h6>CINEMA</h6>
                    </Link>
                    <Link className='link' to="/?cat=projects">
                        <h6>PROJECT</h6>
                    </Link>
                    <Link className='link' to="/?cat=food">
                        <h6>FOOD</h6>
                    </Link>
                    <span>{currentUser?.username}</span>
                    {/* agr current user hai to current user ka name lik do else kuch ni */}
                    {currentUser ? (
                        <span onClick={logout}>Logout</span>   //yani agr current user hai to logout icon show kar do
                    ) : (<Link className="link" to="/login">
                        Login
                    </Link>
                    )}
                    <span className='write'>
                        <Link className="link" to="/write">Write</Link>
                    </span>
                </div>
            </div>
        </div>

    )
}

export default Navbar