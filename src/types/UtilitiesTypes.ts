import { ShoppProductType } from "./ShoppTypes";

export interface GoBackButtonType {
    navigateTo?: string,
    textProp?: string,
    classNameProp?: string,
}

export interface AdminNavbarMenuType {
    closeMenuAdmin: () => void,
    sectionAdminOn: string,
    changeSectionAdmin: ({section}: {section: string}) => void,
}

export interface AdminNavBarType {
    openMenuAdmin: () => void,
    menuActive: boolean,
}

export interface ProductsAdminSearchType {
    changeSearchData: ( {dataSearch}: {dataSearch: string} ) => void,
}

export interface ProductsAdminOptionsType {
    selectedCategory: string,
    changeSelectedCategory: ( {category}: {category: string} ) => void,
    changeSelectedOrder: ( {order}: {order: string} ) => void,
    changeMinPriceSelected: ( { minPrice }: {minPrice: number} ) => void,
    changeMaxPriceSelected: ( { maxPrice }: {maxPrice: number} ) => void,
    selectedOrder: string,
    allCategories: string[],
}

export interface ProductsAdminProductsType {
    productsFiltered: ShoppProductType[],
    loadingProducts: boolean,
    errorsProducts: string | null,
}

export interface UseTakeProductsType {
    selectedCategory: string,
    selectedOrder: string,
    searchData: string,
    minPriceSelected: number,
    maxPriceSelected: number,
}