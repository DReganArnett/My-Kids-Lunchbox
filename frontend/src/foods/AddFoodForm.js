import React, {useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import Alert from '../common/Alert';
import Header from '../common/Header';


const AddFoodForm = ({addFood}) => {
    const history = useHistory();
    const initialState = {
        foodTitle: "",
        category: "",
        servingSize: "", 
        calories: "",
        fatContent: "",
        proteinContent: "",
        carbohydrates: "",
        sugar: "",
    }

    console.log("addFood: ", addFood);

    const [formData, setFormData] = useState(initialState);
    const [formErrors, setFormErrors] = useState([]);
    const [foodAdded, setFoodAdded] = useState(false);

    // Handles form submit
    async function handleSubmit(evt) {
        evt.preventDefault();
        let res = await addFood(formData);
        if(res.success) {
            setFoodAdded(true)
            history.push('/foods')
        } else {
            setFormErrors(res.errors);
        } 
    }
    

    // Updates form fields on change
    function handleChange(evt) {
        const {name, value} = evt.target;
        setFormData(data => ({...data, [name]: value}));
        setFormErrors([]);
    }

    return (
        <div className='AddFoodForm'>
            <Header />
            <h2 className='AddFoodForm-h2'>Add a Food to your Fridge:</h2>
            <div className='AddFoodForm-container'>
                <form className='AddFoodForm-form' onSubmit={handleSubmit}>
                    <label htmlFor='foodTitle'>Title: </label>
                    <input 
                        className='AddFoodForm-foodTitle'
                        type='text'
                        name='foodTitle'
                        id='foodTitle'
                        placeholder='Add title here'
                        value={formData.foodTitle}
                        onChange={handleChange}>
                    </input>
                    <br></br>
                    <label htmlFor='category'>Select a category: </label>
                    <select name="category" className="AddFoodForm-category">
                        <option value={formData.protein}>Protein</option>
                        <option value={formData.carb}>Carb</option>
                        <option value={formData.fruit}>Fruit</option>
                        <option value={formData.vegetable}>Vegetable</option>
                        <option value={formData.fat}>Fat</option>
                        <option value={formData.sweet}>Sweet</option>
                        <option value={formData.beverage}>Beverage</option>
                    </select>
                    <br></br>
                    <label htmlFor='servingSize'>Serving Size: </label>
                    <input 
                        className='AddFoodForm-servingSize'
                        type='text'
                        name='servingSize'
                        id='servingSize'
                        placeholder='Add serving size here'
                        value={formData.servingSize}
                        onChange={handleChange}>
                    </input>
                    <br></br>
                    <label htmlFor='calories'>Calories: </label>
                    <input 
                        className='AddFoodForm-calories'
                        type='text'
                        name='calories'
                        id='calories'
                        placeholder='Add calories here'
                        value={formData.calories}
                        onChange={handleChange}>
                    </input>
                    <br></br>
                    <label htmlFor='fatContent'>Fat: </label>
                    <input 
                        className='AddFoodForm-fatContent'
                        type='text'
                        name='fatContent'
                        id='fatContent'
                        placeholder='Add fat here'
                        value={formData.fatContent}
                        onChange={handleChange}>
                    </input>
                    <br></br>
                    <label htmlFor='proteinContent'>Protein: </label>
                    <input 
                        className='AddFoodForm-proteinContent'
                        type='text'
                        name='proteinContent'
                        id='proteinContent'
                        placeholder='Add protein here'
                        value={formData.proteinContent}
                        onChange={handleChange}>
                    </input>
                    <br></br>
                    <label htmlFor='carbohydrates'>Carbohydrates: </label>
                    <input 
                        className='AddFoodForm-carbohydrates'
                        type='text'
                        name='carbohydrates'
                        id='carbohydrates'
                        placeholder='Add carbohydrates'
                        value={formData.carbohydrates}
                        onChange={handleChange}>
                    </input>
                    <br></br>
                    <label htmlFor='sugar'>Sugar: </label>
                    <input 
                        className='AddFoodForm-sugar'
                        type='text'
                        name='sugar'
                        id='sugar'
                        placeholder='Add sugar'
                        value={formData.sugar}
                        onChange={handleChange}>
                    </input>
                    <br></br>
                    <button type="submit" onSubmit={handleSubmit}>Add Food!</button>
                    {formErrors.length ? <Alert messages={formErrors} /> : null}
                        {foodAdded ? <Alert messages={["Food added successfully"]} /> : null}
                </form>
            </div>
        </div>
    );
}

export default AddFoodForm;