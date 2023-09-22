import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import MklApi from '../api';
import LunchReviewCard from "./LunchReviewCard";

const LunchReviewCardList = ({id, reviews}) => {
    
    console.log("id: ", id);
    console.log("reviews: ", reviews);

    let lunchReviews = reviews.filter(function (review) {
        if (review.lunchId === id) return review.lunchId;
    });
    console.log("lunchReviews: ", lunchReviews);

    return (
        <div className='LunchReviewCardList'>
            {lunchReviews.map(review => (
                <LunchReviewCard review={review}
                    key={review.id}
                    id={review.id}
                    reviewText={review.reviewText}
                    userId={review.userId}
                    lunchId={review.lunchId}
                />
            ))}
        </div>
    );
}

export default LunchReviewCardList;