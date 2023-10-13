import { useContext } from "react"
import { UserContext } from "../context/userContext"
import { Navigate, Outlet } from "react-router-dom"
import { PRIVATE_OPTION } from "../const/dataConst"

export const PrivateRoutes = ( {children = null, redirectTo = "/", option = PRIVATE_OPTION.onlyLogged} ) => {
    const { userOnline } = useContext(UserContext);

    if(option === PRIVATE_OPTION.onlyLogged && !userOnline.online){
        return <Navigate to={redirectTo} />
    }
    
    if(option === PRIVATE_OPTION.onlyNotLogged && userOnline.online){
        return <Navigate to={redirectTo} />
    } 
    
    if((option === PRIVATE_OPTION.onlyAdmin && userOnline.role === "user") || 
       (option === PRIVATE_OPTION.onlyAdmin && !userOnline.online)){
        return <Navigate to={redirectTo} />
    }

    return children ? children : <Outlet />;
}