import React, {useState, useContext, useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import Alert from '../common/Alert';
import Header from '../common/Header';
import MklApi from '../api';

const AddLunchForm = ({addLunch}) => {
    const history = useHistory();
    const initialState = {
        title: "",
        description: "",
        specialDietaryFeatures: "", 
        protein: "",
        carb: "",
        fruit: "",
        vegetable: "",
        fat: "",
        sweet: "",
        beverage: "",
    }

    const [formData, setFormData] = useState(initialState);
    const [formErrors, setFormErrors] = useState([]);
    const [lunchAdded, setLunchAdded] = useState(false);

    // Handles form submit
    async function handleSubmit(evt) {
        evt.preventDefault();
        let res = await addLunch(formData);
        if(res.success) {
            setLunchAdded(true)
            history.push('/lunches');
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
        <div className='AddLunchForm'>
            <Header />
            <h1 className='AddLunchForm-h1'>Add a Lunch to your Lunchbox:</h1>
            <br></br>
            <div className='AddLunchForm-container'>
                <form className='AddLunchForm-form' onSubmit={handleSubmit}>
                    <label htmlFor='title'>Title: </label>
                    <input 
                        className='AddLunchForm-title'
                        type='text'
                        name='title'
                        id='title'
                        placeholder='Add a title'
                        value={formData.title}
                        onChange={handleChange}>
                    </input>
                    <br></br>
                    <label htmlFor='description'>Description: </label>
                    <textarea 
                        className='AddLunchForm-description'
                        name='description'
                        id='description'
                        placeholder='Describe this lunch'
                        value={formData.description}
                        onChange={handleChange}>
                    </textarea>
                    <br></br>
                    <label htmlFor='specialDietaryFeatures'>Special Dietary Features: </label>
                    <input 
                        className='AddLunchForm-specialDietaryFeatures'
                        type='text'
                        name='specialDietaryFeatures'
                        id='specialDietaryFeatures'
                        placeholder='Add a diet type'
                        value={formData.specialDietaryFeatures}
                        onChange={handleChange}>
                    </input>
                    <br></br>
                    <label htmlFor='title'>Protein: </label>
                    <input 
                        className='AddLunchForm-protein'
                        type='text'
                        name='protein'
                        id='protein'
                        placeholder='Add a protein'
                        value={formData.protein}
                        onChange={handleChange}>
                    </input>
                    <br></br>
                    <label htmlFor='title'>Carb: </label>
                    <input 
                        className='AddLunchForm-carb'
                        type='text'
                        name='carb'
                        id='carb'
                        placeholder='Add a carb'
                        value={formData.carb}
                        onChange={handleChange}>
                    </input>
                    <br></br>
                    <label htmlFor='title'>Fruit: </label>
                    <input 
                        className='AddLunchForm-fruit'
                        type='text'
                        name='fruit'
                        id='fruit'
                        placeholder='Add a fruit'
                        value={formData.fruit}
                        onChange={handleChange}>
                    </input>
                    <br></br>
                    <label htmlFor='title'>Vegetable: </label>
                    <input 
                        className='AddLunchForm-fruit'
                        type='text'
                        name='vegetable'
                        id='vegetable'
                        placeholder='Add a vegetable'
                        value={formData.vegetable}
                        onChange={handleChange}>
                    </input>
                    <br></br>
                    <label htmlFor='title'>Fat: </label>
                    <input 
                        className='AddLunchForm-fat'
                        type='text'
                        name='fat'
                        id='fat'
                        placeholder='Add a fat'
                        value={formData.fat}
                        onChange={handleChange}>
                    </input>
                    <br></br>
                    <label htmlFor='title'>Sweet: </label>
                    <input 
                        className='AddLunchForm-sweet'
                        type='text'
                        name='sweet'
                        id='sweet'
                        placeholder='Add a sweet'
                        value={formData.sweet}
                        onChange={handleChange}>
                    </input>
                    <br></br>
                    <label htmlFor='title'>Beverage: </label>
                    <input 
                        className='AddLunchForm-beverage'
                        type='text'
                        name='beverage'
                        id='beverage'
                        placeholder='Add a beverage'
                        value={formData.beverage}
                        onChange={handleChange}>
                    </input>
                    <br></br>
                    <button className='AddLunchForm-button' type="submit" onSubmit={handleSubmit}>Create Lunch!</button>
                    {formErrors.length ? <Alert messages={formErrors} /> : null}
                        {lunchAdded ? <Alert messages={["Lunch added successfully"]} /> : null}
                </form>
            </div>
            <br></br>
            <br></br>
        </div>
    );
}

export default AddLunchForm;

    // const [foods, setFoods] = useState([]);

    // useEffect(function getAllFoods() {
    //     search();
    // }, []);

    // async function search(title) {
    //     let foods = await MklApi.getAllFoods(title);
    //     setFoods(foods)
    // }