import { useContext } from "react"
import { UserContext } from "../../context/userContext"

export const CartPage = () => {
    const {userOnline} = useContext(UserContext);

    return (
        <div className="cart-page-section">
            <h2 className="title-page">Cart</h2>
            {JSON.stringify(userOnline.cart)}
        </div>
    )
}