import { Link } from "react-router-dom"
import { ShoppProductType } from "../../types/ShoppTypes"

export const ShoppProduct = ( {product}: {product: ShoppProductType} ) => {
    return (
        <div className="product">
            <Link to={`/shopp/${product.id}`}>
                <h3>{product.name}</h3>
                <img src={product.thumbnail} alt={product.name} />
                <p>{product.description}</p>
                <p>${product.price}</p>
            </Link>
        </div>
    )
}