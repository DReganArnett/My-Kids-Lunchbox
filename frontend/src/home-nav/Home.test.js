import React from 'react';
import {render} from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Home from '../home-nav/Home';
import UserContext from '../users/UserContext';
                      
// Smoke test
it('should render without crashing', function() {
  render(
    <BrowserRouter>
      <UserContext.Provider value={{currentUser: null, setCurrentUser: jest.fn(), logout: jest.fn()}} >
        <Home />
      </UserContext.Provider>
    </BrowserRouter>  
  );
});

// Snapshot test
it('should match snapshot', () => {
  const {asFragment} = render(
    <BrowserRouter>
      <UserContext.Provider value={{username: null, setCurrentUser: jest.fn(), logout: jest.fn()}} >
        <Home />
      </UserContext.Provider>  
    </BrowserRouter>
  );
  expect(asFragment).toMatchSnapshot()
});