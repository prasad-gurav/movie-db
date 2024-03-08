import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
export default function WatchListPage() {
    const watchlist = useSelector((state) => state.movie.watchlist)
    return (
        <div className='h-[90vh] text-white'>
            <div className='flex flex-warp justify-center gap-4 m-2 p-2'>
                {
                    watchlist.length > 0 ?
                        watchlist.map(movie => (
                            <Link className='w-60' to={`/movie/${movie.id}`} >
                                <div className="">
                                    <img src={`https://image.tmdb.org/t/p/original${movie && movie.movie_poster}`} />
                                </div>
                                <div className="">
                                    <div className="text-xl">{movie ? movie.movie_name : ""}</div>

                                </div>
                            </Link>
                        ))
                        :
                        <>
                            <Link className='px-2 py-1 text-md bg-red-500 text-black rounded-md' to={'/'}>Add Some To Watchlist</Link>
                        </>
                }
            </div>
        </div>
    )
}
