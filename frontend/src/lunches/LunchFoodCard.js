import React from 'react';

const LunchFoodCard = ({food_title, serving_size, calories, fat_content, protein_content, carbohydrates, sugar, lunchId}) => {
   
    return (
        <div className='LunchFoodCard'>
            <div className='LunchFoodCard-foods'>
                <p><b>Item: </b> {`${food_title}`}</p>
                <p><b>Serving Size: </b> {`${serving_size}`}</p>
                <p><b>Calories:</b> {`${calories}`}</p>
                <p><b>Fat: </b>{`${fat_content}`} grams</p>
                <p><b>Protein: </b>{`${protein_content}`} grams</p>
                <p><b>Carbohydrates: </b>{`${carbohydrates}`} grams</p>
                <p><b>Sugar: </b>{`${sugar}`} grams</p>
                <br></br>
            </div>
            <br></br>
        </div>
    );
}

export default LunchFoodCard;