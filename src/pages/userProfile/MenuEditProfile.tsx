import { MENU_EDIT_PROFILE } from "../../const/dataConst"
import changeProfileIcon from "../../assets/icons/profileIcons/change-profile.png"
import changePasswordIcon from "../../assets/icons/profileIcons/change-password.png"
import { GoBackButton } from "../../components/GoBackButton"

export const MenuEditProfile = ( {changeMenu}: {changeMenu: (section: string) => void} ) => {
    return (
        <div className="menu-edit-profile">
            <GoBackButton navigateTo="/userprofile" />
            <div 
            onClick={() => changeMenu(MENU_EDIT_PROFILE.changeUserName)}
            className="menu-edit-option">
                <img src={changeProfileIcon} alt="icon change profile" />
                <h3>Change UserName</h3>
            </div>

            <div 
            onClick={() => changeMenu(MENU_EDIT_PROFILE.changePassword)}
            className="menu-edit-option">
                <img src={changePasswordIcon} alt="icon change password" />
                <h3>Change Password</h3>
            </div>
        </div>
    )
}