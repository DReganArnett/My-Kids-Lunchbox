import React from 'react';
import {render} from '@testing-library/react';
import AddLunchForm from '../lunches/AddLunchForm';

// Smoke test
it('shouldrender without crashing', function() {
  render(<AddLunchForm />);
});

// Snapshot test
it('should match snapshot', () => {
  const {asFragment} = render(<AddLunchForm />);
  expect(asFragment).toMatchSnapshot()
});