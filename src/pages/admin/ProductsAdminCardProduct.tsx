import deleteIcon from "../../assets/icons/adminIcons/delete-icon.svg"
import editIcon from "../../assets/icons/adminIcons/edit-icon.svg"
import { deleteCompleteProductService } from "../../services/authService"
import { ProductsAdminCardProductType } from "../../types/UtilitiesTypes"

export const ProductsAdminCardProduct = ( 
    {product, openModal, takeProductToEditData}: ProductsAdminCardProductType
    ) => {
    
    const deleteProduct = async ( {productId, productCategory}: {productId: string, productCategory: string} ) => {
        deleteCompleteProductService( {productId, productCategory} );
    }

    const sendDataToEdit = () => {
        openModal();
        takeProductToEditData( {product} );
    }

    return (
        <div className="card-product" key={product.id}>
            <div className="card-product-image">
                { product.discountPercentage > 0 &&
                <span className="card-discount">{product.discountPercentage}%</span>
                }                
                <img className="card-image" loading="lazy" src={product.thumbnail} alt={`image to ${product.name}`} />
            </div>

            <div className="card-product-data">                                
                <p>name:
                    <span>{product.name}</span>
                </p>
                <p>final price:
                    <span>${(product.price - (product.price * product.discountPercentage / 100)).toFixed(2)}</span>
                </p>
                <p>stock:
                    <span>{product.stock}</span>
                </p>
                <p>available:
                    <span style={{color: product.available ? "green" : "red"}}>
                        {product.available ? "YES" : "NOT"}
                    </span>
                </p>
                <p>category:
                    <span>{product.category}</span>
                </p>
                <p className="card-id">id: 
                    <span>{product.id}</span>
                </p>
            </div>

            <div className="card-product-buttons">
                <button className="delete-product" onClick={() => deleteProduct( {productId: product.id, productCategory: product.category} )}>
                    <img loading="lazy" src={deleteIcon} alt="delete product" />
                </button>
                <button onClick={sendDataToEdit} className="edit-product">
                    <img loading="lazy" src={editIcon} alt="edit product" />
                </button>
            </div>
        </div>
    )
}