import { ShoppProductType } from "./ShoppTypes";

export interface UserOnlineType {
    id: string,
    displayName: string,
    email: string,
    imgURL: string,
    role: string,
    online: boolean
}

export interface UserContextType {
    userOnline: UserOnlineType,
    removeUserOnline?: () => Promise<void>,
}

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
    allCategories: string[],
}

export interface UseTakeProductsType {
    selectedCategory: string,
    selectedOrder: string,
    searchData: string,
    minPriceSelected: number,
    maxPriceSelected: number,
}

export interface CreateProductServiceType {
    available: boolean,
    category: string[],
    description: string,
    discountPercentage: number,
    name: string,
    images: File[],
    price: number,
    stock: number,
    thumbnail: File,
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
}

export interface ProductsAdminCardProductType {
    product: ShoppProductType,
    openModal: () => void,
    takeProductToEditData: ({ product }: {product: ShoppProductType}) => void,
}

export interface ProductsAdminEditType {
    closeModalProductEdit: () => void,
    allCategories: string[],
    product: ShoppProductType,
}

export interface EditCompleteProductServiceType {
    newData: ShoppProductType,
    imagesToDelete: string[],
    oldCategories: string[]
}