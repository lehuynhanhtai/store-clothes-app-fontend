import { Store } from '@tanstack/store';

interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  subcategory: string;
  sizes: string[];
  colors: string[];
  images: string[];
  rating: number;
  reviews: number;
  isNew: boolean;
  isFeatured: boolean;
  isTrending: boolean;
}

interface ProductStoreState {
  products: Product[];
}

// Create a store
export const productStore = new Store<ProductStoreState>({
  products: [],
});

// Add a product
export function addProduct(product: Product) {
  productStore.setState(state => {
    return {
      ...state,
      products: [...state.products, product],
    };
  });
}

// Hàm xóa sản phẩm
export const removeProduct = (id: string) => {
  productStore.setState((prev: ProductStoreState) => ({
    products: prev.products.filter(p => p.id !== id),
  }));
};
