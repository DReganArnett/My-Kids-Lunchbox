import React from 'react';
import {render} from '@testing-library/react';
import Alert from '../common/Alert';

// Smoke test
it('renders without crashing', function() {
  render(<Alert />);
});

// Snapshot test
it('should match snapshot', () => {
  const {asFragment} = render(<Alert />);
  expect(asFragment).toMatchSnapshot()
});