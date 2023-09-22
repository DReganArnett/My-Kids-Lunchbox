import React, {useState, useEffect, useContext} from 'react';
import MklApi from '../api';
import UserContext from '../users/UserContext';
import {VscHeartFilled} from "react-icons/vsc";


const FavoriteCard = ({userFavoriteId, removeFavorite, userFavoriteIds, setUserFavoriteIds}) => {
    const [lunch, setLunch] = useState([]);
    const [heartFilled, setHeartFilled] = useState(userFavoriteIds.has(userFavoriteId));
    
    
    useEffect(() => {
        async function getLunch() {
            let lunchRes = await MklApi.getLunch(userFavoriteId);
            setLunch(lunchRes);
        }
        getLunch();
    }, [userFavoriteId])
    
    

    async function handleRemoveFavorite(evt) {
        removeFavorite(lunch.id);
        userFavoriteIds.delete(lunch.id)
        setUserFavoriteIds(new Set([...userFavoriteIds]));
        setHeartFilled(false);
    }
    
   // console.log("favorited: ", favorited)
   // console.log("isFavorited: ", isFavorited)
    
   return (
        <div>
            {heartFilled ?
                <div className='FavoriteCard' >
                    <p>
                        <b>{`${lunch.title}`} </b>
                        <VscHeartFilled onClick={handleRemoveFavorite} />
                    </p>
                    <p>{`${lunch.description}`}</p>   
                </div>
            :
            null}
        </div>
    );
}

export default FavoriteCard;