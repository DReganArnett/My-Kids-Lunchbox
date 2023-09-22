import React, {useContext} from 'react';
import Header from '../common/Header';
import UserContext from './UserContext';
import ProfileForm from './ProfileForm';

const ProfileCard = () => {
    const {currentUser, reviews} = useContext(UserContext);

    console.log("currentUser: ", currentUser);
    console.log("reviews: ", reviews);
   
    return (
        <div className='Profile'>
            <Header />
            <div className='Profile-container'>
                <h2>{currentUser.firstName || currentUser.username}'s Profile:</h2>
                <p><b>Username: </b> {currentUser.username}</p>
                <p><b>First Name: </b>{currentUser.firstName}</p>
                <p><b>Last Name: </b>{currentUser.lastName}</p>
                <p><b>Email: </b>{currentUser.email}</p>
                <p><b>Special Diet: </b>{currentUser.diet}</p>
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

export default ProfileCard;