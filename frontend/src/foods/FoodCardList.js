import React from 'react';
import FoodCard from './FoodCard';

const FoodCardList = ({foods}) => {
    return (
        <div className='FoodCardList'>
            {foods.map(food => (
                <FoodCard
                    key={food.id}
                    id={food.id}
                    title={food.title}
                    category={food.category}
                    servingSize={food.servingSize}
                    calories={food.calories}
                    fat={food.fat}
                    protein={food.protein}
                    carbohydrates={food.carbohydrates}
                    sugar={food.sugar}
                />
            ))}
        </div>
    );
}

export default FoodCardList;