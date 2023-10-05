import { useState } from "react"
import { MAX_COUNT_MINIATURES } from "../../../const/dataConst";

export const ProductAllImages = ( {allImages}: {allImages: string[]} ) => {
    const [indexSelected, setIndexSelected] = useState(0);
    const imagesSlice = allImages.slice(0, MAX_COUNT_MINIATURES);

    console.log(allImages)
    return (
        <div className="product-all-images">
            <div className="actual-image">
                <img src={allImages[indexSelected] || allImages[0]} alt="product image" loading="lazy" />
            </div>

            <div className="miniatures-images">
                {imagesSlice.map( (image, index) => (
                    <div 
                        key={index} 
                        onMouseOver={() => setIndexSelected(index)}
                        className={indexSelected === index ? "miniature-image selected" : "miniature-image"}
                    >
                        <img src={image} alt="product image" loading="lazy" />
                    </div>
                ))}
                {allImages.length > MAX_COUNT_MINIATURES && 
                    <div
                        onClick={() => setIndexSelected(7)}
                        className={indexSelected >= MAX_COUNT_MINIATURES ? "miniature-image miniature-image-last selected" : "miniature-image miniature-image-last"}
                    >
                        <img src={allImages[MAX_COUNT_MINIATURES]} alt="product image" loading="lazy" />
                        <p className="shape-bg">+ {allImages.length - imagesSlice.length}</p>
                    </div>
                }
            </div>
        </div>
    )
}