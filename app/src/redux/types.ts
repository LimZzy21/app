export interface Product {
    _id: string;
    name: string;
    imageUrl: string;
    count: number;
    size: { width: number; height: number };
    weight: string;
    comments: CommentProd[];
  }

  export interface CommentProd {
    id?: string; 
    productId: string;
    text: string;
    createdAt: string; 
  }
  
 export interface ProductState {
    products: Product[];
    product: Product | null,
    loading: boolean;
    error: string | null;
  }

  