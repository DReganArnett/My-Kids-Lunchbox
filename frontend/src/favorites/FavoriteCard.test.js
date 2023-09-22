import React from 'react';
import {render} from '@testing-library/react';
import FavoriteCard from '../favorites/FavoriteCard';

const userFavoriteIds = new Set([1,2])


// Smoke test
it('should render without crashing', function() {
  render(<FavoriteCard userFavoriteIds={userFavoriteIds} />);
});

// Snapshot test
it('should match snapshot', () => {
  const {asFragment} = render(<FavoriteCard userFavoriteIds={userFavoriteIds} isFavorited={false} userFavoriteId={{}} removeFavorite={{}} />);
  expect(asFragment).toMatchSnapshot()
});