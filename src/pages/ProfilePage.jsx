import React from 'react'
import { useSelector } from 'react-redux'
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
export default function ProfilePage() {
    const backendUrl = process.env.REACT_APP_API_URL;
    const token = useSelector((state) => state.auth.access_token)
    const [userData, setUserData] = useState(null)

    const getMyProfile = async () => {
        let response = await fetch(`${backendUrl}/myaccount/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + token
            },
        })
        let data = await response.json()
        if (response.status == 200) {
            setUserData(data)
        }
    }
    useEffect(() => {
        getMyProfile()
        console.log(userData)
    }, [])

    return (
        <div className='text-white  h-[90vh]'>
            <div className="profile flex flex-col justify-center items-center h-full">
                {userData !== null ?
                    <>
                        <div className='flex flex-col items-center text-xl gap-4'>
                        <img  className="w-28" src={`https://psgurav.in${userData.profile_pic}`} alt="profile-img" />
                            <h2>Name : {userData.first_name} {userData.last_name}</h2>
                            <h2>Email : {userData.email}</h2>
                            <h2>Phone : {userData.phone}</h2>
                        </div>
                        <div className='flex gap-4'>
                            <Link to={'/watchlist'} className='rounded-md bg-red-500 px-2 py-1 text-xl my-4'>Watchlist</Link>
                            <Link to={'/favourites'} className='rounded-md bg-yellow-500 px-2 py-1 text-xl my-4'>Favourites</Link>
                        </div>
                    </> : <></>}
            </div>
        </div>
    )
}
