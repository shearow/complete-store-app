import { ShoppProduct } from "./ShoppProduct"
/********************* TYPESCRIPT TYPES *****************************************/
import { ShoppProductType } from "../../types/ShoppTypes"

export const ShoppListProducts = ( {allProducts}: {allProducts: ShoppProductType[]} ) => {
    return (
        <div className="shopp-list-products">
            { allProducts.map(prod => (
                <ShoppProduct key={prod.id} product={prod} />
            ))}
        </div>
    )
}