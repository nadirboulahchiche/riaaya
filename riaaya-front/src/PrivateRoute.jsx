import { useContext } from 'react';
import { AuthContext } from './Context/AuthContext';
import { Navigate, Outlet, useLocation } from "react-router-dom";

const PrivateRoute = ({ children }) => {
    const location = useLocation();
    const { isLoggedIn } = useContext(AuthContext);
    return isLoggedIn ? children : <Navigate to="/login" replace state={{ from: location }} />
};

export default PrivateRoute;



