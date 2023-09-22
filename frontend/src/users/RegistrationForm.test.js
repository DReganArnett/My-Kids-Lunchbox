import React from 'react';
import {render} from '@testing-library/react';
import RegistrationForm from '../users/RegistrationForm';

// Smoke test
it('should render without crashing', function() {
  render(<RegistrationForm />);
});

// Snapshot test
it('should match snapshot', () => {
  const {asFragment} = render(<RegistrationForm />);
  expect(asFragment).toMatchSnapshot()
});