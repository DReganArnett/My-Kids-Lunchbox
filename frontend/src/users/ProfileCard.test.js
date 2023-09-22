import React from 'react';
import {render} from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import UserContext from './UserContext';
import ProfileCard from '../users/ProfileCard';


const user = {
  id: 1,
  username: "testUser",
  firstName: "Test",
  lastName: "User",
  email: "testuser@email.com",
  diet: "standard",
  allergies: "none",
  preferences: "everything",
  aversions: "nothing"
}

// Smoke test
it('should render without crashing', function() {
  render(
    <BrowserRouter>
      <UserContext.Provider value={{currentUser: user}}>  
        <ProfileCard />
      </UserContext.Provider> 
    </BrowserRouter>
  );
});

// Snapshot test
it('should match snapshot', () => {
  const {asFragment} = render(
    <BrowserRouter>
      <UserContext.Provider value={{currentUser: user}}>
        <ProfileCard />
      </UserContext.Provider>
    </BrowserRouter>   
  );
  expect(asFragment).toMatchSnapshot()
});