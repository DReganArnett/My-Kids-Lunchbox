import React, {useState, useEffect} from 'react';
import {Link, Redirect} from 'react-router-dom';
import SearchForm from '../common/SearchForm';
import MklApi from '../api';
import Header from '../common/Header';
import FoodCard from './FoodCard';
import AddLunchForm from '../lunches/AddLunchForm';

const FoodList = ({addLunch}) => {
    const [foods, setFoods] = useState([]);

    async function search(foodTitle) {
        let foods = await MklApi.getAllFoods(foodTitle);
        setFoods(foods);
    }

    useEffect(() => {
        function getAllFoods() {
            search();
        }
        getAllFoods();
    }, []);

    

    console.log("foods: ", foods);

    if (!foods) <Redirect to='/'></Redirect>

    return (
        <div className='FoodList'>
            <div className='FoodList-container'>
                <Header />
                <h1 className='FoodList-header'>My Kitchen: </h1>
                <div className='FoodList-createLunch'>
                    <AddLunchForm foods={foods} addLunch={addLunch} />
                </div>
                {/* <h1>Foods in the Fridge:</h1>
                <SearchForm searchTerm={search} />
                <div className='FoodList-addFoodButton'>
                    <label htmlFor="FoodList-addFoodButton">Add a new food to the fridge: </label>
                    <button><Link to="/foods/addFood">Go!</Link></button>
                </div>
                <div className='FoodList-foods'>
                    {foods.length
                        ? (
                        <div>
                            {foods.map((food) => (
                                <FoodCard key={food.id} food={food}/>
                            ))}
                        </div>
                        ) : (
                            <h4>Sorry, no foods with that search term found.</h4>
                    )}
                </div> */}
            </div>
        </div>
    );
}

export default FoodList;