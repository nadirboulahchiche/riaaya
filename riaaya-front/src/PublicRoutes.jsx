import { AuthContext } from "./Context/AuthContext";
import { useContext } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";


const PublicRoute = () => {
    const location = useLocation();
    const { isLoggedIn } = useContext(AuthContext);
    return !isLoggedIn ? <Outlet /> : <Navigate to="/dashboard/" replace state={{ from: location }} />
};

export default PublicRoute;