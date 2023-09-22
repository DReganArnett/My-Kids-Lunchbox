import React, {useState, useEffect} from 'react';
import {useParams, Redirect} from 'react-router-dom';
import MklApi from '../api';
import Header from '../common/Header';
import LunchCard from "./LunchCard";
import LunchFoodCardList from "./LunchFoodCardList";
import ReviewCardList from '../reviews/ReviewCardList';

const LunchDetail = () => {
    const {id} = useParams();
    const [lunch, setLunch] = useState([]);
    const [foods, setFoods] = useState([]);
    const [reviews, setReviews] = useState([]);

    console.log(foods);

    useEffect(() => {
        async function getLunch() {
            let lunch = await MklApi.getLunch(id);
            setLunch(lunch);
            setFoods(lunch.foods);
            setReviews(lunch.reviews);
        }
        getLunch();
    }, [id]);

    // if (!lunch) <Redirect to="/"></Redirect> 

    return (
        <div className="LunchDetail">
            <Header />
            <h1> {lunch.title}</h1>
            <p><b>Description:</b> {lunch.description}</p>
            <br></br>
            <h2>Nutrition Information For Lunch Items:</h2>
            <div className='LunchDetail-foods'>
                <LunchFoodCardList foods={foods} />
            </div>
        </div>
    );
}

export default LunchDetail;