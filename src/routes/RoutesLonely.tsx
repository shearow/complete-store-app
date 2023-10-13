import { Routes, Route } from "react-router-dom"
import { PrivateRoutes } from "./PrivateRoutes"
import { MainRoute } from "./MainRoute"
import { Register } from "../pages/register/Register"
import { Login } from "../pages/register/Login"
import { AdminMenu } from "../pages/admin/AdminMenu"
import { PRIVATE_OPTION } from "../const/dataConst"

export const RoutesLonely = () => {
    return (
        <Routes>
            <Route element={<PrivateRoutes option={PRIVATE_OPTION.onlyNotLogged} />}>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
            </Route>
            <Route element={<PrivateRoutes option={PRIVATE_OPTION.onlyAdmin} />}>
                <Route path="/admin/menu" element={<AdminMenu />} />
            </Route>
            <Route path="/*" element={<MainRoute />} />
        </Routes>
    )
}