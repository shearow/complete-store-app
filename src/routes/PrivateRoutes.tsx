import { Navigate, Outlet } from "react-router-dom"
import { UserContext } from "../context/userContext"
import { useContext } from "react"

export const RoutesNotAllowedWithUserOn = ( {children = null, redirectTo = "/"} ) => {
    const { userOnline } = useContext(UserContext);

    if(userOnline.online){
        return <Navigate to={redirectTo} />
    }

    return children ? children : <Outlet />;
}

export const RoutesAllowedWithUserOn = ( {children = null, redirectTo = "/"} ) => {
    const { userOnline } = useContext(UserContext);

    if(!userOnline.online){
        return <Navigate to={redirectTo} />
    }

    return children ? children : <Outlet />;
}