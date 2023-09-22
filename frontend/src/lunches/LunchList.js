import React, {useState, useEffect} from 'react';
import {Redirect} from 'react-router-dom';
import MklApi from '../api';
import SearchForm from '../common/SearchForm';
import LunchCard from './LunchCard';
import Header from '../common/Header';

const LunchList = ({reviews}) => {
    const [lunches, setLunches] = useState([]);

    async function search(title) {
        let lunches = await MklApi.getAllLunches(title);
        setLunches(lunches);
    };

    useEffect (function getAllLunches() {
        search();
    }, []);

    // console.log("id: ", id);
    // console.log("lunches: ", lunches);
    // console.log("reviews: ", reviews);
    // console.log("favorites: ", favorites);
    // console.log("userFavorites: ", userFavorites);

    
    if (!lunches) <Redirect to="/"></Redirect>

    return (
        <div className='LunchList'>
            <Header />
            <br></br>
            <br></br>
            <h1 className='LunchList-header'>Lunches:</h1>
            <SearchForm searchTerm={search} />
            <br></br>
            <br></br>
            {lunches.length
                ? (
                    <div className='LunchList-lunches'>
                        {lunches.map((lunch) => (
                            <LunchCard  key={lunch.id} 
                                        lunch={lunch}
                                        title={lunch.title} 
                                        description={lunch.description}
                                        specialDietaryFeatures={lunch.specialDietaryFeatures}
                                        reviews={reviews} 
                            />
                        ))}
                    </div> 
                ) : (
                    <p className='LunchList-emptySearchResults'>Sorry, no lunches with that search term found.</p>
            )}         
        </div>
    );
}

export default LunchList;


    // useEffect (function getByDiet() {
    //     searchDiet()
    // }, []);

// async function searchDiet(diet) {
    //     let res = await MklApi.getByDiet(diet);
    //     setLunches(res)    
    // }