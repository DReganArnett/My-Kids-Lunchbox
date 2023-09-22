import React, {useState, useEffect, useContext} from 'react';
import {Link, Redirect, useParams} from 'react-router-dom';
import Header from '../common/Header';
import Alert from '../common/Alert';
import UserContext from '../users/UserContext';
import MklApi from '../api';

const ReviewForm = () => {
    const {id} = useParams();
    const {currentUser, reviewLunch, setReviewIds, reviewIds, reviewed, setReviewed} = useContext(UserContext);
    const initialState = {reviewText: "", username: currentUser.username, lunchId: Number(id)}
    const [lunch, setLunch] = useState([]);
    const [formData, setFormData] = useState(initialState)
    const [formErrors, setFormErrors] = useState([]);
    
   
    useEffect(() => {
        async function getLunch() {
            let lunchRes = await MklApi.getLunch(id);
            setLunch(lunchRes);
        }
        getLunch()
    },[id]);

    // console.log("reviewIds: ", reviewIds)
    // console.log("lunch: ", lunch);
    // console.log("id: ", id);

    // Handles form submit  
    async function handleSubmit(evt) {
        let data = {
            reviewText: formData.reviewText,
            username: currentUser.username,
            lunchId: +id
        }; 
        let resData = reviewLunch(data);
        setReviewIds([...reviewIds, resData.id]);
        setReviewed(true);
        setFormData(initialState);
        setFormErrors([]);
    }
       
    // Updates form data fields on change
    function handleChange(evt) {
        const {name, value} = evt.target;
        setFormData(data => ({...data, [name]: value}));
    }

    return (
        <div className='ReviewForm'>
            <Header />
            <div className='ReviewForm-container'>
                <h3>Review {lunch.title} here:</h3>
                <form onSubmit={handleSubmit}>
                    <textarea
                        className='ReviewForm-reviewTextArea'
                        name="reviewText"
                        id="reviewText"
                        placeholder="Enter comments here"
                        value={formData.reviewText}
                        onChange={handleChange}
                    >
                    </textarea>
                    {formErrors.length ? <Alert messages={formErrors} /> : null}
                    <br></br>
                    <button type="submit" onSubmit={handleSubmit}>Submit review!</button>
                    {reviewed ? <Alert messages={["Review added successfully"]} /> : null}
                </form>
                <br></br>
                <br></br>
            </div>
        </div>
    );
}

export default ReviewForm;