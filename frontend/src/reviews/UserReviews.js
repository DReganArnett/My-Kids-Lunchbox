import React, {useState, useEffect, useContext} from 'react';
import {Redirect} from 'react-router-dom';
import Header from '../common/Header';
import MklApi from '../api';
import UserContext from '../users/UserContext';
import UserReviewCardList from './UserReviewCardList';

const UserReviews = () => {
    const {currentUser} = useContext(UserContext);
    const [reviews, setReviews] = useState([]);
    
    console.log(reviews);

    useEffect(() => {
        async function getUserReviews() {
            let reviews = MklApi.getUserReviews(currentUser.id);
            setReviews(reviews);
        }
        getUserReviews()
    }, [currentUser.username])
    
   
    console.log(reviews)

    // if (!reviews) <Redirect to='/'></Redirect>

    return (
        <div className='UserReviews'>
            <Header />
            <h2 className='UserReviews-h2'>{currentUser.firstName || currentUser.username}'s Reviews:</h2>
            <div className='UserReviews-reviews'>
                <UserReviewCardList reviews={reviews} />
            </div>   
        </div>
    );
}

export default UserReviews;