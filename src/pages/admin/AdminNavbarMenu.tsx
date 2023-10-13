import { useContext } from "react"
import { UserContext } from "../../context/userContext"
import burgerClose from "../../assets/icons/burgerIcons/close-burger.svg"
import houseIcon from "../../assets/icons/adminIcons/house-icon.svg"
import documentIcon from "../../assets/icons/adminIcons/document-icon.svg"
import usersIcon from "../../assets/icons/adminIcons/users-icon.svg"
import { SECTION_ADMIN_ON } from "../../const/dataConst"
/********************* TYPESCRIPT TYPES *****************************************/
import { AdminNavbarMenuType } from "../../types/UtilitiesTypes"


export const AdminNavbarMenu = ( {closeMenuAdmin,sectionAdminOn,changeSectionAdmin}: AdminNavbarMenuType ) => {
    const { removeUserOnline } = useContext(UserContext);

    return (
        <nav className="navbar-admin-nav">
            <div className="navbar-admin-nav-header">
                <img src={burgerClose} onClick={closeMenuAdmin} alt="icon" />
                <h3>👑ADMIN</h3>
            </div>

            <div className="navbar-admin-nav-options">
                <ul>
                    <li
                        className={sectionAdminOn === SECTION_ADMIN_ON.home 
                        ? "navbar-admin-nav-option active" 
                        : "navbar-admin-nav-option"}
                        onClick={() => changeSectionAdmin({section: SECTION_ADMIN_ON.home})}
                    >
                        <img src={houseIcon} alt="icon" />
                        <p>Home Admin</p>
                    </li>
                    <li
                        className={sectionAdminOn === SECTION_ADMIN_ON.products 
                        ? "navbar-admin-nav-option active" 
                        : "navbar-admin-nav-option"}
                        onClick={() => changeSectionAdmin({section: SECTION_ADMIN_ON.products})}
                    >
                        <img src={documentIcon} alt="icon" />
                        <p>Products Admin</p>
                    </li>
                    <li
                        className={sectionAdminOn === SECTION_ADMIN_ON.users 
                        ? "navbar-admin-nav-option active" 
                        : "navbar-admin-nav-option"}
                        onClick={() => changeSectionAdmin({section: SECTION_ADMIN_ON.users})}
                    >
                        <img src={usersIcon} alt="icon" />
                        <p>Users</p>
                    </li>
                </ul>

                <div className="navbar-admin-nav-option-logout">
                    <p onClick={removeUserOnline}>Logout</p>
                </div>
            </div>         
        </nav>
    )
}