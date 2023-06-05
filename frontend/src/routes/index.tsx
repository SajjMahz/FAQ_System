import { useEffect, useState } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Login from "../modules/auth/Login";
import NewUser from "../modules/auth/NewUser";
import { isToken } from "../plugins/http";
import HomeRoute from "./HomeRoute";
import ForgotPassword from "../modules/auth/ForgotPassword";

const MainRoute = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(isToken());
  const route = useLocation().pathname;

  useEffect(() => {
			setIsLoggedIn(isToken());
		}, [route]);

    return (
        <Routes>
            <Route path="/auth" element={!isLoggedIn? <Login/> : <Navigate to='/'/> } />
            <Route path="/*" element={isLoggedIn? <HomeRoute/> : <Navigate to='/auth'/> } />
            <Route path='/new-user' element={<NewUser />} />
            <Route path='/forgot-password' element={<ForgotPassword />} />
        </Routes>
    )
}

export default MainRoute