
import { Navigate, Outlet } from "react-router-dom"
import useAuthStatus from "../hooks/useAuthStatus"
import Loader from "./Loader"

const PrivateComponent = ()=>{

    const {userExist,checkingUser}= useAuthStatus()

    if(checkingUser){
        return(
            <Loader />
        )
    } 
    return userExist ? <Outlet/> : <Navigate to={"/login"}/>
}

export default PrivateComponent