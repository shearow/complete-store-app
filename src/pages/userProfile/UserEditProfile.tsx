import { useState } from "react"
import { ProfileChangeUsername } from "./ProfileChangeUsername"
import { ProfileChangePassword } from "./ProfileChangePassword"
import { MenuEditProfile } from "./MenuEditProfile"
import { MENU_EDIT_PROFILE } from "../../const/dataConst"
import "../../styles/userEditProfile.css"

export const UserEditProfile = () => {
    const [menuOn, setMenuOn] = useState(MENU_EDIT_PROFILE.menu);

    const changeEditMenuSection = (section: string) => {
        setMenuOn(section)
    }

    return (
        <div className="edit-profile-section container">
            <h2 className="title-page">Edit Profile</h2>

            <div className="edit-profile-container">
                { menuOn === "menu-edit-profile" &&
                <MenuEditProfile changeMenu={changeEditMenuSection} /> }

                { menuOn === MENU_EDIT_PROFILE.changeUserName &&
                <ProfileChangeUsername changeMenu={changeEditMenuSection} /> }
                
                { menuOn === MENU_EDIT_PROFILE.changePassword && 
                <ProfileChangePassword changeMenu={changeEditMenuSection} /> }
            </div>
        </div>
    )
}