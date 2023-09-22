import React, {useContext} from 'react';
import {Link, NavLink} from 'react-router-dom';
import UserContext from '../users/UserContext';

const Navbar = ({logout}) => {
    const {currentUser} = useContext(UserContext);

    const navIfLoggedIn = () => {
        return (
            <div className="Navbar-loggedIn">
                <span><button><NavLink to="/">Home</NavLink></button></span>
                <span><button><NavLink to="/lunches">Lunches</NavLink></button></span>
                <span><button><NavLink to="/createlunch">My Kitchen</NavLink></button></span>
                <span><button><NavLink to="/users/reviews">My Reviews</NavLink></button></span>
                <span><button><NavLink to="/users/favorites">My Favorites</NavLink></button></span>
                <span><button><NavLink to="/users/profile/">My Profile</NavLink></button></span>
                <span><button><Link to="/" onClick={logout}>Log Out</Link></button></span>
            </div> 
        );
    }

    const navIfLoggedOut = () => {
        return (
            <div className='Navbar-loggedOut'>
                <span><button><NavLink to="/">Home</NavLink></button></span>
                <span><button><NavLink to="/login">Log In</NavLink></button></span>
                <span><button><NavLink to="/register">Sign Up</NavLink></button></span>
            </div>
        );
    }

    return (
        
        <div className='Navbar'>
            {currentUser ? navIfLoggedIn() : navIfLoggedOut()}
        </div>
    );
}

export default Navbar;