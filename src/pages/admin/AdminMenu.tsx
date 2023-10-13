import { useState } from "react"
import { GoBackButton } from "../../components/GoBackButton"
import { SECTION_ADMIN_ON } from "../../const/dataConst"
import { AdminNavbarMenu } from "./AdminNavbarMenu"
import { AdminNavbar } from "./AdminNavbar"
import { HomeAdmin } from "./HomeAdmin"
import { ProductsAdmin } from "./ProductsAdmin"
import { UsersAdmin } from "./UsersAdmin"
import "../../styles/adminMenu.css"

export const AdminMenu = () => {
    const [menuActive, setMenuActive] = useState(false);
    const [sectionAdminOn, setSectionAdminOn] = useState(SECTION_ADMIN_ON.products);
    
    const openMenuAdmin = () => setMenuActive(true);

    const closeMenuAdmin = () => setMenuActive(false);

    const changeSectionAdmin = ( {section}: {section: string} ) => {
        setSectionAdminOn(section);
    }
    
    return (
        <div className={menuActive ? "admin-menu-section active" : "admin-menu-section"}>            
            <AdminNavbarMenu 
                closeMenuAdmin={closeMenuAdmin}
                sectionAdminOn={sectionAdminOn}
                changeSectionAdmin={changeSectionAdmin}
            />

            <div className="admin-menu-section-container">         
                <AdminNavbar
                    openMenuAdmin={openMenuAdmin}
                    menuActive={menuActive}
                />


                {/* DYNAMIC CONTENT IN INSIDE ADMIN-MENU-SECTION-CONTENT */}
                <div className="admin-menu-section-content container">
                    <GoBackButton />
                    
                    { sectionAdminOn === SECTION_ADMIN_ON.home && <HomeAdmin /> }
                    { sectionAdminOn === SECTION_ADMIN_ON.products && <ProductsAdmin /> }
                    { sectionAdminOn === SECTION_ADMIN_ON.users && <UsersAdmin /> }
                </div>
            </div>
        </div>
    )
}