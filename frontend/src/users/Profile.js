import React, {useContext} from 'react';
import Header from '../common/Header';
import UserContext from './UserContext';
import ProfileForm from './ProfileForm';

const Profile = () => {
    const {currentUser} = useContext(UserContext);
    console.log(currentUser);

    return (
        <div className='Profile'>
            <Header />
            <div className='Profile-container'>
                <h2>{currentUser.firstName || currentUser.username}'s Profile</h2>
                <p><b>Username: </b> {currentUser.username}</p>
                <p><b>First Name: </b>{currentUser.firstName}</p>
                <p><b>Last Name: </b>{currentUser.lastName}</p>
                <p><b>Email: </b>{currentUser.email}</p>
                <p><b>Diet Type: </b>{currentUser.diet}</p>
                <p><b>Allergies/Sensitivities: </b>{currentUser.allergies}</p>
                <p><b>Food Preferences: </b>{currentUser.preferences}</p>
                <p><b>Food Aversions: </b>{currentUser.aversions}</p>
                <br></br>
                <br></br>
                <ProfileForm />
            </div>
        </div>
    );
}

export default Profile;