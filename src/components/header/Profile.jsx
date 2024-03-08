import React from 'react'
import { Link, useNavigate } from 'react-router-dom'



export default function Profile(props) {

    return (
        <div className="dropdown relative">
            <img  className="w-14" src='https://cdn3.iconfinder.com/data/icons/avatars-flat/33/man_5-1024.png' alt="profile-img" />
            <div className="dropdown-content absolute right-0">
                <h2 className="text-black cursor-pointer px-2 py-4">{props.usr.username}</h2>
                <ul>
                    <Link to={'profile'}> <li className='px-2 cursor-pointer'>Profile</li></Link>
                   <li onClick={props.logOut} className='px-2 cursor-pointer bg-orange-600 text-white'>Logout</li>
                </ul>
            </div>
        </div>
    )
}
