import { Link, NavLink } from "react-router-dom"
import { useContext, useState } from "react"
import { UserContext } from "../context/userContext"
import logoShearow from "../assets/imgs/logo-ave.svg"
import openBurger from "../assets/icons/burgerIcons/open-burger.svg"
import closeBurger from "../assets/icons/burgerIcons/close-burger.svg"
import "../styles/mainNav.css"

export const MainNav = () => {
    const [menuActive, setMenuActive] = useState(false);
    const { userOnline, removeUserOnline } = useContext(UserContext);

    return (
        <div className={menuActive ? "main-nav active" : "main-nav"}>
            <div className="main-nav-logo">
                <Link to="/">
                    <div className="logo-img">
                        <img src={logoShearow} alt="logo shearow" />
                    </div>
                    <p>Sherow</p>
                </Link>
            </div>

            <div className="nav-burger">
                <img 
                    className="nav-burger-button nav-burger-open"
                    src={openBurger}
                    alt="open navegation menu icon"
                    onClick={() => setMenuActive(true)}
                />
                <img 
                    className="nav-burger-button nav-burger-close"
                    src={closeBurger}
                    alt="close navegation menu icon"
                    onClick={() => setMenuActive(false)}
                />
            </div>

            <nav>
                <ul>
                    <li><NavLink className={({isActive}) => isActive ? "active" : ""} to="/">Home</NavLink></li>
                    <li><NavLink className={({isActive}) => isActive ? "active" : ""} to="/about">About</NavLink></li>
                    <li><NavLink className={({isActive}) => isActive ? "active" : ""} to="/shopp">Shopp</NavLink></li>
                    
                    { !userOnline?.online
                    ? <>
                    <li><NavLink className={({isActive}) => isActive ? "active" : ""} to="/login">Login</NavLink></li>
                    <li><NavLink className={({isActive}) => isActive ? "active" : ""} to="/register">Register</NavLink></li>
                    </>
                    : <>
                    <li className="nav-user-img">
                        <Link to="/userprofile">
                            <img src={userOnline?.imgURL} alt={`image profile to ${userOnline?.displayName}`} />
                        </Link>
                    </li>
                    { userOnline.online && userOnline.role === "admin" 
                    && <li><NavLink className={({isActive}) => isActive ? "active" : ""} to="/admin/menu">👑ADMIN</NavLink></li>
                    }
                    <li onClick={removeUserOnline}>Logout</li>
                    </> }
                </ul>
            </nav>            
        </div>
    )
}