import React, {useState, useEffect} from "react";
import FavoriteCard from "../users/FavoriteCard";
import MklApi from "../api";


const Favorites = () => {
    const [lunches, setLunches] = useState([]);
    
    useEffect(() => {
        async function getLunches() {
            let lunchesRes = await MklApi.getAllLunches();
            setLunches(lunchesRes);
        }
        getLunches()
    }, [])

    console.log("lunches: ", lunches)

    let favoriteLunches = [];
    
    useEffect(() => {
        const getFavoriteLunches = (lunches) => {
            for(let lunch of lunches) {
                if(lunch.favorite === true) {
                    favoriteLunches.push(lunch);
                }
                return favoriteLunches;
            }
        }
        getFavoriteLunches()
    }, [])
    
       
    
    console.log("favoriteLunches:", favoriteLunches)
   
    return (
        <div className='Favorites'>
            <div>
                <h2 className="Favorites-header">My Favorite Lunches</h2>
                <div className='Favorites-lunches'>
                   {favoriteLunches.map((favoriteLunch) => ( 
                        <ul>
                            <FavoriteCard
                                key={favoriteLunch.id}
                                title={favoriteLunch.title}
                                description={favoriteLunch.description}
                                protein={favoriteLunch.protein}
                                carb={favoriteLunch.carb}
                                fruit={favoriteLunch.fruit}
                                vegetable={favoriteLunch.vegetable}
                                fat={favoriteLunch.fat}
                                sweet={favoriteLunch.sweet}
                                beverage={favoriteLunch.beverage}
                                favorite={favoriteLunch.favorite}
                            />
                        </ul>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Favorites;