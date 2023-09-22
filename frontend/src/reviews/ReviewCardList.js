import React, {useContext} from 'react';
import UserContext from '../users/UserContext';
import Header from '../common/Header';
import ReviewCard from "../reviews/ReviewCard";


const ReviewCardList = ({reviews}) => {
    return (
        <div className='ReviewCardList-container'>  
            {reviews.map((review) => (
                <ReviewCard id={review.id} review={review} />
            ))}
        </div>
    );
}

export default ReviewCardList;