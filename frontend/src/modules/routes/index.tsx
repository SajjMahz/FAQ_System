import { useEffect, useState } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Login from "../auth/Login";
import NewUser from "../auth/NewUser";
import { isToken } from "../plugins/http";
import HomeRoute from "./HomeRoute";

const MainRoute = () => {
    const [isLoggedIn,setIsLoggedIn] = useState<boolean>(isToken());
    const route = useLocation().pathname;

  useEffect(()=>{
    setIsLoggedIn(isToken());
  },[route]);

    return (
        <Routes>
            <Route path="/auth" element={!isLoggedIn? <Login/> : <Navigate to='/'/> } />
            <Route path="/*" element={isLoggedIn? <HomeRoute/> : <Navigate to='/auth'/> } />
            <Route path='/new-user' element={<NewUser />} />
        </Routes>
    )
}

export default MainRoute