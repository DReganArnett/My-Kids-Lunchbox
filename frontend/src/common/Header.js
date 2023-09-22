import React from 'react';
import Lunchbox from '../images/lunchbox.jpg';
const Header = () => {
    return (
        <div className='Header'>
            <span className='Header-h1'>My Kids' Lunchbox</span>
            <img className='Header-lunchbox' src={Lunchbox} alt={"red lunch box"} />
            <h4 className='Header-h4'>...pack a lunch they'll actually eat!</h4>
            <hr></hr>
            <br></br>
        </div>
    );
}

export default Header;