import { useRef } from "react"
import searchIcon from "../../assets/icons/adminIcons/search-icon.svg"
import { ProductsAdminSearchType } from "../../types/UtilitiesTypes"

export const ProductsAdminSearch = ( {changeSearchData}: ProductsAdminSearchType ) => {    
    const searchRef = useRef(null);
    
    const searchProducts = (e: { preventDefault: () => void }) => {
        e.preventDefault();
        changeSearchData( {dataSearch: searchRef?.current?.value} );        
    }

    return (
        <div className="products-admin-header-search">
            <h3>Search Products</h3>
            <form onSubmit={searchProducts}>
                <input ref={searchRef} type="text" placeholder="Name" />
                <button type="submit">
                    <img src={searchIcon} alt="search" />
                </button>
            </form>
        </div>
    )
}