import React, {useContext,useState, useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { Circles } from 'react-loader-spinner'
import { setUserToken } from '../features/authSlice';
import { getToken, storeToken } from '../services/LocalStorageService';
import { useLoginUserMutation } from '../services/userAuthApi';
import { useDispatch } from 'react-redux';

import { jwtDecode } from "jwt-decode";
import { setUserInfo } from '../features/userSlice';



export default function LoginPage() {
    const backendUrl = process.env.REACT_APP_API_URL;

    const [server_error, setServerError] = useState()
    const navigate = useNavigate();
    const dispatch = useDispatch()

    const handleSubmit = async (e) => {
      e.preventDefault();
      let username = e.target.username.value;
      let password = e.target.password.value;

      let res = await fetch(`${backendUrl}/login/`, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 'username': username, 'password': password })

      })
      let data = await res.json()
      if(res.status === 401){
      }
      if (res.error) {
        setServerError(res.error.data.errors)
      }
      if (res.status === 200) {
        console.log(data)
        storeToken(data)
        let { access_token } = getToken()
        dispatch(setUserToken({ access_token: access_token }))
        const userData = jwtDecode(access_token)
        console.log(userData)
        dispatch(setUserInfo({username:userData.username,user_id:userData.user_id}))
        navigate('/')
      }
      else{
        console.log(data)
        setServerError(data.detail)
      }
    }

  
  return (
    <div className='bg-[#eee9e6] flex items-center py-[10%] font-poppins h-[100vh]'>
        <form onSubmit={handleSubmit} method='post' encType="multipart/form-data" className="flex flex-col w-[400px] mx-auto gap-5 py-10">
            <div>
            <h1 className='text-2xl text-black '>Log In</h1>
            <p >Welcome back, Please enter your details</p>
            </div>
            <input required className="rounded-md px-2 py-[4px]" type="text" name="username" id="" placeholder="Username"/>
            <input required className="rounded-md px-2 py-[4px]" type="password" name="password" id="" placeholder="Set your password"/>
            <div className='text-sm flex items-center justify-between'>
                <div className='flex items-center gap-2'>
                    <input type="checkbox" name="" id="" />
                    <p>Remember for 30 days</p>
                </div>
                <Link >Forget Password</Link>
            </div>
            {/* {loginwWait ? <div className='flex justify-center'>
          <Circles
            height="30"
            width="30"
            color="#4fa94d"
            ariaLabel="circles-loading"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          />
        </div> :  <button  className='bg-slate-900 text-white py-1 rounded-md'>Log In</button>} */}
           
            {/* {loginResponse && loginResponse['detail'] && <><h2 className='text-red-500 font-lato text-sm'>Something went wrong! check your credintials</h2></>} */}
            <button className='bg-slate-900 text-white py-1 rounded-md'>Log In</button>
            {server_error && <><h4 className='text-red-500'>{server_error}</h4></>}
            <p className='text-sm text-center'>Don't have an account? <Link className='underline' to="/signup">Signup</Link></p>
        </form>
    </div>
  )
}
