import { useState } from "react"
import { Spinner } from "../../components/Spinner"
import { ProductsAdminCardProduct } from "./ProductsAdminCardProduct"
import { ProductsAdminEdit } from "./ProductsAdminEdit"
import { ProductsAdminProductsType } from "../../types/UtilitiesTypes"
import { ShoppProductType } from "../../types/ShoppTypes"

export const ProductsAdminProducts = ( 
    {productsFiltered, loadingProducts, errorsProducts, allCategories}: ProductsAdminProductsType
    ) => {    
    const [modalProductEdit, setModalProductEdit] = useState(false);
    const [productToEditData, setProductToEditData] = useState<ShoppProductType>();

    const openModalProductEdit = () => setModalProductEdit(true);

    const closeModalProductEdit = () => setModalProductEdit(false);

    const takeProductToEditData = ( {product}: {product: ShoppProductType} ) => {
        setProductToEditData(product);
    }

    return (
        <div className="products-admin-footer-container">
            {loadingProducts
            ? <Spinner />
            : errorsProducts
                ? <p>{errorsProducts}</p>
                : productsFiltered.length === 0
                    ? <p className="not-products">There are no products</p>
                    : 
                    <div className="products-admin-footer">
                    {productsFiltered.map(product => (
                        <ProductsAdminCardProduct 
                        key={product.id}
                        product={product} 
                        openModal={openModalProductEdit} 
                        takeProductToEditData={takeProductToEditData}
                    />                            
                    ))}
                    </div>
            }

            {modalProductEdit && 
            <ProductsAdminEdit 
                closeModalProductEdit={closeModalProductEdit} 
                allCategories={allCategories} 
                product={productToEditData}
            />
            }
        </div>
    )
}