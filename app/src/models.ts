import { CommentProd } from "./redux/types";

export interface Product {
  _id: string;
  imageUrl: string;
  name: string;
  count: number;
  size: { width: number; height: number };
  weight: string;
  comments: CommentProd[];
}

export type NewProduct = Omit<Product, '_id'>;


export interface ProductListProps {
  products: Product[];
  onEditProduct: (product: Product) => void;
  onDeleteProduct: (productId: string) => void;
}

export interface ProductItemProps {
    product: Product;
    onEdit: (product: Product) => void;
    onDelete: (productId: string) => void;
  }