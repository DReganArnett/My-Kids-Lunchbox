import React, {useState, useEffect, useContext} from "react";
import ReviewCard from "../reviews/ReviewCard";
import UserContext from "../users/UserContext";
import Header from "../common/Header";


const ReviewList = ({lunches, reviews}) => {
    const {currentUser, setReviewIds} = useContext(UserContext);
    const [userReviews, setUserReviews] = useState([]);
   
    useEffect(() => {
        function getUserReviews(currentUser) {
            setUserReviews(currentUser.reviews);
        };
        getUserReviews(currentUser)
    }, []);

    useEffect(() => {
        function getReviewIds(reviews) {
          setReviewIds(reviews.map((review) => (review.id)))
        }
        getReviewIds(reviews)
    }, [reviews])

    //console.log("reviewIds: ", reviewIds)
    console.log("userReviews: ", userReviews);
    
    return (
        <div className="ReviewList-container">
            <Header />
            <br></br>
            <br></br>
            <h1 className="ReviewList-header">{currentUser.firstName || currentUser.username}'s Lunch Reviews:</h1>
            {userReviews.length
                ? (
                    <div className='ReviewsList-reviews'>
                        {userReviews.map((userReview) => ( 
                            <ReviewCard userReview={userReview} 
                                        lunches={lunches} 
                                        key={userReview.id}
                            />
                        ))} 
                    </div>
                ) : (
                    <p className='ReviewList-emptyMessage'>No reviews yet.</p>
            )}
            
        </div>
    ); 
}

export default ReviewList;