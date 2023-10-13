import { useContext, useRef, useState } from "react"
import { UserContext } from "../../context/userContext"
import { useNavigate } from "react-router-dom"
import { userChangeImageService } from "../../services/authService"
import "../../styles/userChangeImage.css"

export const UserChangeImage = () => {
    const { userOnline } = useContext(UserContext);
    const [newImage, setNewImage] = useState();
    const inputFileRef = useRef(null);
    const navigate = useNavigate();

    const toFileInput = () => {
        inputFileRef?.current?.click();
    }

    const changeImage = (e) => {
        const dataInput = e.target.files[0];
        if( dataInput.type !== "image/jpeg" && 
            dataInput.type !== "image/png" && 
            dataInput.type !== "image/svg+xml") {
                alert("El formato del archivo no es válido, porfavor ingrese uno válido");
                return;
        }
        setNewImage(dataInput)
    }

    const cancelChangesImage = () => {
        navigate("/userprofile");
    }

    const saveChangesImage = () => {
        if(newImage === "") return;

        userChangeImageService( {file: newImage, userId: userOnline.id} );
        /* PENSAR QUE MAS CAMBIAR SI SE CAMBIA Y SE GUARDA EL ARCHIVO */
    }

    return (
        <div className="user-change-image-section container">
            <h2 className="title-page">Change Image</h2>

            <div className="user-change-image-content">
                <div className="user-change-image-img">
                    { newImage 
                        ? <img src={URL.createObjectURL(newImage)} alt={`image profile to ${userOnline.displayName}`} />
                        : <img src={userOnline.imgURL} alt={`image profile to ${userOnline.displayName}`} />                 
                    }                    
                </div>
                <button className="btns-changes btn-change-image" onClick={toFileInput}>Select New Image</button>
                <input type="file" ref={inputFileRef} onChange={changeImage} />

                <div className="btns-changes-options">
                    <button className="btns-changes btn-cancel-changes" onClick={cancelChangesImage}>Cancel</button>
                    <button className="btns-changes btn-save-changes" onClick={saveChangesImage}>Save Changes</button>
                </div>
            </div>
        </div>
    )
}