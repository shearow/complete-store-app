import { useState } from "react"
import { ALL_PRODUCTS, INITIAL_MIN_PRICE, INITIAL_MAX_PRICE } from "../../const/dataConst"
import { ProductsAdminSearch } from "./ProductsAdminSearch"
import { ProductsAdminOptions } from "./ProductsAdminOptions"
import { ProductsAdminProducts } from "./ProductsAdminProducts"
import { useTakeProducts } from "../../hooks/useTakeProducts"
import { ProductsAdminCreate } from "./ProductsAdminCreate"

export const ProductsAdmin = () => {
    const [searchData, setSearchData] = useState("");
    const [selectedCategory, setSelectedCategory] = useState(ALL_PRODUCTS);
    const [selectedOrder, setSelectedOrder] = useState("minPrice");
    const [minPriceSelected, setMinPriceSelected] = useState(INITIAL_MIN_PRICE);
    const [maxPriceSelected, setMaxPriceSelected] = useState(INITIAL_MAX_PRICE);
    const { productsFiltered, loadingProducts, errorsProducts, allCategories } = useTakeProducts(
        {selectedCategory, selectedOrder, searchData, minPriceSelected, maxPriceSelected}
    )

    const changeSearchData = ( {dataSearch}: {dataSearch: string} ) => {
        setSearchData(dataSearch);
    }

    const changeSelectedCategory = ( {category}: {category: string} ) => {
        setSelectedCategory(category);
    }

    const changeSelectedOrder = ( {order}: {order: string}) => {
        setSelectedOrder(order);
    }

    const changeMinPriceSelected = ( {minPrice}: {minPrice: number} ) => {
        console.log(minPrice)
        minPriceSelected >= 0
            ? setMinPriceSelected(minPrice)
            : setMinPriceSelected(INITIAL_MIN_PRICE)
    }

    const changeMaxPriceSelected = ( {maxPrice}: {maxPrice: number} ) => {
        maxPrice > 0
            ?  setMaxPriceSelected(maxPrice)
            : setMaxPriceSelected(INITIAL_MAX_PRICE)
    }
    
    return (
        <div className="products-admin-section">
            <h2 className="title-page">Products ADMIN</h2>
            
            <div className="products-admin-section-content container">
                <div className="products-admin-header">
                    <ProductsAdminCreate
                        allCategories={allCategories}
                     />

                    <ProductsAdminSearch 
                        changeSearchData={changeSearchData}
                    />

                    <ProductsAdminOptions 
                        selectedCategory={selectedCategory}
                        changeSelectedCategory={changeSelectedCategory}
                        changeSelectedOrder={changeSelectedOrder}
                        changeMinPriceSelected={changeMinPriceSelected}
                        changeMaxPriceSelected={changeMaxPriceSelected}
                        selectedOrder={selectedOrder}
                        allCategories={allCategories}
                    />
                </div>

                <ProductsAdminProducts 
                    productsFiltered={productsFiltered}
                    loadingProducts={loadingProducts}
                    errorsProducts={errorsProducts}
                />
            </div>
        </div>
    )
}