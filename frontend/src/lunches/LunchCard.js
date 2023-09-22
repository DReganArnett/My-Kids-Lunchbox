import React, {useContext, useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import UserContext from '../users/UserContext';
import LunchReviews from './LunchReviews';
import {VscHeart} from "react-icons/vsc";
import {VscHeartFilled} from "react-icons/vsc";


const LunchCard = ({lunch, reviews}) => {  
    const {addFavorite, removeFavorite, userFavoriteIds, setUserFavoriteIds} = useContext(UserContext)
    const [lunchReviews, setLunchReviews] = useState([]);
    const [heartFilled, setHeartFilled] = useState(userFavoriteIds.has(lunch.id))
    

    useEffect(() => {
        function getLunchReviews(reviews) {
            setLunchReviews(reviews.filter((lunchReview) => lunchReview.lunchId === lunch.id));
        }
        getLunchReviews(reviews);
    }, [reviews]);

    async function handleAddFavorite(evt) {
        addFavorite(lunch.id)
        setUserFavoriteIds(new Set([...userFavoriteIds, lunch.id]));
        setHeartFilled(true)
    } 
    
    async function handleRemoveFavorite(evt){
        removeFavorite(lunch.id);
        userFavoriteIds.delete(lunch.id)
        setUserFavoriteIds(new Set([...userFavoriteIds]));
        setHeartFilled(false);
    }

    // console.log("userFavoriteIds: ", userFavoriteIds)
    
 
    
    return (
        <div className='LunchCard'>
            <div className='LunchCard-lunches'>
                <div className='LunchCard-lunchInfo'>
                    <br></br>
                    <div>
                        <h2>{`${lunch.title}`}  {heartFilled ? <VscHeartFilled onClick={handleRemoveFavorite} /> : <VscHeart onClick={handleAddFavorite} /> }</h2>
                          
                    </div>
                    <br></br>
                    <span>Description: <i>{`${lunch.description}`}</i> </span>
                    <br></br>
                    <br></br>
                    <span>Diet Type: <i>{`${lunch.specialDietaryFeatures}`}</i> </span>
                    <br></br>
                    <button className='LunchCard-linkToDetailsButton'><Link to={`/lunches/${lunch.id}/details`}>See Lunch Details</Link></button>
                    <button className='LunchCard-linkToReviewForm'><Link to={`/lunches/${lunch.id}/addreview`}>Add comments for this Lunch</Link></button>
                </div>
                <br></br>
                <hr></hr>
                <br></br>
                <div className="LunchCard-comments">
                    <br></br>
                    <span><b>User Comments: </b></span>
                    <br></br>
                    <br></br>
                    <LunchReviews lunchId={lunch.id} lunchReviews={lunchReviews} />
                </div>      
            </div>       
        </div>
    );
}

export default LunchCard;