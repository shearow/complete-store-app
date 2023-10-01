import { useRef } from "react"
import { resetPasswordUser } from "../../services/authService";
import "../../styles/recoverPassword.css"

export const RecoverPassword = () => {
    const emailToRecoverPassword = useRef("");

    const sendEmailToRecoverPassword = async () => {
        const emailData = emailToRecoverPassword.current.value;

        if(emailData.trim() !== ""){
            try{
                await resetPasswordUser(emailData).then(() => {
                    alert("Email sent successfully, check your email");
                });
            }catch(err){
                alert("An error has ocurred, try in other moment");
                console.log(err);
            }            
        }
    }

    return (
        <div className="recover-password-section container">
            <h2 className="title-page">Recover Password</h2>

            <div className="recover-password-data">
                <label htmlFor="email-recover-password">Enter Email to recover password</label>
                <input ref={emailToRecoverPassword} type="text" placeholder="Email to recover" id="email-recover-password" />
                <button onClick={sendEmailToRecoverPassword}>Recover Password</button>
            </div>
        </div>
    )
}