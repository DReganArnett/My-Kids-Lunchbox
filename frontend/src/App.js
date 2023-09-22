import React, {useState, useEffect} from 'react';
import {BrowserRouter} from 'react-router-dom';
import Navbar from './home-nav/Navbar';
import Routes from './routes/Routes'
import useLocalStorage from './UseLocalStorage';
import MklApi from './api';
import UserContext from './users/UserContext';
import jwt_decode from 'jwt-decode';
import "./App.css"

export const TOKEN_STORAGE_ID = "mkl-token";

function App() {
  const [userLoaded, setUserLoaded] = useState(false);
  const [token, setToken] = useLocalStorage(TOKEN_STORAGE_ID);
  const [currentUser, setCurrentUser] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [reviewIds, setReviewIds] = useState([]);
  const [reviewed, setReviewed] = useState(false);
  const [lunches, setLunches] = useState([]);
  const [userFavoriteIds, setUserFavoriteIds] = useState(new Set([]));
  const [reviewUpdated, setReviewUpdated] = useState(false);
  
  useEffect(() => {
    async function getCurrentUser() {
      if (token) {
        try {
          let {username} = jwt_decode(token);
          MklApi.token = token;
          console.log(token)
          const currentUserRes = await MklApi.getUser(username);
          setCurrentUser(currentUserRes);
          setUserFavoriteIds(new Set(currentUserRes.favorites));
        } catch (error) {
          console.error('App loadUser: problem loading', error)
          setCurrentUser(null)
        }
      }
      setUserLoaded(true);
    }
    setUserLoaded(false);
    getCurrentUser()
  }, [token]);

  useEffect(function getAllLunches () {
    async function search(title) {
        let lunches = await MklApi.getAllLunches(title);
        setLunches(lunches);
    };
    search()
  }, []);


  useEffect(() => {
    async function getAllReviews() {
        let reviewsRes = await MklApi.getAllReviews();
        setReviews(reviewsRes);
    }
    getAllReviews()
  }, []);
  
  // Handles user logout
  function logout() {
    setCurrentUser(null);
    setToken(null);
  }

  // Handles user sign up
  async function registerUser(data) {
    try {
      let token = await MklApi.registerUser(data);
      setToken(token);
      return {success: true};
    } catch (errors) {
      console.error("signup failed", errors);
      return {success: false, errors}
    }
  }

  async function loginUser(data) {
    try {
      let token = await MklApi.loginUser(data);
      setToken(token);
      return {success: true};
    } catch (errors) {
      console.error("login failed", errors); 
      return {success: false, errors};
    }
  }

  // Handles adding a lunch to db
  async function addLunch(data) {
    try{
      let lunchRes = await MklApi.createLunch(data);
      console.log("lunchRes: ", lunchRes);
      return {success: true};
    } catch (errors) {
      console.error("lunch add failed", errors);
      return {success: false, errors};
    }
  }
  
  async function reviewLunch (data) {
    if (reviewIds.includes(data.id)) return;
    await MklApi.createReview(data);
  }

  async function removeReview(id) {
    if (!reviewIds.includes(id)) return;
    await MklApi.removeReview(id);
  }

  function addFavorite(id) {
    if (userFavoriteIds.has(id)) return;
    MklApi.addFavorite(currentUser.username, id);
  }

  function removeFavorite(id) {
    if (!userFavoriteIds.has(id)) return
    MklApi.removeFavorite(currentUser.username, id);
  }

  // console.log("reviewIds: ", reviewIds)
  // console.log("currentUser: ", currentUser);
  // console.log("userFavoriteIds: ", userFavoriteIds);
  // console.log("lunches: ", lunches);
  // console.log("reviewIds: ", reviewIds);
  // console.log("foods: ", foods);
  // console.log("id: ", id)

  return ( 
    <div className="App">
      <BrowserRouter>
        <UserContext.Provider
            value={{currentUser, 
                    setCurrentUser, 
                    userFavoriteIds, 
                    setUserFavoriteIds, 
                    addFavorite,
                    reviewIds, 
                    reviewed,
                    setReviewed,
                    setReviewIds,
                    removeFavorite, 
                    reviewLunch,
                    removeReview, 
                    reviewUpdated,
                    setReviewUpdated}}>
          <div className="App-container">
            <Navbar logout={logout} />
            <Routes 
              login={loginUser} 
              signup={registerUser} 
              addLunch={addLunch} 
              reviews={reviews}
              lunches={lunches}
            />
          </div>
        </UserContext.Provider>
      </BrowserRouter>
    </div>  
  );
}

export default App;

// useEffect(() => {
  //   async function getAllFoods(){
  //     let foodsRes = await MklApi.getAllFoods();
  //     setFoods(foodsRes);
  //   }
  //   getAllFoods();
  // }, []);
    
  // // Handles adding a food to db
  // async function addFood(data) {
  //   try {
  //     let foodRes = await MklApi.createFood(data);
  //     console.log("foodRes: ", foodRes);
  //     return {success: true}
  //   } catch (errors) {
  //     console.error("food add failed", errors);
  //     return {success: false, errors}
  //   }
  // }