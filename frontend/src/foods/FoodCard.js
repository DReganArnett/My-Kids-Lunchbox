import React from 'react';

const FoodCard = ({food, setFoodData}) => {
    const {foodTitle, servingSize, category, calories, fatContent, proteinContent, carbohydrates, sugar} = food;
   
    // console.log("id: ", id);

    // Handles adding a food to add lunch for
    // function handleAddFoodToLunch {

    // }

    return (
        <div className="FoodCard">
            <h2>{`${foodTitle}`}</h2>
            <p><b>Category: </b>{`${category}`}</p>
            <p><b>Serving Size: </b> {`${servingSize}`}</p>
            <p><b>Calories:</b> {`${calories}`}</p>
            <p><b>Fat: </b>{`${fatContent}`} grams</p>
            <p><b>Protein: </b>{`${proteinContent}`} grams</p>
            <p><b>Carbohydrates: </b>{`${carbohydrates}`} grams</p>
            <p><b>Sugar: </b>{`${sugar}`} grams</p>
            <button className='FoodCard-addToLunchButton'>Add To Lunch</button>
            <br></br>
        </div>
    );
}

export default FoodCard;