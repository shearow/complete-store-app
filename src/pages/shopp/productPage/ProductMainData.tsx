import { useState } from "react"
/********************* TYPESCRIPT TYPES *****************************************/
import { ProductMainDataType } from "../../../types/ShoppTypes"

export const ProductMainData = ( {product}: {product: ProductMainDataType} ) => {
    const [stockCount, setStockCount] = useState(1);

    const reduceStockCount = () => {
        if(stockCount > 1){
            setStockCount(prev => prev - 1);
        }
    }

    const increaseStockCount = () => {
        if(stockCount < product.stock){
            setStockCount(prev => prev + 1);
        }
    }

    return (
        <div className="product-main-data">
            <div className="product-data">
                <h3 className="product-name">{product.name}</h3>

                { product.discountPercentage > 0 && 
                <span className="product-price-not-descount">$ {product.price}</span> }

                <div className="price-and-discount">
                    <h4 className="product-price">${product.price - (product.price * product.discountPercentage / 100)}</h4>
                    { product.discountPercentage > 0 && 
                    <p className="product-discount">{product.discountPercentage}% OFF</p> }
                </div>

                <p className="product-stock">Stock available: {product.stock}</p>

                <div className="product-data-trading">
                    <div className="product-quantity">
                        <label>Quantity:</label>
                        <div className="stock-input-content">
                            <input type="text" value={stockCount} readOnly />
                            <button className="button-stock" onClick={reduceStockCount}>-</button>
                            <button className="button-stock" onClick={increaseStockCount}>+</button>
                        </div>                        
                    </div>
                    <div className="product-buy">
                        <button className="btn-buy">Buy Now</button>
                        <button className="btn-add-cart">Add to Cart</button>
                    </div>
                </div>
            </div>
        </div>
    )
}