import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { GoBackButton } from "../../../components/GoBackButton"
import { takeProductService } from "../../../services/authService"
import { Spinner } from "../../../components/Spinner"
import { Error404 } from "../../../routes/Error404"
import { ProductMainData } from "./ProductMainData"
import { ProductAllImages } from "./ProductAllImages"
import "../../../styles/shoppProductInfo.css"
/********************* TYPESCRIPT TYPES *****************************************/
import { ShoppProductType } from "../../../types/ShoppTypes"

export const ShoppProductInfo = () => {
    const [product, setProduct] = useState<ShoppProductType>();
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState(false);
    const dataParams = useParams();

    useEffect(() => {
        const takeProduct = async () => {
            try{
                setIsLoading(true);
                const dataProduct = await takeProductService({idProduct: dataParams.productId} as {idProduct: string})
                
                if(dataProduct.exists()){
                    setProduct(dataProduct.data() as ShoppProductType);
                }else {
                    setErrors(true);
                }
            }catch{
                setErrors(true);
            }finally{
                setIsLoading(false);
            }
        }
        takeProduct();
    }, []);

    return (
        <div className="shopp-product-info-section">
            {isLoading && <Spinner />}

            {errors && <Error404 />}

            {product &&
            <div className="shopp-product-info container">
                <GoBackButton navigateTo="/shopp" />
                
                <div className="product-info-content">
                    <ProductMainData product={
                        {
                            discountPercentage: product.discountPercentage,
                            name: product.name,
                            price: product.price,
                            stock: product.stock,
                            id: product.id
                        }
                    }/>

                    <ProductAllImages allImages={[product.thumbnail, ...product.images]} />
                </div>

                <div className="product-description-content">
                    <div className="product-description container">
                        <h3>Description:</h3>
                        <p>{product.description}</p>                    
                    </div>
                </div>
            </div>
            }
        </div>
    )
}