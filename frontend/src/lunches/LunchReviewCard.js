import React, {useState, useEffect, useContext} from 'react';
import UserContext from '../users/UserContext';
import MklApi from '../api';

const LunchReviewCard = ({lunchReview}) => {
    // console.log("lunchReview: ", lunchReview)
   
    return (
        <div className='LunchReviewCard'>
            
            <div className='lunchReviewCard-reviews'>
                    <p>{`${lunchReview.reviewText}`}</p> 
                    <p>~ {`${lunchReview.username}`}</p> 
            </div>
        </div>
    );
}

export default LunchReviewCard;