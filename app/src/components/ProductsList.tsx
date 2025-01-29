
import ProductItem from './ProductItem';
import { Product, ProductListProps } from '../models';



const ProductList: React.FC<ProductListProps> = ({products, onEditProduct, onDeleteProduct }) => {

  

  return (
    <div>
      {products.length === 0 ? (
        <p>Loading...</p>
      ) : (
        <div className="space-y-4">
          {products.map((product: Product) => (
            <ProductItem
              key={product._id}
              product={product}
              onEdit={onEditProduct}
              onDelete={onDeleteProduct}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductList;
