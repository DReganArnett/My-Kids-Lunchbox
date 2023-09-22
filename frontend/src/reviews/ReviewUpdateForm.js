import React, {useState, useEffect, useContext} from 'react';
import {Redirect, Link, useParams, useHistory} from 'react-router-dom';
import Header from '../common/Header';
import Alert from '../common/Alert';
import UserContext from '../users/UserContext';
import MklApi from '../api';

const ReviewUpdateForm = ({lunch, id}) => {
    // const {id} = useParams();
    const history = useHistory();
    const {setReviewed, currentUser, reviewUpdated, setReviewUpdated} = useContext(UserContext);
    const initialState = {reviewText: "", userId: currentUser.id, lunchId: Number(id)}
    const [formData, setFormData] = useState(initialState)
    const [formErrors, setFormErrors] = useState([]);
    const [review, setReview] = useState([])
    // const [lunch, setLunch] = useState([]);

    console.log(lunch)
    useEffect(() => {
        async function getReview() {
            let reviewRes = await MklApi.getReview(id);
            setReview(reviewRes);
        }
        getReview();
    }, [id]);

    console.log("review: ", review);
    console.log("review.lunchId: ", review.lunchId)
    
    // useEffect(() => {
    //     async function getLunch(review) {
    //        let lunchRes = await MklApi.getLunch(review.lunchId);
    //        setLunch(lunchRes);
    //     }
    //     getLunch(review)
    // }, []);

    console.log("lunch: ", lunch);
    console.log("review id: ", id);
    console.log("currentUser: ", currentUser);

    // Handles form submit  
    async function handleSubmit(evt) {
        let data = {
            reviewText: formData.reviewText,
            username: currentUser.username,
            lunchId: lunch.id,
        }; 
        await MklApi.updateReview(review.id, data);
        setFormData(initialState);
        setFormErrors([]);
        setReviewUpdated(true);
        history.pushState('/users/reviews')
    }
       
    // Updates form data fields on change
    function handleChange(evt) {
        const {name, value} = evt.target;
        setFormData(data => ({...data, [name]: value}));
    }

    return (
        <div className='ReviewUpdateForm'>
            <h4 className='ReviewUpdateForm-h1'>Update Review </h4>
            <div className='ReviewUpdateForm-container'>
                <form onSubmit={handleSubmit}>
                   
                    <textarea
                        className='ReviewUpdateForm-textarea'
                        name="reviewText"
                        id="reviewText"
                        placeholder="Enter comments here"
                        value={formData.reviewText}
                        onChange={handleChange}
                        required>
                    </textarea>
                    {formErrors.length ? <Alert messages={formErrors} /> : null}
                    <button className='ReviewUpdateForm-submitButton'type="submit" onSubmit={handleSubmit}>Save changes!</button>
                    {reviewUpdated ? <Alert messages={["Review updated successfully"]} /> : null}
                </form>
            </div>
        </div>
    );
}

export default ReviewUpdateForm;