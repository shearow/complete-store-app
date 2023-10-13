import { Routes, Route } from "react-router-dom"
import { MainNav } from "../components/MainNav"
import { HomePage } from "../pages/HomePage"
import { AboutPage } from "../pages/AboutPage"
import { TermsConditions } from "../pages/register/TermsConditions"
import { RecoverPassword } from "../pages/register/RecoverPassword"
import { UserProfile } from "../pages/userProfile/UserProfile"
import { UserEditProfile } from "../pages/userProfile/UserEditProfile"
import { UserChangeImage } from "../pages/userProfile/UserChangeImage"
import { ShoppPage } from "../pages/shopp/ShoppPage"
import { ShoppProductInfo } from "../pages/shopp/productPage/ShoppProductInfo"
import { Error404 } from "./Error404"
import { PrivateRoutes } from "./PrivateRoutes"
import { PRIVATE_OPTION } from "../const/dataConst"

export const MainRoute = () => {
    return (
        <div>
            <MainNav />

            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/about" element={<AboutPage />} />                
                <Route element={<PrivateRoutes option={PRIVATE_OPTION.onlyLogged} />}>
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