import { Link } from "react-router-dom";
import { ProductItemProps } from "../models";

const ProductItem = ({ product, onEdit, onDelete }: ProductItemProps) => {
  const handleDelete = () => {
    if (window.confirm(`Are you sure to remove product? "${product.name}"?`)) {
      onDelete(product._id);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 ease-in-out">
      <Link
        to={`/product/${product._id}/`}
        key={product._id}
        className="text-lg font-bold"
      >
        <div className="flex items-center space-x-4">
          <img
            src={product.imageUrl || "/default-image.jpg"}
            alt={product.name}
            className="w-24 h-24 object-cover rounded-lg border border-gray-300"
          />
          <div>
            <h3 className="text-xl font-semibold text-gray-800">
              {product.name}
            </h3>
            <p className="text-gray-600">
              Count: <span className="font-semibold">{product.count}</span>
            </p>
            <p className="text-gray-500 text-sm">Weight: {product.weight}</p>
          </div>
        </div>
      </Link>
      <div className="flex justify-between mt-4">
        <button
          className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-colors duration-200"
          onClick={() => onEdit(product)}
        >
          Edit
        </button>
        <button
          className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 transition-colors duration-200"
          onClick={handleDelete}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default ProductItem;
