import { useState } from "react"
import createIcon from "../../assets/icons/adminIcons/create-icon.svg"
import { Modal } from "../../components/Modal"
import { createProductService } from "../../services/authService"
import { Spinner } from "../../components/Spinner"

export const ProductsAdminCreate = ( {allCategories}: {allCategories: string[]}) => {
    const [modalIsActive, setModalIsActive] = useState(false);
    const [discountPercentage, setDiscountPercentage] = useState(0);
    const [productImages, setProductImages] = useState<File[]>([]);
    const [thumbnailImage, setThumbnailImage] = useState<File>();
    const [price, setPrice] = useState(0);
    const [createCategory, setCreateCategory] = useState();
    const [isLoading, setIsLoading] = useState(false);

    const closeModal = () => {
        setModalIsActive(false);
        resetFormCreateProduct();
    }

    const resetFormCreateProduct = () => {
        setDiscountPercentage(0);
        setProductImages([]);
        setThumbnailImage(undefined);
        setPrice(0);
        setCreateCategory(undefined);
    }

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
        if(isLoading) return;

        const categoryData = createCategory === "addCategory" 
            ? e.target.createNewCategory.value.toLowerCase()
            : e.target.createCategory.value
            
        await createProductService({
            available: e.target.createAvailable.value === "true" ? true : false,
            category: [categoryData],
            description: e.target.createDescription.value,
            discountPercentage: Number(e.target.createDiscountPercentage.value),
            name: e.target.createName.value,
            images: productImages,
            price: Number(e.target.createPrice.value),
            stock: Number(e.target.createStock.value),
            thumbnail: thumbnailImage as File,
            setIsLoading
        });
        closeModal();
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
                    <h3 className="products-admin-create-title">Create Product</h3>

                    <div className="products-admin-create-data">
                        <label htmlFor="createName">Name:</label>
                        <input type="text" id="createName" name="createName" required />
                    </div>

                    <div className="products-admin-create-data">
                        <label htmlFor="createAvailable">Available:</label>
                        <select id="createAvailable" name="createAvailable" required >
                            <option value="false">False</option>
                            <option value="true">True</option>
                        </select>
                    </div>  

                    <div className="products-admin-create-data">
                        <label htmlFor="createPrice">Price (not discount):</label>
                        <input 
                            type="number" 
                            onChange={(e) => setPrice(e.target.value)}
                            id="createPrice" 
                            name="createPrice" 
                            min={0} 
                            placeholder="$" 
                            required 
                        />
                    </div>

                    <div className="products-admin-create-data">
                        <label>Discount:</label>
                        <input 
                            type="range" 
                            value={discountPercentage} 
                            onChange={(e) => setDiscountPercentage(e.target.value)}
                            min={0} 
                            max={100} 
                            id="createDiscountPercentage" 
                            name="createDiscountPercentage" 
                            required
                        />
                        <span>{discountPercentage}%</span>
                    </div>

                    <div className="products-admin-create-data">
                        <label htmlFor="createDescription">Description:</label>
                        <textarea id="createDescription" name="createDescription" required />
                    </div>

                    <div className="products-admin-create-data">
                        <label htmlFor="createStock">Stock:</label>
                        <input type="number" id="createStock" name="createStock" min={0} required />
                    </div>

                    <div className="products-admin-create-data">
                        <label htmlFor="createCategory">Category:</label>
                        <select
                            onChange={(e) => setCreateCategory(e.target.value)}
                            id="createCategory" 
                            name="createCategory" 
                            required 
                        >
                            {allCategories.map( (category, index) => (
                                <option key={index} value={category}>{category}</option>
                            ))}
                            <option value="addCategory">Add Category</option>
                        </select>

                        {createCategory === "addCategory" && 
                        <input type="text" placeholder="New Category" name="createNewCategory" required />
                        }
                    </div>

                    <div className="products-admin-create-data">
                        <label htmlFor="createThumbnail">Principal Image:</label>
                        <input type="file" id="createThumbnail" onChange={changeThumbnailData} required />
                    </div>

                    <div className="products-admin-create-data">
                        <label htmlFor="createImages">Others Images:</label>
                        <input type="file" id="createImages" onChange={changeImageData} multiple />
                    </div>

                    <div className="products-admin-create-data final-price">
                        <p>Final Price: 
                            <span>$ {price - (price * discountPercentage / 100)}</span>
                        </p>
                    </div>

                    <div className="buttons">
                        <button className="create-btn create-btn-cancel" onClick={closeModal}>Cancel</button>
                        <button type="submit" className="create-btn create-btn-create">
                            {isLoading ? <Spinner /> : "Create Product"}
                        </button>
                    </div>      
                </form>
            </Modal>
        }
        </>
    )
}