import React from 'react';
import LunchFoodCard from "../lunches/LunchFoodCard";


const LunchFoodCardList = ({foods}) => {
    
    return (
        <div className='LunchFoodCardList'>
            {foods.map(food => (
                <LunchFoodCard
                    key={food.id}
                    id={food.id}
                    food_title={food.food_title}
                    serving_size={food.serving_size}
                    calories={food.calories}
                    fat_content={food.fat_content}
                    protein_content={food.protein_content}
                    carbohydrates={food.carbohydrates}
                    sugar={food.sugar}
                />
            ))}
        </div>
    );
} 

export default LunchFoodCardList;