import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { NewProduct, Product } from '../models';
import { AppDispatch } from '../redux/store';
import { addProduct, editProduct } from '../redux/productSlice';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
}

const ProductModal: React.FC<ProductModalProps> = ({ product, onClose }) => {
  const dispatch = useDispatch<AppDispatch>();

  const [name, setName] = useState('');
  const [count, setCount] = useState(0);
  const [imageUrl, setImageUrl] = useState('');
  const [size, setSize] = useState({ width: 100, height: 100 });
  const [weight, setWeight] = useState('0g');

  useEffect(() => {
    if (product) {
      setName(product.name);
      setCount(product.count);
      setImageUrl(product.imageUrl);
      setSize(product.size);
      setWeight(product.weight);
    } else {
      setName('');
      setCount(0);
      setImageUrl('');
      setSize({ width: 100, height: 100 });
      setWeight('0g');
    }
  }, [product]);

  const handleSave = () => {
    if (!name.trim() || count <= 0) return;

    if (product) {
      const updatedProduct: Product = {
        ...product,
        name,
        count,
        imageUrl,
        size,
        weight,
      };
      dispatch(editProduct(updatedProduct));
    } else {
      const newProduct: NewProduct = {
        name,
        count,
        imageUrl,
        size,
        weight,
        comments: []
      };
      dispatch(addProduct(newProduct));
    }

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-gray-950/75 flex justify-center items-center">
      <div className="bg-white p-6 rounded shadow-lg w-96">
        <h2 className="text-xl font-semibold mb-4">{product ? 'Edit product' : 'Add product'}</h2>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Product Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Enter product name"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Count</label>
          <input
            type="number"
            value={count}
            onChange={(e) => setCount(Number(e.target.value))}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Enter count"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Image URL</label>
          <input
            type="text"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Enter image URL"
          />
        </div>

        <div className="mb-4 flex space-x-2">
          <div>
            <label className="block text-sm font-medium text-gray-700">Width</label>
            <input
              type="number"
              value={size.width}
              onChange={(e) => setSize({ ...size, width: Number(e.target.value) })}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Width"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Height</label>
            <input
              type="number"
              value={size.height}
              onChange={(e) => setSize({ ...size, height: Number(e.target.value) })}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Height"
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Weight</label>
          <input
            type="text"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Enter weight (e.g., 500g)"
          />
        </div>

        <div className="flex justify-between">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={handleSave}
          >
            Save
          </button>
          <button
            className="bg-gray-500 text-white px-4 py-2 rounded"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
