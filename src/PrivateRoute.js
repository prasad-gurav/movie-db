import { useSelector } from 'react-redux'
import { Navigate,Outlet } from 'react-router-dom';
import { getToken } from './services/LocalStorageService';
const PrivateRoute = () => {
    let { access_token } = getToken()
    let token = useSelector((state) => state.auth)
    return access_token !== null ? <Outlet/> : <Navigate to='/login'/>;
}

export default PrivateRoute;