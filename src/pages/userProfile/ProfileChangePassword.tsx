import { useRef } from "react"
import { MENU_EDIT_PROFILE } from "../../const/dataConst"
import { userChangeNewPasswordService } from "../../services/authService"
import { REGEX_AUTH } from "../../const/dataConst"

export const ProfileChangePassword = ( {changeMenu}: {changeMenu: (section: string) => void} ) => {
    const dataPasswordRef = useRef(null);

    const changeToNewPassword = () => {
        const dataPass = dataPasswordRef?.current?.value;

        if(REGEX_AUTH.password.test(dataPass)){
            userChangeNewPasswordService( {newPassword: dataPass} )
        }else {
            alert("The password is not valid, it must contain 6 to 30 characters. Only letters, numbers.")
        }
    }
    return (
        <div className="change-password-edit-profile submenu-edit-profile">
            <button onClick={() => changeMenu(MENU_EDIT_PROFILE.menu)}>👈 Go back</button>
            <h3>Change password</h3>
            <input type="text" placeholder="new Password" ref={dataPasswordRef} />
            <button onClick={changeToNewPassword}>Change</button>
        </div>
    )
}