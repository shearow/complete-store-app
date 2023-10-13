import burgerOpen from "../../assets/icons/burgerIcons/open-burger.svg"
import { AdminNavBarType } from "../../types/UtilitiesTypes"

export const AdminNavbar = ( {openMenuAdmin, menuActive}: AdminNavBarType ) => {
    return (
        <div className="navbar-admin">
            <div className="navbar-admin-title">                         
                <img src={burgerOpen} 
                    onClick={openMenuAdmin} 
                    alt="Open burger menu"
                    className={menuActive ? "active" : ""}
                />
            </div>
        </div>
    )
}