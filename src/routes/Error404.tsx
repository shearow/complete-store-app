import { NavLink } from "react-router-dom"

export const Error404 = () => {
    return (
        <div className="error404-section">
            <h2 className="title-pages">ERROR 404</h2>
            <p>This Route not exist.</p>
            <button><NavLink to="/">Go back to home</NavLink></button>
        </div>
    )
}