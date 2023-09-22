import React from 'react';
import {render} from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import LunchList from '../lunches/LunchList';
import UserContext from '../users/UserContext';

// Smoke test 
it('should render without crashing', function() {
  <BrowserRouter>
    <UserContext.Provider value={{currentUser: null}} >
      render(<LunchList reviews={{}} />);
    </UserContext.Provider>
  </BrowserRouter>    
});

// Snapshot test
it('should match snapshot', () => {
  const {asFragment} = render(
    <BrowserRouter>
      <UserContext.Provider value={{currentUser: null}}>
        <LunchList />
      </UserContext.Provider>
    </BrowserRouter>
  );
  expect(asFragment).toMatchSnapshot()
});