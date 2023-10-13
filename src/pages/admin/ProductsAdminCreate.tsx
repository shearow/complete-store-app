import { useState } from "react"
import createIcon from "../../assets/icons/adminIcons/create-icon.svg"
import { Modal } from "../../components/Modal"
import { createProductService } from "../../services/authService";

export const ProductsAdminCreate = ( {allCategories}: {allCategories: string[]}) => {
    const [modalIsActive, setModalIsActive] = useState(false);
    const [productImages, setProductImages] = useState<File[]>([]);
    const [thumbnailImage, setThumbnailImage] = useState();

    const closeModal = () => setModalIsActive(false);

    const changeThumbnailData = (e) => {
        const allFiles = [...e.target.files];

        if(!isCorrectImage( {allFiles} )) return;
        setThumbnailImage(e.target.files[0]);
    }

    const changeImageData = (e) => {
        const allFiles = [...e.target.files];

        if(!isCorrectImage( {allFiles} )) return;
        setProductImages(allFiles);
    }

    const isCorrectImage = ( {allFiles}: {allFiles: File[]} ) => {
        allFiles.forEach(imageData => {
            if ( imageData.type !== "image/jpeg" && 
                imageData.type !== "image/png" && 
                imageData.type !== "image/svg+xml"){
                return false;
            }
        });
        return true;
    }

    const uploadProduct = async (e) => {
        e.preventDefault();
        
        createProductService({
            available: e.target.createAvailable.value === "true" ? true : false,
            category: [e.target.createCategory.value],
            description: e.target.createDescription.value,
            discountPercentage: Number(e.target.createDiscountPercentage.value),
            name: e.target.createName.value,
            images: productImages,
            price: Number(e.target.createPrice.value),
            stock: Number(e.target.createStock.value),
            thumbnail: thumbnailImage
        });
    }

    return (
        <>
        <button className="create-products" onClick={() => setModalIsActive(true)}>
            <img src={createIcon} alt="create products" />
            <p>Create</p>
        </button>

        { modalIsActive &&
            <Modal closeModal={closeModal} >
                <form className="products-admin-create" onSubmit={uploadProduct}>
                    <h3>Create Product</h3>

                    <div className="products-admin-create-data">
                        <label htmlFor="createName">Name</label>
                        <input type="text" id="createName" name="createName" required />
                    </div>

                    <div className="products-admin-create-data">
                        <label htmlFor="createAvailable">Available</label>
                        <select id="createAvailable" name="createAvailable" required >
                            <option value="false">False</option>
                            <option value="true">True</option>
                        </select>
                    </div>  

                    <div className="products-admin-create-data">
                        <label htmlFor="createPrice">Price (not discount)</label>
                        <input type="number" id="createPrice" name="createPrice" min={0} placeholder="$" required />
                    </div>

                    <div className="products-admin-create-data">
                        <label>Discount</label>
                        <input type="range" min={0} max={100} id="createDiscountPercentage" name="createDiscountPercentage" required />
                    </div>

                    <div className="products-admin-create-data">
                        <label htmlFor="createDescription">Description</label>
                        <textarea id="createDescription" name="createDescription" required></textarea>
                    </div>

                    <div className="products-admin-create-data">
                        <label htmlFor="createStock">Stock</label>
                        <input type="number" id="createStock" name="createStock" min={0} required />
                    </div>

                    <div className="products-admin-create-data">
                        <label htmlFor="createCategory">Category</label>
                        <select id="createCategory" name="createCategory" required >
                            {allCategories.map( (category, index) => (
                                <option key={index} value={category}>{category}</option>
                            ))}
                        </select>
                    </div>

                    <div className="products-admin-create-data">
                        <label htmlFor="createThumbnail">Principal Image</label>
                        <input type="file" id="createThumbnail" onChange={changeThumbnailData} required />
                    </div>

                    <div className="products-admin-create-data">
                        <label htmlFor="createImages">Others Images</label>
                        <input type="file" id="createImages" onChange={changeImageData} multiple />
                    </div>

                    <div>
                        <span>Final Price: $</span>
                    </div>

                    <button className="create-btn-cancel">Cancel</button>
                    <button type="submit" className="create-btn-create">Create Product</button>
                </form>
            </Modal>
        }
        </>
    )
}