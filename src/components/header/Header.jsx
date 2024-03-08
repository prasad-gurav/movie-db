import React, { useEffect,useState } from "react"
import "./Header.css"
import { Link, useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import Profile from "./Profile"
import { unSetUserToken } from '../../features/authSlice'
import { removeToken } from '../../services/LocalStorageService'
import { IoIosSearch } from "react-icons/io";
import { setUserInfo, unsetUserInfo } from "../../features/userSlice"

const Header = () => {
    const navigate = useNavigate()
    const token = useSelector(state => state.auth.access_token)
    const user = useSelector((state) => state.user)
    const [query,SetQeury] = useState('')
    useEffect(() => {
        console.log('user', user)
    }, [user])
    const dispatch = useDispatch()

    const logOut = () => {
        console.log('log Out')
        dispatch(unSetUserToken({ value: null }))
        dispatch(removeToken)
        dispatch(unsetUserInfo())
        navigate('/login')
    }
    const searchQuery = () =>{
        const searchQuery = query.replace(' ','+')
        console.log(searchQuery)
        navigate(`/search/${searchQuery}`)
    }
    return (
        <div className="header">
            <div className="headerLeft">
                <Link to="/">
                    <h2 className="text-2xl text-white bg-black px-2 py-1 rounded-md">BeWatcher</h2>
                </Link>
                {token &&
                    <>
                        <div className="hidden md:flex">
                            <Link to="/movies/popular" style={{ textDecoration: "none" }}><span>Popular</span></Link>
                            <Link to="/movies/top_rated" style={{ textDecoration: "none" }}><span>Top Rated</span></Link>
                            <Link to="/movies/upcoming" style={{ textDecoration: "none" }}><span>Upcoming</span></Link>
                            <Link to="/watchlist" style={{ textDecoration: "none" }}><span>Watchlist</span></Link>
                            <Link to="/favourites" style={{ textDecoration: "none" }}><span>Favorites</span></Link>
                            <div id="serach-box" className='bg-white  w-[300px] h-[35px] flex items-center justify-between px-4'>
                                <input onChange={(e)=>SetQeury(e.target.value)} type="text" className='px-2 w-[250px] h-[35px] text-lg font-poppins' name="" id="" placeholder='Search' />
                                <IoIosSearch onClick={searchQuery} className='text-2xl' />
                            </div>
                        </div>
                    </>
                }

            </div>
            {token && user.username !== null && (
                <Profile usr={user} logOut={logOut} />
            )}
        </div>
    )
}

export default Header