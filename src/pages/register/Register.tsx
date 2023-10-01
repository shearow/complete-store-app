import { useState, useEffect } from "react"
import "../../styles/register.css"
import { Link } from "react-router-dom"
import { createUserService } from "../../services/authService"

const REGEX_AUTH = {
    userName: /^[a-zA-Z0-9]{1,20}$/,
    email: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
    password: /^[A-Za-z0-9]{6,30}$/,
    repeatPassword: /^[A-Za-z0-9]{6,30}$/,
}

const initialUserData = {
    userName: "",
    email: "",
    password: "",
    repeatPassword: "",
}

export const Register = () => {
    const [userData, setUserData] = useState(initialUserData);
    const [stateUser, setStateUser] = useState({
        userName: false,
        email: false,
        password: false,
        repeatPassword: false,
        terms: false,
    });

    useEffect(() => {
        if(Object.values(stateUser).every(info => info === true)){
            createUserService( {
                email: userData.email, 
                password: userData.password,
                displayName: userData.userName
            } );
        }
    }, [stateUser]);
    
    const existRegEx = (nameKey: string) => Object.keys(REGEX_AUTH).includes(nameKey);

    const isValidRegEx = (valueData: string, nameKey: string) => REGEX_AUTH[nameKey].test(valueData);

    const isValidInput = (e) => {
        setUserData(prevState => ({...prevState, [e.target.name]: e.target.value}));

        if(!existRegEx(e.target.name)) return;
        
        const isValidData = e.target.name === "repeatPassword"
            ? e.target.value === userData.password && isValidRegEx(e.target.value, e.target.name)
            : e.target.value === "" || isValidRegEx(e.target.value, e.target.name)

        if(isValidData) {
            e.target.closest(".form-data")?.classList.remove("active");
        } else {
            e.target.closest(".form-data")?.classList.add("active");
        }
    }

    const sendRegister = (e) => {
        e.preventDefault();

        setStateUser({
           userName: isValidRegEx(userData.userName, "userName"),
           email: isValidRegEx(userData.email, "email"),
           password: isValidRegEx(userData.password, "password"),
           repeatPassword: (isValidRegEx(userData.repeatPassword, "repeatPassword") && userData.password === userData.repeatPassword),
           terms: e.target.terms.checked
        });
    }

    return (
        <div className="register-section container">
            <h2 className="title-page">Register Page</h2>

            <div className="register-form">
                <form onSubmit={sendRegister}>
                    <div className="form-data form-username">
                        <div className="form-data-input">
                            <label htmlFor="register-username">UserName:</label>
                            <input 
                                type="text" 
                                id="register-username"
                                placeholder="username"
                                name="userName"
                                onChange={isValidInput}
                            />
                        </div>
                        <p className="form-error-data">Invalid field</p>
                    </div>
                    <div className="form-data form-email">
                        <div className="form-data-input">
                            <label htmlFor="register-email">Email:</label>
                            <input 
                                type="email"
                                id="register-email" 
                                placeholder="email"
                                name="email"
                                onChange={isValidInput}
                            />
                        </div>                        
                        <p className="form-error-data">Invalid field</p>
                    </div>
                    <div className="form-data form-password">
                        <div className="form-data-input">
                            <label htmlFor="register-password">Password:</label>
                            <input 
                                type="password" 
                                id="register-password" 
                                placeholder="password"
                                name="password"
                                onChange={isValidInput}
                            />
                        </div>
                        <p className="form-error-data">Invalid field</p>
                    </div>
                    <div className="form-data form-repeat-password">
                        <div className="form-data-input">
                            <label htmlFor="register-repeat-password">Repeat Password:</label>
                            <input 
                                type="password" 
                                id="register-repeat-password" 
                                placeholder="password"
                                name="repeatPassword"
                                onChange={isValidInput}
                            />
                        </div>
                        <p className="form-error-data">Invalid field</p>
                    </div>
                    <div className="form-terms">
                        <input type="checkbox" name="terms" />
                        <p>I accept the <Link to="/terms" target="_blank" rel="noopener noreferrer">terms and conditions</Link>.</p>
                    </div>
                    <input className="form-submit" type="submit" value="Sign in" />
                </form>
            </div>
        </div>
    )
}