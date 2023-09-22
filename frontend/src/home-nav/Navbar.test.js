import React from 'react';
import { BrowserRouter as Router} from 'react-router-dom';
import {render, screen} from '@testing-library/react';
import UserContext from '../users/UserContext';
import Navbar from '../home-nav/Navbar';


jest.mock('../users/UserContext');

// Smoke test
it('should render without crashing', function() {
  const mockContext = {
    currentUser: {username: "testuser1"},
    logout: jest.fn()
  };  

  UserContext._currentValue = mockContext;

  render(
    <Router>
      <Navbar />
    </Router>
  );
});

// Snapshot test
it('should match snapshot', () => {
  const mockContext = {
    currentUser: {username: "testuser1"},
    logout: jest.fn()
  };

  UserContext._currentValue = mockContext;

  const {asFragment} = render(
    <Router>
      <Navbar />
    </Router>
  );

  expect(asFragment()).toMatchSnapshot();
});

