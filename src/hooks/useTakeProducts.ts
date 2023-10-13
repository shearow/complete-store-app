import { useEffect, useState } from "react"
import { collection, getDocs, orderBy, query, where } from "firebase/firestore"
import { db } from "../config/firebase"
import { ALL_PRODUCTS } from "../const/dataConst"
import { ShoppProductType } from "../types/ShoppTypes"
import { UseTakeProductsType } from "../types/UtilitiesTypes"

export const useTakeProducts = ( 
    {selectedCategory,selectedOrder,searchData,minPriceSelected,maxPriceSelected}: UseTakeProductsType
) => {
    const [allProducts, setAllProducts] = useState<ShoppProductType[]>([]);
    const [productsFiltered, setProductsFiltered] = useState<ShoppProductType[]>([]);     
    const [loadingProducts, setLoadingProducts] = useState(false);
    const [errorsProducts, setErrorsProducts] = useState<string | null>(null);            
    const [allCategories, setAllCategories] = useState([ALL_PRODUCTS]);

    useEffect(() => {
        takeCategories();
    }, []);

    useEffect(() => {
        takeProducts();
    }, [selectedOrder, selectedCategory, searchData]);
    
    useEffect(() => {
        if(allProducts.length === 0) return;

        const filterAllProducts = allProducts.filter(product => { 
            const productWithDiscount = product.price - (product.price * product.discountPercentage / 100);
            return (
                productWithDiscount >= minPriceSelected 
                && productWithDiscount <= maxPriceSelected 
                && product.name.toLowerCase().match(searchData.toLowerCase())
            )
        });
        
        setProductsFiltered(filterAllProducts);
    }, [allProducts]);    
    
    const takeCategories = async () => {
        const categoriesRef = collection(db, "categories");
        try{
            const categoriesData = await getDocs(categoriesRef);
            const categoriesArray = categoriesData.docs.map(category => category.data().category);
            setAllCategories( [ALL_PRODUCTS, ...categoriesArray] );
        }catch(err){
            console.log(err);
        }
    }

    const takeProducts = async () => {
        if(loadingProducts) return;

        try{
            setLoadingProducts(true);
            const productsCollection = collection(db, "products");
            let q;

            if(selectedOrder === "minPrice"){
                q = selectedCategory === ALL_PRODUCTS 
                    ? query(productsCollection, orderBy("price"))
                    : query(productsCollection, orderBy("price"), where("category", "array-contains", selectedCategory))
            } else if(selectedOrder === "maxPrice"){
                q = selectedCategory === ALL_PRODUCTS 
                    ? query(productsCollection, orderBy("price", "desc"))
                    : query(productsCollection, orderBy("price", "desc"), where("category", "array-contains", selectedCategory))
            }
            
            const productsData = await getDocs(q);
            const allData = productsData.docs.map((doc) => {
                return {
                    id: doc.id,
                    ...doc.data()
                } as ShoppProductType
            });
            setAllProducts(allData);
        }catch(err){
            console.log(err)
            setErrorsProducts("Han error has ocurred." + err);
        }finally{
            setLoadingProducts(false);
        }
    }

    return {
        productsFiltered,
        loadingProducts,
        errorsProducts,
        takeProducts,
        allCategories,
    }
}