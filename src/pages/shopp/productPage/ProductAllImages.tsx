import { useState } from "react"
import { MAX_COUNT_MINIATURES } from "../../../const/dataConst";

export const ProductAllImages = ( {allImages}: {allImages: string[]} ) => {
    const [indexSelected, setIndexSelected] = useState(0);
    const [modalActive, setModalActive] = useState(false);
    const imagesSlice = allImages.slice(0, MAX_COUNT_MINIATURES);

    const activateModal = () => setModalActive(true);

    const desactivateModal = () => setModalActive(false);

    const reduceIndexSelected = () => {
        if(indexSelected > 0){
            setIndexSelected(prev => prev - 1);
        }else {
            setIndexSelected(allImages.length - 1);
        }
    }

    const increaseIndexSelected = () => {
        if(indexSelected + 1 < allImages.length){
            setIndexSelected(prev => prev + 1);
        }else {
            setIndexSelected(0);
        }
    }
    
    return (
        <div className="product-all-images">
            <div className="product-all-images-content">
                {/* Image selected in the miniature images, default image 0 in the array allImages. */}
                <div className="actual-image">
                    <img 
                        src={allImages[indexSelected] || allImages[0]} 
                        alt="product image" 
                        loading="lazy"
                        onClick={activateModal}
                    />
                </div>

                <div className="miniatures-images">
                    {/* Miniature images of the product. */}
                    {imagesSlice.map( (image, index) => (
                        <div 
                            key={index} 
                            onMouseOver={() => setIndexSelected(index)}
                            className={indexSelected === index ? "miniature-image selected" : "miniature-image"}
                        >
                            <img src={image} alt="product image" loading="lazy" />
                        </div>
                    ))}

                    {/* LAST Miniature Images of the product, this is active with allImages > max count of miniature images. */}
                    {allImages.length > MAX_COUNT_MINIATURES && 
                        <div
                            onClick={() => {
                                setIndexSelected(7);
                                activateModal();
                            }}
                            className={indexSelected >= MAX_COUNT_MINIATURES ? "miniature-image miniature-image-last selected" : "miniature-image miniature-image-last"}
                        >
                            <img src={allImages[MAX_COUNT_MINIATURES]} alt="product image" loading="lazy" />
                            <p className="shape-bg">+ {allImages.length - imagesSlice.length}</p>
                        </div>
                    }
                </div>
            </div>

            { modalActive && 
            <div className="modal-images-carousel">
                <div className="modal-header container">
                    <p className="modal-info">{`${indexSelected + 1}/${allImages.length}`}</p>
                    <button className="modal-close" onClick={desactivateModal}>X</button>
                </div>                
                
                <div className="modal-main-content">
                    <div className="modal-main-content-image">
                        <img src={allImages[indexSelected]} alt="carousel-image" />
                    </div>
                    <button className="modal-btn modal-btn-left" onClick={reduceIndexSelected}>{"<"}</button>
                    <button className="modal-btn modal-btn-right" onClick={increaseIndexSelected}>{">"}</button>
                </div>
            </div>
            }
        </div>
    )
}