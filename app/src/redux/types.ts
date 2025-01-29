export interface Product {
    _id: string;
    name: string;
    imageUrl: string;
    count: number;
    size: { width: number; height: number };
    weight: string;
    comments: string[];
  }
  
 export interface ProductState {
    products: Product[];
    product: Product | null,
    loading: boolean;
    error: string | null;
  }

  