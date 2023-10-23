import { useState, useEffect, useRef } from "react"
import { Modal } from "../../components/Modal"
import { Spinner } from "../../components/Spinner"
import deleteIcon from "../../assets/icons/adminIcons/delete-icon.svg"
import { ProductsAdminEditType } from "../../types/UtilitiesTypes"

export const ProductsAdminEdit = ( 
    {closeModalProductEdit, allCategories, product}: ProductsAdminEditType 
    ) => {
    const [productData, setProductData] = useState( {
        name: product?.name,
        available: product?.available,
        price: product?.price,
        discountPercentage: product?.discountPercentage,
        description: product?.description,
        stock: product?.stock,
        category: [product?.category],
        thumbnail: product.thumbnail,
        images: product.images
    } );
    const thumbnailImageRef = useRef(null);
    const imagesRef = useRef(null);
    const imagesToDelete = [];
    const [isLoading, setIsLoading] = useState(false);
    
    useEffect(() => {
        if(allCategories.length === 0){
            setProductData(prev => ({...prev, category: ["addCategory"]}));
        }
    }, [productData.category]);

    const changeThumbnail = () => {
        thumbnailImageRef.current.click();
    }

    const changeImages = () => {
        imagesRef.current.click();
    }

    const removeImage = (index: number) => {
        const filteredImage = [...productData.images];
        filteredImage.splice(index, 1);

        setProductData(prev => ({...prev, images: filteredImage}))
    }

    const uploadProduct = (e) => {
        e.preventDefault();
        
        console.log(productData);
    }

    return (  
        <Modal closeModal={closeModalProductEdit}>
            <form className="products-admin-create" onSubmit={uploadProduct}>
                <h3 className="products-admin-create-title">Edit Product</h3>

                <div className="products-admin-create-data">
                    <label htmlFor="editName">Name:</label>
                    <input 
                        type="text" 
                        value={productData?.name}
                        onChange={(e) => setProductData(prev => ({...prev, name: e.target.value})) }
                        id="editName"
                        name="createName" 
                        required 
                    />
                </div>

                <div className="products-admin-create-data">
                    <label htmlFor="editAvailable">Available:</label>
                    <select 
                        id="editAvailable" 
                        value={productData?.available ? "true" : "false"}
                        onChange={(e) => setProductData(prev => ({...prev, available: e.target.value === "true"})) }
                        name="createAvailable"
                        required
                    >
                        <option value="false">False</option>
                        <option value="true">True</option>
                    </select>
                </div>  

                <div className="products-admin-create-data">
                    <label htmlFor="editPrice">Price (not discount):</label>
                    <input 
                        type="number" 
                        value={productData?.price}
                        onChange={(e) => setProductData(prev => ({...prev, price: Number(e.target.value)})) }
                        id="editPrice" 
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
                        value={productData?.discountPercentage} 
                        onChange={(e) => setProductData(prev => ({...prev, discountPercentage: Number(e.target.value)})) }
                        min={0} 
                        max={100} 
                        id="editDiscountPercentage" 
                        name="createDiscountPercentage" 
                        required
                    />
                    <span>{productData?.discountPercentage}%</span>
                </div>

                <div className="products-admin-create-data">
                    <label htmlFor="editDescription">Description:</label>
                    <textarea 
                        value={productData?.description}
                        onChange={(e) => setProductData(prev => ({...prev, description: e.target.value})) }
                        id="editDescription" 
                        name="createDescription" 
                        required 
                    />
                </div>

                <div className="products-admin-create-data">
                    <label htmlFor="editStock">Stock:</label>
                    <input 
                        type="number" 
                        value={productData?.stock}
                        onChange={(e) => setProductData(prev => ({...prev, stock: Number(e.target.value)})) }
                        id="editStock" 
                        name="createStock" 
                        min={0} 
                        required 
                    />
                </div>

                <div className="products-admin-create-data">
                    <label htmlFor="editCategory">Category:</label>
                    <select
                        value={productData?.category[0]}
                        onChange={(e) => setProductData(prev => ({...prev, category: [e.target.value]})) }
                        id="editCategory" 
                        name="createCategory"
                        required 
                    >
                        {allCategories?.map( (category, index) => (
                            <option key={index} value={category}>{category}</option>
                        ))}
                        <option value="addCategory">Add Category</option>
                    </select>

                    {productData?.category[0] === "addCategory" && 
                    <input type="text" placeholder="New Category" name="createNewCategory" required />
                    }
                </div>

                <div className="products-admin-create-data products-admin-edit-thumbnail">
                    <label htmlFor="editThumbnail">Principal Image:</label>
                    <div className="products-admin-edit-thumbnail-content">
                        <img src={productData.thumbnail} loading="lazy" alt="thumbnail image" />
                        <input 
                            type="file"                            
                            ref={thumbnailImageRef}
                            onChange={(e) => setProductData(prev => ({...prev, thumbnail: URL.createObjectURL(e?.target?.files[0])}))} 
                        />
                        <button onClick={changeThumbnail}>Change Image</button>
                    </div>
                </div>

                <div className="products-admin-create-data products-admin-edit-images">
                    <label htmlFor="editImages">Others Images:</label>
                    <div className="products-admin-edit-images-content">
                        <div className="products-admin-edit-images-content-header">
                            { productData?.images?.length > 0 
                            ? productData?.images?.map( (image, index) => (
                                <div className="card-edit">
                                    <div className="card-edit-image">
                                        <img onClick={() => removeImage(index)} loading="lazy" key={index} src={image} alt="product images" />
                                        <div className="delete-hover">
                                            <img src={deleteIcon} alt="delete" />
                                            <p>Delete</p>
                                        </div>
                                    </div>
                                </div>
                            ))
                            : <p className="no-images">No images</p>
                            }         
                        </div>
                                       
                        <input 
                            type="file"
                            ref={imagesRef}
                            onChange={(e) => [...e?.target?.files].map(file => {
                                setProductData(prev => ({...prev, images: [...prev.images, URL.createObjectURL(file)]}))
                            })}
                            multiple 
                        />
                        <button 
                            className="change-images-button"
                            onClick={changeImages}
                        >
                            Add Image
                        </button>
                    </div>
                </div>

                <div className="products-admin-create-data final-price">
                    <p>Final Price: 
                        <span>$ {(productData?.price - (productData?.price * productData?.discountPercentage / 100)).toFixed(2)}</span>
                    </p>
                </div>

                <div className="buttons">
                    <button className="create-btn create-btn-cancel" onClick={closeModalProductEdit}>Cancel</button>
                    <button type="submit" className="create-btn create-btn-create">
                        {isLoading ? <Spinner /> : "Edit Product"}
                    </button>
                </div>
            </form>
        </Modal>
    )
}