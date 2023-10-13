import "../styles/modal.css"
import burgerCloseIcon from "../assets/icons/burgerIcons/close-burger.svg"

export const Modal = ( {children, closeModal} ) => {
    return (
        <div className="modal-component-container">
            <div className="modal-data">
                <img 
                    className="close-modal" 
                    src={burgerCloseIcon} 
                    alt="close modal"
                    onClick={closeModal}
                />
                {children}
            </div>
        </div>
    )
}