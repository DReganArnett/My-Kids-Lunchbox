import React from 'react';
import {render} from '@testing-library/react';
import LoginForm from '../users/LoginForm';

// Smoke test
it('should render without crashing', function() {
  render(<LoginForm />);
});

// Snapshot test
it('should match snapshot', () => {
  const {asFragment} = render(<LoginForm />);
  expect(asFragment).toMatchSnapshot()
});