import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    movies: [],
    watchlist : [],
    favourites : []
}
const backendUrl = process.env.REACT_APP_API_URL;

export const movieSlce = createSlice({
    name: 'movie_list',
    initialState,
    reducers: {
        favouritesSet :(state,action) =>{
            state.favourites = action.payload.data
            console.log('new',state.favourites)
        },
        setfavourites:(state, action) => {
            let newFav = action.payload.data
            state.favourites.push(newFav)
        },
        unSetFav : (state,action) =>{
            console.log("removing")
            state.favourites = state.favourites.filter(item => item.id !== action.payload.movieId);
        },
        watchlistSet:(state,action) =>{
            state.watchlist = action.payload.data
            console.log('new',state.watchlist)
        },
        setWatchlist : (state,action)=>{
            let newToWatch = action.payload.data
            state.watchlist.push(newToWatch)
        },
        unSetWatchList:(state,action)=>{
            state.watchlist = state.watchlist.filter(item => item.id !== action.payload.movieId);
        }
    }
})

export const { setfavourites,setWatchlist,unSetWatchList,watchlistSet,favouritesSet,unSetFav } = movieSlce.actions

export default movieSlce.reducer

export const fetchFavlist = (token) => async (dispatch)=> {
    try {
        const res = await fetch(`${backendUrl}/favourites/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + token
            },
        });
        console.log(res)
        if (res.status === 200) {
            const data = await res.json();
            console.log(data)
            dispatch(favouritesSet({data:data}));
        }
    } catch (error) {
        console.error("Error fetching watchlist:", error);
    }
}
  
export const fetchWatchlist = (token) => async (dispatch) => {
    console.log("fetching Movies")
    try {
        const res = await fetch(`${backendUrl}/watchlist/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + token
            },
        });
        console.log(res)
        if (res.status === 200) {
            const data = await res.json();
            console.log(data)
            dispatch(watchlistSet({data:data}));
        }
    } catch (error) {
        console.error("Error fetching watchlist:", error);
    }
};
