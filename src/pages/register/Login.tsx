import { Link } from "react-router-dom"
import googleIcon from "../../assets/icons/google.svg"
import "../../styles/login.css"
import { loginWithGoogleService, createUserDBService, loginUserService } from "../../services/authService"
/********************* TYPESCRIPT TYPES *****************************************/
import { CreateUserDBService } from "../../types/AuthServiceTypes"
import { GoBackButton } from "../../components/GoBackButton"

export const Login = () => {

    const loginGoogle = async () => {
        try{
            await loginWithGoogleService()
            .then(userData => {
                createUserDBService( {
                    email: userData.user.email, 
                    displayName: userData.user.displayName, 
                    id: userData.user.uid, 
                    role: "user", 
                    imgURL: userData.user.photoURL
                } as CreateUserDBService );
            })
        }catch(err){
            alert("An error has ocurred.");
        }
    }

    const signInUser = async (e) => {
        e.preventDefault();

        try{
            await loginUserService({
                email: e.target.loginEmail.value, 
                password: e.target.loginPassword.value
            });
        }catch(err){
            alert("Incorrect Password");
        }
    }

    return (
        <div className="login-section container">
            <GoBackButton />
            <h2 className="title-page">Login Page</h2>

            <div className="login-form">
                <form onSubmit={signInUser}>
                    <div className="login-data-input login-data-name">
                        <label htmlFor="login-email">Email:</label>
                        <input type="text" id="login-emil" name="loginEmail" placeholder="email@hotmail.com" />
                    </div>
                    <div className="login-data-input login-data-password">
                        <label htmlFor="login-form-password">Password:</label>
                        <input type="password" id="login-form-password" name="loginPassword" placeholder="password" />
                    </div>
                    <input type="submit" className="login-submit" value="Login" />

                    <div className="login-form-more-options">
                        <p>You do not have an account? <Link to="/register">Register</Link></p>
                        <p>Did you forget the password? <Link to="/recoverpassword" target="_blank" rel="noopener noreferrer">Recover</Link></p>
                    </div>
                </form>

                <div className="login-others-providers">
                    <div className="login-provider login-google" onClick={loginGoogle}>
                        <img src={googleIcon} alt="google logo" />
                        <p>Login with Google</p>
                    </div>
                </div>
            </div>
        </div>
    )
}