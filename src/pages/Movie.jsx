import React, { useEffect, useState } from "react"
import "./style/movie.css"
import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { setfavourites, setWatchlist, unSetWatchList, unSetFav } from '../features/moveiSlice'

import axios from "axios"

const Movie = () => {
    const backendUrl = process.env.REACT_APP_API_URL;
    const dispatch = useDispatch()
    const authTokens = useSelector((state) => state.auth.access_token)
    const watchlist = useSelector((state) => state.movie.watchlist)
    const favourites = useSelector((state) => state.movie.favourites)

    const user = useSelector((state) => state.user)
    console.log(user)
    const [currentMovieDetail, setMovie] = useState()
    const { id } = useParams()

    useEffect(() => {
        console.log(watchlist)
        console.log("favList ", favourites)
    }, [watchlist, favourites])

    useEffect(() => {
        getData()
        window.scrollTo(0, 0)
    }, [])

    const addtoWatchList = async () => {
        let data = { 'id': id, 'username': user.user_id, 'movie_id': id, 'movie_name': currentMovieDetail.original_title, 'movie_poster': currentMovieDetail.poster_path }
        console.log(data)

        let res = await axios(`${backendUrl}/watchlist/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + authTokens
            },
            "data": JSON.stringify(data)

        })
        console.log(res)
        if (res.status == 201) {
            dispatch(setWatchlist({ data: data }))
        }
    }
    const removeWatchList = async () => {
        const res = await axios.delete(`${backendUrl}/watchlist/${id}/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + authTokens
            }
        });
        console.log(res)
        if (res.status == 204) {
            dispatch(unSetWatchList({ movieId: id }))
            console.log(watchlist)
        }
    }


    const addtoFavList = async () => {
        let data = { 'id': id, 'username': user.user_id, 'movie_id': id, 'movie_name': currentMovieDetail.original_title, 'movie_poster': currentMovieDetail.poster_path }
        console.log(data)
        let res = await axios(`${backendUrl}/favourites/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + authTokens
            },
            "data": JSON.stringify(data)

        })

        console.log(res)
        if (res.status == 201) {
            dispatch(setfavourites({ data: data }))
        }
    }

    const removFavList = async () => {
        console.log('Removing Movie From Fav List')
        const res = await axios.delete(`${backendUrl}/favourites/${id}/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + authTokens
            }
        });
        console.log(res)
        if (res.status == 204) {
            dispatch(unSetFav({ movieId: id }))
            console.log(favourites)
        }
    }
    const getData = () => {
        fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US`)
            .then(res => res.json())
            .then(data => setMovie(data))
    }

    return (
        <div className="movie h-full">
            <div className="movie__intro">
                <img className="movie__backdrop" src={`https://image.tmdb.org/t/p/original${currentMovieDetail ? currentMovieDetail.backdrop_path : ""}`} />
            </div>
            <div className="movie__detail">
                <div className="movie__detailLeft">
                    <div className="movie__posterBox">
                        <img className="movie__poster" src={`https://image.tmdb.org/t/p/original${currentMovieDetail ? currentMovieDetail.poster_path : ""}`} />
                    </div>
                </div>
                <div className="movie__detailRight">
                    <div className="movie__detailRightTop">
                        <div className="movie__name">{currentMovieDetail ? currentMovieDetail.original_title : ""}</div>
                        <div className="movie__tagline">{currentMovieDetail ? currentMovieDetail.tagline : ""}</div>
                        <div className="movie__rating">
                            {currentMovieDetail ? currentMovieDetail.vote_average : ""} <i class="fas fa-star" />
                            <span className="movie__voteCount">{currentMovieDetail ? "(" + currentMovieDetail.vote_count + ") votes" : ""}</span>
                        </div>
                        <div className="movie__runtime">{currentMovieDetail ? currentMovieDetail.runtime + " mins" : ""}</div>
                        <div className="movie__releaseDate">{currentMovieDetail ? "Release date: " + currentMovieDetail.release_date : ""}</div>
                        <div className="movie__genres">
                            {
                                currentMovieDetail && currentMovieDetail.genres
                                    ?
                                    currentMovieDetail.genres.map(genre => (
                                        <><span className="movie__genre" id={genre.id}>{genre.name}</span></>
                                    ))
                                    :
                                    ""
                            }
                        </div>
                    </div>
                    <div className="movie__detailRightBottom">
                        <div className="synopsisText">Synopsis</div>
                        <div>{currentMovieDetail ? currentMovieDetail.overview : ""}</div>
                    </div>

                </div>
            </div>
            <div className="movie__links">

                {watchlist.length === 0 ? (
                    <button onClick={addtoWatchList} target="_blank" style={{ textDecoration: "none" }}>
                        <p><span className="movie__homeButton movie__Button">Add to WatchList <i className="newTab fas fa-external-link-alt"></i></span></p>
                    </button>
                ) : (
                    watchlist.some((item) => item.movie_id === id) ? (
                        <button className="movie__homeButton movie__Button" onClick={removeWatchList}>Remove From WatchList</button>
                    ) : (
                        <button onClick={addtoWatchList} target="_blank" style={{ textDecoration: "none" }}>
                            <p><span className="movie__homeButton movie__Button">Add to WatchList <i className="newTab fas fa-external-link-alt"></i></span></p>
                        </button>
                    )
                )}

                {favourites.length === 0 ? (
                    <button onClick={addtoFavList} target="_blank" style={{ textDecoration: "none" }}>
                        <p><span className="movie__imdbButton movie__Button">Add to Favourites  <i className="newTab fas fa-external-link-alt"></i></span></p>
                    </button>
                ) : (
                    favourites.some((item) => item.movie_id === id) ? (
                        <button className="movie__imdbButton movie__Button" onClick={removFavList}>Remove From Favourites</button>
                    ) : (
                        <button onClick={addtoFavList} target="_blank" style={{ textDecoration: "none" }}>
                            <p><span className="movie__imdbButton movie__Button">Add to WatchList <i className="newTab fas fa-external-link-alt"></i></span></p>
                        </button>
                    )
                )}
            </div>
            <div className="movie__heading">Production companies</div>
            <div className="movie__production">
                {
                    currentMovieDetail && currentMovieDetail.production_companies && currentMovieDetail.production_companies.map(company => (
                        <>
                            {
                                company.logo_path
                                &&
                                <span className="productionCompanyImage">
                                    <img className="movie__productionComapany" src={"https://image.tmdb.org/t/p/original" + company.logo_path} />
                                    <span>{company.name}</span>
                                </span>
                            }
                        </>
                    ))
                }
            </div>
        </div>
    )
}

export default Movie