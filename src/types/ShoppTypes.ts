
export interface ShoppProductType {
    available: boolean,
    category: string,
    description: string,
    discountPercentage: number,
    images: string[],
    name: string,
    price: number,
    stock: number,
    thumbnail: string,
    id?: string
}

export interface ProductMainDataType {
    discountPercentage: number,
    name: string,
    price: number,
    stock: number,
    id: string
}