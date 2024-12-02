import { ProductStore } from '@/types/types';
import { create } from 'zustand';

export const useProductStore = create<ProductStore>((set) => ({
    products: [],
    setProducts: (products) => set({ products }),
    createProduct: async (newProduct) => {
        const res = await fetch('/api/v1/products', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newProduct),
        });
        const data = await res.json();
        set((state) => ({ products: [...state.products, data.data] }));
        return data;
    },
    fetchProducts: async () => {
        const res = await fetch('/api/v1/products');
        const data = await res.json();
        set({ products: data.data });
    },
    deleteProduct: async (id) => {
        const res = await fetch(`/api/v1/products/${id}`, {
            method: 'DELETE',
        });
        const data = await res.json();
        set((state) => ({
            products: state.products.filter((product) => product._id !== id),
        }));
        return data;
    },
    updateProduct: async (id, updatedProduct) => {
        const res = await fetch(`/api/v1/products/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedProduct),
        });
        const data = await res.json();
        if (data.success) {
            set((state) => ({
                products: state.products.map((product) =>
                    product._id === id ? data.data : product
                ),
            }));
        }
        return data;
    },
}));
