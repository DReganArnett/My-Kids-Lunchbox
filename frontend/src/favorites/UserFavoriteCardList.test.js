import React from 'react';
import {render} from '@testing-library/react';
import UserFavoriteCardList from '../favorites/UserFavoriteCardList';

// Smoke test
it('should render without crashing', function() {
  render(<UserFavoriteCardList favoriteIdsArr={[]}  removeFavorite={{}} isFavorited={false} />);
});

// Snapshot test
it('should match snapshot', () => {
  const {asFragment} = render(<UserFavoriteCardList favoriteIdsArr={[]}  removeFavorite={{}} isFavorited={false} />);
  expect(asFragment).toMatchSnapshot()
});