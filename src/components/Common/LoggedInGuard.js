import { authContext } from "../../contexts/authContext";
import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";

const LoggedInGuard = () => {
    const { isAuthenticated } = useContext(authContext);
    
    if (isAuthenticated) {
        return <Navigate to="/" replace/>;
    }

 
    return <Outlet />;
}

export default LoggedInGuard;