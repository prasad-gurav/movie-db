import './App.css';
import { Route, Routes } from 'react-router-dom';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import PrivateRoute from './PrivateRoute';
import Home from './pages/HomePage';
import MovieList from './components/movieList/movieList';
import Header from './components/header/Header'
import Movie from './pages/Movie';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchFavlist, fetchWatchlist } from './features/moveiSlice';
import { jwtDecode } from "jwt-decode";
import { setUserInfo } from './features/userSlice';
import ProfilePage from './pages/ProfilePage';
import WatchListPage from './pages/WatchListPage';
import FavouritePage from './pages/FavouritePage';
import SearchResult from './pages/SearchResult';
import { getToken } from './services/LocalStorageService';
import { setUserToken } from './features/authSlice';


function App() {

  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.access_token)
  const { access_token } = getToken()
  console.log(access_token)

  useEffect(() => {
    if (access_token !== null) {
      const userData = jwtDecode(access_token)
      dispatch(setUserToken({access_token:access_token}))
      dispatch(setUserInfo({ username: userData.username, user_id: userData.user_id }))
      console.log("token avaialbale", token)
      dispatch(fetchWatchlist(token))
      dispatch(fetchFavlist(token))

    }
  }, [token,])

  return (
    <div className="App w-full bg-slate-900">
      <Header />
      <Routes>
        <Route path='signup' element={<SignupPage />} />
        <Route path='login' element={<LoginPage />} />
        <Route exact path='/' element={<PrivateRoute />} >
          <Route path='' element={<Home />} />
          <Route path='profile' element={<ProfilePage />} />
          <Route path='search/:query' element={<SearchResult />} />
          <Route path='watchlist' element={<WatchListPage />}/>
          <Route path='favourites' element={<FavouritePage />}/>
          <Route path="movie/:id" element={<Movie />}/>
          <Route path="movies/:type" element={<MovieList />}/>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
