import React from 'react';
import {render} from '@testing-library/react';
import LunchDetails from '../lunches/LunchDetails';

  jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useParams: () => ({
      id: '1'
    })
  }))
  
// Smoke test
it('should render without crashing', function() {
  render(
    <LunchDetails lunch={{}} id={{}} />
  );
});

// Snapshot test
it('should match snapshot', () => {
  const {asFragment} = render(
    <LunchDetails lunch={{}} id={{}} />
  );
  expect(asFragment).toMatchSnapshot()
});