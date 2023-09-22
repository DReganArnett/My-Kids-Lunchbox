import React, {useState, useEffect} from 'react';
import {useParams, Redirect} from 'react-router-dom';
import MklApi from '../api';
import Header from '../common/Header';
import LunchReviewCardList from '../lunches/LunchReviewCardList';

const LunchReview = () => {
    const {id} = useParams();
    const [lunch, setLunch] = useState([]);
    const [reviews, setReviews] = useState([]);

    console.log(reviews);

    useEffect(() => {
        async function getLunch() {
            let lunch = await MklApi.getLunch(id);
            setLunch(lunch);
            setReviews(lunch.reviews); 
        }
        getLunch()
    }, [id]);

    if (!lunch) <Redirect to='/'></Redirect>

    return (
        <div className="LunchReviews">
            <Header />
            <h2>Reviews For {lunch.title}:</h2>
            <div className='LunchReviews-reveiws'>
                <LunchReviewCardList reviews={reviews} />
            </div>
        </div>
    );   
}

export default LunchReview;