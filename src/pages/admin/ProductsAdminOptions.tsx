import { useState } from "react"
import optionsIcon from "../../assets/icons/adminIcons/options-icon.svg"
import { ALL_PRODUCTS } from "../../const/dataConst"
import { ProductsAdminOptionsType } from "../../types/UtilitiesTypes"

export const ProductsAdminOptions = ( 
    { selectedCategory,changeSelectedCategory,changeSelectedOrder,
    changeMinPriceSelected,changeMaxPriceSelected,selectedOrder,allCategories }: ProductsAdminOptionsType
    ) => {
    const [filterOn, setFilterOn] = useState(false);

    return (
        <div className="products-admin-header-options">
            <div className="products-admin-options-more">
                <span 
                    className="products-admin-options-icon"
                    onClick={() => setFilterOn(prev => !prev)}
                >
                    <img src={optionsIcon} alt="options icon" />
                </span>

                { filterOn && 
                <div className="products-admin-options-more-filters">
                    <div className="prices-selected">
                        <span>Min:</span>
                        <input 
                            type="number"
                            min={0} 
                            onChange={(e) => changeMinPriceSelected( {minPrice: Number(e.target.value)} )}
                        />
                    </div>
                    <div className="prices-selected">
                        <span>Max:</span>
                        <input 
                            type="number" 
                            min={1} 
                            onChange={(e) => changeMaxPriceSelected( {maxPrice: Number(e.target.value)} )} 
                        />
                    </div>
                </div>
                }
            </div>

            <div className="products-admin-main-options">
                <div className="products-admin-options-categories">
                    <h4>Category</h4>

                    <select value={selectedCategory} onChange={(e) => changeSelectedCategory({category: e.target.value})}>
                        <option value={ALL_PRODUCTS}>{ALL_PRODUCTS}</option>
                        {allCategories.map( (category, index) => (
                            <option key={index} value={category}>{category}</option>
                        ))};
                    </select>
                </div>

                <div className="products-admin-options-filters">
                    <h4>Order By</h4>
                    <select value={selectedOrder} onChange={(e) => changeSelectedOrder( {order: e.target.value} )}>
                        <option value="minPrice">Min Price</option>
                        <option value="maxPrice">Max Price</option>
                    </select>
                </div>
            </div>
        </div>
    )
}