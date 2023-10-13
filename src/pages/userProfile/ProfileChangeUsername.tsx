import { useRef, useContext } from "react"
import { UserContext } from "../../context/userContext"
import { changeUserNameService } from "../../services/authService"
import { MENU_EDIT_PROFILE, REGEX_AUTH } from "../../const/dataConst"

export const ProfileChangeUsername = ( {changeMenu}: {changeMenu: (section: string) => void} ) => {
    const {userOnline} = useContext(UserContext);
    const inputUsernameRef = useRef(null);

    const changeToNewUsername = async () => {
        const nameData = inputUsernameRef?.current?.value.trim();
        if(REGEX_AUTH.userName.test(nameData)){
            try{
                changeUserNameService({newUsername: nameData, userId: userOnline.id});
                alert("The username changed correctly.");
            }catch(err) {
                alert("Inesperate error. Try again or another time.");
            }
        }else {
            alert("The username is not valid, it must contain 1 to 30 characters. Only letters, numbers and space.");
        }        
    }

    return (
        <div className="change-username-edit-profile submenu-edit-profile">
            <button onClick={() => changeMenu(MENU_EDIT_PROFILE.menu)}>👈 Go back</button>
            <h3>Change Username</h3>
            <input type="text" placeholder="new Username" ref={inputUsernameRef} />
            <button onClick={changeToNewUsername}>Change Username</button>
        </div>
    )
}