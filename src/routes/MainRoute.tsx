import { Routes, Route } from "react-router-dom";
import { HomePage } from "../pages/HomePage";
import { AboutPage } from "../pages/AboutPage";
import { MainNav } from "../components/MainNav";
import { Login } from "../pages/register/Login";
import { Register } from "../pages/register/Register";
import { Error404 } from "./Error404";
import { TermsConditions } from "../pages/register/TermsConditions";
import { RecoverPassword } from "../pages/register/RecoverPassword";
import { UserProfile } from "../pages/UserProfile";
import { RoutesNotAllowedWithUserOn } from "./PrivateRoutes";
import { RoutesAllowedWithUserOn } from "./PrivateRoutes";

export const MainRoute = () => {
    return (
        <div>
            <MainNav />

            <Routes>
                <Route path="/" element={<HomePage />}></Route>
                <Route path="/about" element={<AboutPage />}></Route>
                <Route element={<RoutesNotAllowedWithUserOn />}>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                </Route>
                <Route element={<RoutesAllowedWithUserOn />}>
                    <Route path="/userprofile" element={<UserProfile />} />             
                </Route>
                <Route path="/terms" element={<TermsConditions />}></Route>
                <Route path="/recoverpassword" element={<RecoverPassword />}></Route> 
                <Route path="/*" element={<Error404 />}></Route>
            </Routes>
        </div>
    )
}