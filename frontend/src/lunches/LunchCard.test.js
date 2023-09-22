import React from 'react';
import {render} from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import UserContext from '../users/UserContext';
import LunchCard from '../lunches/LunchCard';

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

const lunch = {
                id: 1,
                title: "title",
                description: "description",
                specialDietaryFeatures: "none",
                protein: "protein",
                carb: "carb",
                fruit: "fruit",
                vegetable: "vegetable",
                fat: "fat",
                sweet: "sweet",
                beverage: "beverage"
              }

const reviews = {
                id: 1,
                reviewText: 'delicous',
                lunchId: 1,
                username: "testuser1"
              }
              
const userFavoriteIds = new Set([1,2])

// Smoke test
it('should render without crashing', function() {
  render(
    <BrowserRouter>
      <UserContext.Provider value={{currentUser:user, userFavoriteIds:userFavoriteIds, setUserFavoriteIds:jest.fn(), addFavorite:jest.fn(), removeFavorite:jest.fn() }}>
        <LunchCard lunch={lunch} reviews={reviews} userFavoriteIds={userFavoriteIds} />
      </UserContext.Provider>
    </BrowserRouter>
  );  
});

// Snapshot test
it('should match snapshot', () => {
  const {asFragment} = render(
    <BrowserRouter>
      <UserContext.Provider value={{currentUser:user, userFavoriteIds:userFavoriteIds, setUserFavoriteIds:jest.fn(), addFavorite:jest.fn(), removeFavorite:jest.fn() }}>
        <LunchCard lunch={lunch} reviews={reviews} userFavoriteIds={userFavoriteIds} />
      </UserContext.Provider>
    </BrowserRouter>
  );
  expect(asFragment()).toMatchSnapshot()
});