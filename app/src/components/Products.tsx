import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, deleteProduct } from '../redux/productSlice';
import { RootState, AppDispatch } from '../redux/store';
import ProductModal from './ProductModal';
import ProductList from './ProductsList';
import { Product } from '../models';

const Products = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { products, loading } = useSelector((state: RootState) => state.products);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);



  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setIsModalOpen(true);
  };



  const handleDeleteProduct = async (productId: string) => {
    await dispatch(deleteProduct(productId));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-200 flex flex-col items-center p-6">
      <header className="text-center mb-8">
        <h1 className="text-5xl font-extrabold text-gray-900 drop-shadow-md">Product's list</h1>
      </header>

      <div className="w-full max-w-6xl flex justify-end mb-6">
        <button
          className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105"
          onClick={() => setIsModalOpen(true)}
        >
          Add product
        </button>
      </div>

      <section className="w-full max-w-6xl bg-white p-8 rounded-2xl shadow-xl border border-gray-200">
        {loading ? (
          <div className="text-center text-gray-500 py-10">
            <p className="text-lg">Loading products...</p>
          </div>
        ) : products.length === 0 ? (
          <div className="text-center text-gray-500 py-10">
            <p className="text-lg">No products in the list. Add a new product.</p>
          </div>
        ) : (
          <ProductList
            products={products}
            onEditProduct={handleEditProduct}
            onDeleteProduct={handleDeleteProduct}
          />
        )}
      </section>

      {isModalOpen && (
        <ProductModal
          product={editingProduct}
          onClose={() => {
            setIsModalOpen(false);
            setEditingProduct(null);
          }}
        />
      )}
    </div>
  );
};

export default Products;
