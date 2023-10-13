import { useContext } from "react"
import { UserContext } from "../../context/userContext"
import { Link } from "react-router-dom"
import "../../styles/userProfile.css"
import changeProfileIcon from "../../assets/icons/profileIcons/change-profile.png"
import cartIcon from "../../assets/icons/profileIcons/cart.png"
import favoritesIcon from "../../assets/icons/profileIcons/favorites.png"

export const UserProfile = () => {
    const { userOnline, removeUserOnline } = useContext(UserContext);

    return (
        <div className="user-profile-section container">
            <h2 className="title-page">Profile</h2>

            <div className="profile-data">
                <div className="profile-header">
                    <div className="profile-image">
                        <Link to="/userprofile/changeimage">
                            <img src={userOnline.imgURL} alt={`image profile to ${userOnline.displayName}`} />
                        </Link>
                    </div>
                    <h3 className="profile-username">{userOnline.displayName}</h3>
                    <button className="profile-logout" onClick={removeUserOnline}>Logout</button>
                </div>

                <div className="profile-options">
                    <h3 className="title-options">Options Profile:</h3>
                    <div className="profile-option option-change-user-data">
                        <Link to="/userprofile/usereditprofile">
                            <img src={changeProfileIcon} alt="change profile icon" />
                            <p>Change profile info.</p>
                        </Link>
                    </div>
                    <div className="profile-option option-cart">
                        <Link>
                            <img src={cartIcon} alt="cart icon" />
                            <p>View Cart.</p>
                        </Link>
                    </div>
                    <div className="profile-option option-favorites">
                        <Link>
                            <img src={favoritesIcon} alt="favorite icon" />
                            <p>View Favorites.</p>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}