import React, {useContext, useState, useEffect} from "react";
import UserFavoriteCardList from "./UserFavoriteCardList";
import UserContext from "../users/UserContext";
import Header from "../common/Header";

const UserFavoritesList = () => {
    const {currentUser, isFavorited, userFavoriteIds, removeFavorite, setUserFavoriteIds} = useContext(UserContext);
    
    
    // console.log("userFavoriteIds: ", userFavoriteIds);
    // console.log("currentUser: ", currentUser);
    
    let favoriteIdsArr = [...userFavoriteIds];
    // console.log("favoriteIdsArr: ", favoriteIdsArr);

    return (
        <div className='UserFavoritesList'>
            <div>
                <Header />
                <br></br>
                <br></br>
                <h1 className="UserFavoritesList-header"> {currentUser.firstName|| currentUser.username}'s Favorite Lunches:</h1>
                {favoriteIdsArr.length 
                    ? <UserFavoriteCardList key={userFavoriteIds} 
                                            userFavoriteIds={userFavoriteIds} 
                                            favoriteIdsArr={favoriteIdsArr} 
                                            removeFavorite={removeFavorite} 
                                            isFavorited={isFavorited} 
                                            setUserFavoriteIds={setUserFavoriteIds}
                        /> 
                    : <p className="UserFavoritesList-emptyMessage">Your Favorites List is Empty</p>          
                } 
            </div>
        </div>
    );
}

export default UserFavoritesList;