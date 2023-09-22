import React, {useContext} from 'react';
import ReviewCard from './LunchReviewCard';

const LunchReviews = ({lunchReviews, username, showReview}) => {    
  
    return (
        <div className="LunchReviews">
            {lunchReviews.length
                ? (
                    <div className='LunchReviews-reviews'>
                        {lunchReviews.map((lunchReview) => (
                            <ReviewCard key={lunchReview.id} lunchReview={lunchReview} username={username} showReview={showReview} />
                        ))}      
                    </div>
                ) : (
                    <h4>No reviews on this lunch yet.</h4>
            )}       
        </div>
    );   
}

export default LunchReviews;