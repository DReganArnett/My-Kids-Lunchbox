import React, {useState, useEffect} from 'react';
import {useParams, Redirect} from 'react-router-dom';
import MklApi from '../api';
import Header from '../common/Header';
import LunchFoodCardList from "./LunchFoodCardList";


const LunchNutrition = () => {
    const {id} = useParams();
    const [lunch, setLunch] = useState([]);
    const [foods, setFoods] = useState([]);
    

    console.log(foods);

    useEffect(() => {
        async function getLunch() {
            let lunch = await MklApi.getLunch(id);
            setLunch(lunch);
            setFoods(lunch.foods);
        }
        getLunch();
    }, [id]);

    if (!lunch) <Redirect to="/"></Redirect> 

    return (
        <div className="LunchNutrition">
            <Header />
            <div className='LunchNutrition-container'>
                <h1> {lunch.title}</h1>
                <p><b>Description:</b> {lunch.description}</p>
            </div>
            <br></br>

            <br></br>
            <h2 className='LunchNutrition-foodList'>Nutrition Information For Lunch Items:</h2>
            <div className='LunchNutrition-foods'>
                <LunchFoodCardList foods={foods} />
            </div>
        </div>
    );
}

export default LunchNutrition;