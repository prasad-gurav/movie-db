import React, { useState, useEffect } from 'react'
import { Circles } from 'react-loader-spinner';
import { Link, useNavigate } from 'react-router-dom';
import { getCsrfToken } from '../services/csrfToken';

import axios from 'axios';
import { useSelector } from 'react-redux';

export default function SingupPage() {

    const user = useSelector((state) => state)

    const csrfToken = getCsrfToken()
    const navigate = useNavigate();
    const backendUrl = process.env.REACT_APP_API_URL;
    const [signupWait, setSignupWait] = useState(false)
    const [signupResponse, setSignupResponse] = useState()
    const [signupErrorResponse, setSignupErrorResponse] = useState(null)
    const [errorBox, setErrorBox] = useState(null)

    let signupUser = async (e) => {
        e.preventDefault();
        setSignupWait(true)
        const actualData = {
            username: e.target.username.value,
            first_name: e.target.first_name.value,
            last_name: e.target.last_name.value,
            dob: e.target.dob.value,
            gender: e.target.gender.value,
            profile_pic: e.target.image.files[0],
            email: e.target.email.value,
            phone: e.target.phone.value,
            password: e.target.password.value,
            c_password: e.target.confirm_passowrd.value,
            account_num: "000"
        }
        if (actualData.password !== actualData.c_password) {
            setSignupWait(false)
            console.log('Password and Confirm Password dosent match')
            setSignupErrorResponse([{ "password": 'Password and Confirm Password dosent match' }])
        }
        else {
            try {
                const signup = await axios({
                    method: 'POST',
                    url: `${backendUrl}/signup/`,

                    // withCredentials: true,
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        xsrfHeaderName: 'X-CSRFToken',
                        // xsrfCookieName: 'csrftoken',
                        'X-CSRFToken': csrfToken,
                    },
                    "data": actualData
                }).then((response) => {
                    setSignupWait(false)
                    setSignupResponse(response.data)
                    console.log(response.data)
                    console.log(response)
                    if (response.status === 200) {

                        console.log("Succeed")
                        navigate('/login')

                    }
                })

            }
            catch (error) {
                console.log(error)
                setSignupWait(false)
                setSignupErrorResponse([error.response.data])
                console.log(error.response.data)
            }
        }

    }
    const handleSignupErrorBox = () => {
        setSignupErrorResponse(null)
    }
    useEffect(() => {
        if (signupErrorResponse !== null) {
            setErrorBox(signupErrorResponse)
        }
    }, [signupErrorResponse])

    useEffect(() => {
        console.log(user.username)
        if (user.username) {
            navigate('/')
        }
    }, [])

    return (
        <div className='flex items-start py-[8%] font-poppins relative '>
            <form onSubmit={signupUser} method='post' encType="multipart/form-data boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW" className="flex flex-col w-[500px] mx-auto gap-4">
                <div>
                    <h1 className='text-2xl text-white'>Create a account</h1>
                    <p className='text-white'>Join Us Today</p>
                </div>
                <input required className="rounded-md px-2 py-[4px]" type="text" name="username" id="" placeholder="Username" />
                <input required className="rounded-md px-2 py-[4px]" type="text" name="first_name" id="" placeholder="First Name" />
                <input required className="rounded-md px-2 py-[4px]" type="text" name="last_name" id="" placeholder="Last Name" />
                <input required className="rounded-md px-2 py-[4px]" type="date" name="dob" id="" />
                <select required name="gender" className="py-1 px-1 rounded-md" id="" >
                    <option value="">--</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                </select>
                <input required type="file" className='text-white' name="image" />
                <input required className="rounded-md px-2 py-[4px]" type="email" name="email" id="" placeholder="Email Address" />
                <input required className="rounded-md px-2 py-[4px]" type="tel" name="phone" id="" placeholder="Phone Number" />
                <input required className="rounded-md px-2 py-[4px]" type="password" name="password" id="" placeholder="Set your password" />
                <input required className="rounded-md px-2 py-[4px]" type="password" name="confirm_passowrd" id="" placeholder="Confirm password" />

                {signupWait ? <div className='flex justify-center'>
                    <Circles
                        height="30"
                        width="30"
                        color="#4fa94d"
                        ariaLabel="circles-loading"
                        wrapperStyle={{}}
                        wrapperClass=""
                        visible={true}
                    />
                </div> : <button className='bg-slate-900 text-white py-1 rounded-md'>Sign Up</button>}
                {signupResponse && signupResponse['detail'] && <><h2 className='text-red-500 font-lato text-sm'>Something went wrong! check your credintials</h2></>}
                <p className='text-sm text-center text-white'>Already have an account? <Link className='underline' to="/login">Login</Link></p>
            </form>

            {signupErrorResponse !== null ? <>

                <div id='erroBox' className='absolute bg-white w-[500px] h-[500px] left-[35%]' >
                    <button className='hover:bg-orange p-2' onClick={handleSignupErrorBox} >
                        <img width="30" height="30" src="https://img.icons8.com/ios/50/delete-sign--v1.png" alt="delete-sign--v1" />
                    </button>
                    <div className='flex flex-col items-start px-6 gap-2'>
                        {signupErrorResponse.map((ele) => {
                            return Object.entries(ele).map(([key, value], i) => {
                                return (
                                    <><li className='text-red-500'>{key} : {value}</li></>
                                )
                            })
                        })
                        }
                    </div>
                </div>
            </> : <></>}
        </div>
    )
}
