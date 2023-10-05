import { Routes, Route } from "react-router-dom";
import { HomePage } from "../pages/HomePage";
import { AboutPage } from "../pages/AboutPage";
import { MainNav } from "../components/MainNav";
import { Login } from "../pages/register/Login";
import { Register } from "../pages/register/Register";
import { Error404 } from "./Error404";
import { TermsConditions } from "../pages/register/TermsConditions";
import { RecoverPassword } from "../pages/register/RecoverPassword";
import { UserProfile } from "../pages/userProfile/UserProfile";
import { RoutesNotAllowedWithUserOn } from "./PrivateRoutes";
import { RoutesAllowedWithUserOn } from "./PrivateRoutes";
import { UserEditProfile } from "../pages/userProfile/UserEditProfile";
import { UserChangeImage } from "../pages/userProfile/UserChangeImage";
import { ShoppPage } from "../pages/shopp/ShoppPage";
import { ShoppProductInfo } from "../pages/shopp/productPage/ShoppProductInfo";

export const MainRoute = () => {
    return (
        <div>
            <MainNav />

            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route element={<RoutesNotAllowedWithUserOn />}>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                </Route>
                <Route element={<RoutesAllowedWithUserOn />}>
                    <Route path="/userprofile" element={<UserProfile />} />
                    <Route path="/userprofile/usereditprofile" element={<UserEditProfile />} />
                    <Route path="/userprofile/changeimage" element={<UserChangeImage />} />
                </Route>
                <Route path="/terms" element={<TermsConditions />} />
                <Route path="/recoverpassword" element={<RecoverPassword />} />
                <Route path="/shopp" element={<ShoppPage />} />
                <Route path="/shopp/:productId" element={<ShoppProductInfo />} />
                <Route path="/*" element={<Error404 />} />
            </Routes>
        </div>
    )
}