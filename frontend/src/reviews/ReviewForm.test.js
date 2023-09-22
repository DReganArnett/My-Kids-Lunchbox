import React from 'react';
import {render} from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import UserContext from '../users/UserContext';
import ReviewForm from '../reviews/ReviewForm';


jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({
    id: '1'
  })
}))

const user = {
  username: "testuser",
  firstName: "Test",
  lastName: "User",
  email: "testuser@email.com",
  diet: "standard",
  allergies: "none",
  preferences: "everything",
  aversions: "nothing",
}

// Smoke test
it('should render without crashing', function() {
  render(
    <BrowserRouter>
      <UserContext.Provider value={{currentUser:user}}>
        <ReviewForm />
      </UserContext.Provider>  
    </BrowserRouter>  
  );
});

// Snapshot test
it('should match snapshot', () => {
  const {asFragment} = render(
    <BrowserRouter>
      <UserContext.Provider value={{currentUser:user}}>
        <ReviewForm />
      </UserContext.Provider>
    </BrowserRouter>  
  );
  expect(asFragment).toMatchSnapshot()
});