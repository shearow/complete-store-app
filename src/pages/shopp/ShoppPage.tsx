import { useState, useEffect } from "react"
import { takeAllProducts } from "../../services/authService"
import { ShoppProductType } from "../../types/ShoppTypes"
import { ShoppListProducts } from "./ShoppListProducts"

export const ShoppPage = () => {
    const [allProducts, setAllProducts] = useState<ShoppProductType[]>([]);

    useEffect(() => {
        const takeData = async() => {
            (await takeAllProducts()).forEach(item => {
                setAllProducts(prev => [...prev, {
                    ...item.data(),
                    id: item.id
                } as ShoppProductType
                ])
            });
        }
        takeData();
    }, []);

    return (
        <div className="shopp-page-section">
            <h2 className="title-page">Shopp</h2>

            {allProducts && <ShoppListProducts allProducts={allProducts} />}
        </div>
    )
}