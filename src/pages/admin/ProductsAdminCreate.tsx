import { useState } from "react"
import createIcon from "../../assets/icons/adminIcons/create-icon.svg"
import { Modal } from "../../components/Modal"

export const ProductsAdminCreate = ( {allCategories}: {allCategories: string[]}) => {
    const [modalIsActive, setModalIsActive] = useState(false);

    const closeModal = () => setModalIsActive(false);

    return (
        <>
        <button className="create-products" onClick={() => setModalIsActive(true)}>
            <img src={createIcon} alt="create products" />
            <p>Create</p>
        </button>        

        { modalIsActive &&
            <Modal closeModal={closeModal} >
                <div className="products-admin-create">                
                    <h3>Create Product</h3>    

                    <div className="products-admin-create-data">
                        <label htmlFor="createName">Name</label>
                        <input type="text" id="createName" />
                    </div>

                    <div className="products-admin-create-data">
                        <label htmlFor="createAvailable">Available</label>
                        <select id="createAvailable">
                            <option value="true">True</option>
                            <option value="false">False</option>
                        </select>
                    </div>  

                    <div className="products-admin-create-data">
                        <label htmlFor="createPrice">Price (not discount)</label>
                        <input type="number" id="createPrice" min={0} placeholder="$" />
                    </div>

                    <div className="products-admin-create-data">
                        <label>Discount</label>
                        <input type="range" min={0} max={100} value={0} id="createDiscountPorcentage" />
                    </div>

                    <div className="products-admin-create-data">
                        <label htmlFor="createDescription">Description</label>
                        <textarea id="createDescription" ></textarea>
                    </div>

                    <div className="products-admin-create-data">
                        <label htmlFor="createStock">Stock</label>
                        <input type="text" id="createStock" min={0} />
                    </div>

                    <div className="products-admin-create-data">
                        <label htmlFor="createCategory">Category</label>
                        <select id="createCategory">
                            {allCategories.map(category => (
                                <option value={category}>{category}</option>
                            ))}
                        </select>
                    </div>

                    <div className="products-admin-create-data">
                        <label htmlFor="createThumbnail">Principal Image</label>
                        <input type="file" id="createThumbnail" />
                    </div>

                    <div className="products-admin-create-data">
                        <label htmlFor="createImages">Others Images</label>
                        <input type="file" id="createImages" />
                    </div>

                    <div>
                        <span>Final Price: $</span>
                    </div>

                    <button className="create-btn-cancel">Cancel</button>
                    <button className="create-btn-create">Create Product</button>
                </div>
            </Modal>
        }
        </>
    )
}