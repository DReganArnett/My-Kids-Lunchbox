import React, {useContext} from 'react';
import {Link} from 'react-router-dom';
import Header from '../common/Header';
import UserContext from '../users/UserContext'


const Home = () => {
    const {currentUser} = useContext(UserContext);
    
    // console.log("currentUser: ", currentUser);
    
    const homeIfLoggedIn = () => {
        return (
            <div className='Home-loggedIn'>
                <h1>Welcome, {currentUser.firstName || currentUser.username}!</h1>
                <h3>What's for Lunch?</h3>
            </div>
        );
    }

    const homeIfLoggedOut = () => {
        return (
            <div className='Home-loggedOut'>
                <br></br>
                <br></br>
                <h2>New around here?</h2>
                <button><Link to="/register">Sign Up Here!</Link></button>
                <br></br>
                <br></br>
                <h2>Let's pack some lunches!</h2>
                <button><Link to="/login">Log In Here!</Link></button>
            </div>
        );
    }

    return (
        <div className="Home">
            <div className="Home-container">
                <Header />
                {currentUser ? homeIfLoggedIn() : homeIfLoggedOut()}
            </div>
        </div>
    );
}

export default Home;