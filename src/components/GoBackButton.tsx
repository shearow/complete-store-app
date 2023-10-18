import { useNavigate } from "react-router-dom"
import { GoBackButtonType } from "../types/UtilitiesTypes"

export const GoBackButton = ( {
    navigateTo = "/",
    textProp = '👈 Go Home',
    classNameProp = 'go-back-button'
}: GoBackButtonType ) => {

    const navigate = useNavigate();

    return (
        <button 
            onClick={() => navigate(navigateTo)}
            className={classNameProp}
        >
            {textProp}
        </button>
    )
}