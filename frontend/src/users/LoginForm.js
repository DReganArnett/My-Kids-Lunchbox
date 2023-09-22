import React, {useState} from 'react';
import {useHistory} from 'react-router-dom';
import Header from '../common/Header';
import Alert from '../common/Alert';

const LoginForm = ({login}) => {
    const history = useHistory();
    const initialState = {username: "", password: ""};
    const [formData, setFormData] = useState(initialState);
    const [formErrors, setFormErrors] = useState([]);

    // Handles form submit
    async function handleSubmit(evt) {
        evt.preventDefault();
        login(formData);
        setFormData(initialState);
        history.push('/')
    }

    //Updates form fields on change
    function handleChange(evt) {
        const {name, value} = evt.target;
        setFormData((data) => ({...data, [name]: value}));
    }

    return  (
        <div className='LoginForm'>
            <Header />
            <div className='LoginForm-container'>
                <h3 className='LoginForm-h3'>Log in here:</h3>
                <form onSubmit={handleSubmit}>
                    <br></br>
                    <label htmlFor='username'>Username: </label>
                    <input 
                        className='LoginForm-usernameInput'
                        type='text'
                        name='username'
                        id='username'
                        placeholder='Enter a username'
                        value={formData.username}
                        onChange={handleChange}
                        required>
                    </input>
                    <br></br>
                    <label htmlFor='password'>Password: </label>
                    <input 
                        className='LoginForm-passwordInput'
                        type='text'
                        name='password'
                        id='password'
                        placeholder='Enter your password'
                        value={formData.password}
                        onChange={handleChange}
                        required>
                    </input>
                    <br></br>
                    <br></br>
                    {formErrors.length ? <Alert messages={formErrors} /> : null}
                    <button onSubmit={handleSubmit}>Login!</button>
                </form>
            </div>
        </div>
    );
}

export default LoginForm;