import { Link } from "react-router-dom"
/********************* TYPESCRIPT TYPES *****************************************/
import { ShoppProductType } from "../../types/ShoppTypes"

export const ShoppProduct = ( {product}: {product: ShoppProductType} ) => {
    return (
        <div className="product-container">
            <Link className="product-content" to={`/shopp/${product.id}`}>
                <h3 className="product-title">{product.name}</h3>
                
                <div className="product-image-container">
                    <img className="product-img" loading="lazy" src={product.thumbnail} alt={product.name} />
                    { product.discountPercentage && 
                    <span className="product-discount">{`${product.discountPercentage}% OFF`}</span> }
                </div>

                <div className="product-footer">
                    <p className="product-description">{product.description}</p>
                    <p className={product.discountPercentage 
                        ? "product-price product-price-discount" 
                        : "product-price"}
                    >
                        ${(product.price - (product.discountPercentage * product.price / 100)).toFixed(2)}
                    </p>
                </div>
            </Link>
        </div>
    )
}