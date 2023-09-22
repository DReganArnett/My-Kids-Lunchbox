import React from 'react';
import FavoriteCard from './FavoriteCard';


const UserFavoriteCardList= ({favoriteIdsArr, removeFavorite, isFavorited, userFavoriteIds, setUserFavoriteIds}) => {
    return (
        <div className='UserFavoriteCardList'>
            {favoriteIdsArr.map((userFavoriteId) => (
                <div>
                    <FavoriteCard   key={userFavoriteId} 
                                    userFavoriteId={userFavoriteId} 
                                    removeFavorite={removeFavorite} 
                                    isFavorited={isFavorited}
                                    userFavoriteIds={userFavoriteIds} 
                                    setUserFavoriteIds={setUserFavoriteIds}
                    />
                </div>
            ))}
        </div>
    );
}

export default UserFavoriteCardList;