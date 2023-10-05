import { ShoppProductType } from "../../types/ShoppTypes"
import { ShoppProduct } from "./ShoppProduct"

export const ShoppListProducts = ( {allProducts}: {allProducts: ShoppProductType[]} ) => {
    return (
        <div className="shopp-list-products">
            { allProducts.map(prod => (
                <ShoppProduct key={prod.id} product={prod} />
            ))}
        </div>
    )
}