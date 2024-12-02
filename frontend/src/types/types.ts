export type ProductType = {
    _id: string; 
    name: string; 
    price: number | string; 
    image: string; 
    createdAt: Date; 
    updatedAt: Date; 
    __v: number;
};

export type NewProductType = {
    name: string;
    price: number | string;
    image: string;
};

export type ProductResponse = {
    success: boolean;
    message?: string;
    data?: ProductType;
};

export interface ProductStore {
    products: ProductType[];
    setProducts: (products: ProductType[]) => void;
    createProduct: (newProduct: NewProductType) => Promise<ProductResponse>;
    fetchProducts: () => Promise<void>;
    deleteProduct: (id: string) => Promise<ProductResponse>;
    updateProduct: (id: string, updatedProduct: ProductType) => Promise<ProductResponse>;
}
