import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {useParams, Redirect} from 'react-router-dom';
import MklNutritionApi from '../MklNutritionApi';
import Header from '../common/Header';


const FoodDetail = ({name}) => {
   
    const [food, setFood] = useState({});

    const options = {
        method: 'GET',
        url: 'https://nutrition-by-api-ninjas.p.rapidapi.com/v1/nutrition',
        params: {
            query: name
        },
        headers: {
            'X-RapidAPI-Key': '8be6f93432mshc758f3e1a585e73p13508fjsn2377414f5639',
            'X-RapidAPI-Host': 'nutrition-by-api-ninjas.p.rapidapi.com'
        }
    };

    const getNutritionData = async () => {
        try {
            const food = await axios.request(options)
            setFood(food.data);
        } catch (error) {
            console.error(error);
        }
    }
  
    useEffect(() => {
        getNutritionData();
    }, []);

   

    // if (!food) <Redirect to='/'></Redirect>

    return (
        <div className='FoodDetail'>
            <Header />
            <h2>{`${food.name}`}</h2>
            <p><b>Serving Size:</b> {food.serving_size_g} g</p>
            <p><b>Calories: </b>: {`${food.calories}`}</p>
            <p><b>Total Fat:</b> {`${food.fat_total_g}`} g</p>
            <p><b>Saturated Fat:</b> {`${food.fat_saturated_g}`} g</p>
            <p><b>Protein:</b> {`${food.protein_g}`} g</p>
            <p><b>Sodium:</b> {`${food.sodium_mg}`} mg</p>
            <p><b>Potassium:</b> {`${food.potassium_mg}`} mg</p>
            <p><b>Cholesterol:</b> {`${food.cholesterol_mg}`} mg</p>
            <p><b>Total Carbohydrates:</b> {`${food.carbohydrates_total_g}`} g</p>
            <p><b>Fiber:</b> {`${food.fiber_g}`} g</p>
            <p><b>Sugar:</b> {`${food.sugar_g}`} g</p>
        </div>    
    );
}

export default FoodDetail;