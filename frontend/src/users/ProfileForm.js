import React, {useState, useContext} from 'react';
import {useParams, useHistory} from 'react-router-dom';
import Alert from '../common/Alert';
import UserContext from './UserContext';
import MklApi from '../api';

const ProfileForm = () => {
    const {id} = useParams()
    const {currentUser, setCurrentUser} = useContext(UserContext);
    const initialState = {
        id: currentUser.id,
        username: currentUser.username,
        password: "",
        firstName: currentUser.firstName,
        lastName: currentUser.lastName,
        email: currentUser.email,
        diet: currentUser.diet || null,
        allergies: currentUser.allergies || null,
        preferences: currentUser.preferences || null,
        aversions: currentUser.aversions || null,
    }
    const [formData, setFormData] = useState(initialState);
    const [formErrors, setFormErrors] = useState([]);
    const [updateConfirmed, setUpdateConfirmed] = useState(false);

    // Handles form submit
    async function handleSubmit(evt) {
        evt.preventDefault();
        let data = {
            username: formData.username,
            password: formData.password,
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            diet: formData.diet,
            allergies: formData.allergies,
            preferences: formData.preferences,
            aversions: formData.aversions,
        };
        let id = formData.id;
        let updatedUserProfile;
        try {
            updatedUserProfile = await MklApi.updateUser(currentUser.username, data);
        } catch (errors) {
            setFormErrors(errors);
            return;
        }   
        setFormData(data => ({...data, password: ""}));
        setFormErrors([]);
        setUpdateConfirmed(true);
        setCurrentUser(updatedUserProfile);
    }

    // Updates form fields on change
    function handleChange(evt) {
        const {name, value} = evt.target;
        setFormData(data => ({...data, [name]: value}));
        setFormErrors([]);
    }

    return (
        <div className="ProfileForm">
            <h4>Update {currentUser.firstName || currentUser.username}'s Profile Here:</h4>
            <form onSubmit={handleSubmit}>
                    <label htmlFor="username">Username: </label>
                    <span className='ProfileForm-username'>{formData.username}</span>
                    <br></br>
                    <label htmlFor="password">Password: </label>
                    <input 
                        className="ProfileForm-passwordInput"
                        type="text"
                        name="password"
                        id="password"
                        placeholder="Enter a password"
                        value={formData.password}
                        onChange={handleChange}>
                    </input>
                    <br></br>
                    <label htmlFor="firstName">First Name: </label>
                    <input 
                        className="ProfileForm-firstNameInput"
                        type="text"
                        name="firstName"
                        id="firstName" 
                        placeholder="Enter your first name"
                        value={formData.firstName}
                        onChange={handleChange}>
                    </input>
                    <br></br>
                    <label htmlFor="lastName">Last Name: </label>
                    <input 
                        className="ProfileForm-lastNameInput"
                        type="text"
                        name="lastName"
                        id="lastName"
                        placeholder="Enter your last name"
                        value={formData.lastName}
                        onChange={handleChange}>
                    </input>
                    <br></br>
                    <label htmlFor="email">E-mail: </label>
                    <input 
                        className="ProfileForm-emailInput"
                        type="text"
                        name="email"
                        id="email"
                        placeholder="Enter your E-mail"
                        value={formData.email}
                        onChange={handleChange}>
                    </input>
                    <br></br>
                    <label htmlFor="diet">Special Diet: </label>
                    <input 
                        className='ProfileForm-dietInput'
                        type="text"
                        name="diet"
                        id="diet"
                        placeholder="Enter your diet type"
                        value={formData.diet}
                        onChange={handleChange}>
                    </input>
                    <br></br>
                    <label htmlFor="allergies">Food Allergies: </label>
                    <input 
                        className='ProfileForm-allergiesInput'
                        type="text"
                        name="allergies"
                        id="allergies"
                        placeholder="Enter food allergies"
                        value={formData.allergies}
                        onChange={handleChange}>
                    </input>
                    <br></br>
                    <label htmlFor="preferences">Food Preferences: </label>
                    <input 
                        className='ProfileForm-preferencesInput'
                        type="text"
                        name="preferences"
                        id="preferences"
                        placeholder="Enter your food preferences"
                        value={formData.preferences}
                        onChange={handleChange}>
                    </input>
                    <br></br>
                    <label htmlFor="aversions">Food Aversions: </label>
                    <input 
                        className='ProfileForm-aversionsInput'
                        type="text"
                        name="aversions"
                        id="aversions"
                        placeholder="Enter your food aversions"
                        value={formData.aversions}
                        onChange={handleChange}>
                    </input>
                    <br></br>
                    <br></br>
                    {formErrors.length ? <Alert messages={formErrors} /> : null}
                    {updateConfirmed ? <Alert messages={["Profile successfully updated"]} /> : null}
                <button type="submit" onSubmit={handleSubmit}>Save changes</button>
            </form>
        </div>
    );
}

export default ProfileForm;