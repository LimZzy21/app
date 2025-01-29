import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { fetchProductById, addCommentProd } from "../redux/productSlice";

const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const product = useSelector((state: RootState) => state.products.product);

  const [comment, setComment] = useState<string>("");

  useEffect(() => {
    if (id) {
      dispatch(fetchProductById(id));
    }
  }, [id, dispatch]);

  const handleAddComment = () => {
    if (!comment.trim() || !id) return;
    dispatch(addCommentProd({ productId: id, text: comment }));
    setComment("");
  };

  if (!product) return <p className="text-center">Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-4">{product.name}</h1>
    
      <img
        src={product.imageUrl}
        alt={product.name}
        className="w-full h-64 object-fill mb-4 rounded-lg"
      />
      <p className="text-gray-700">Count: {product.count}</p>
      <p className="text-gray-700">
        Size: {product.size.width} x {product.size.height}
      </p>
      <p className="text-gray-700">Weight: {product.weight}</p>

      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-3">Comments</h2>
        
        <div className="mb-4 flex">
          <input
            type="text"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="flex-1 p-2 border border-gray-300 rounded-l focus:outline-none"
            placeholder="Add a comment..."
          />
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-r hover:bg-blue-600 transition"
            onClick={handleAddComment}
          >
            Add
          </button>
        </div>

        <ul className="space-y-3">
          {product.comments?.map((comment, index) => {
            const commentText = typeof comment === "string" ? comment : comment.text;
            const createdAt = typeof comment === "string" ? null : comment.createdAt;

            const formattedDate = createdAt
              ? new Intl.DateTimeFormat("uk-UA", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                }).format(new Date(createdAt))
              : "";

            return (
              <li key={index} className="bg-gray-50 p-3 rounded-lg border border-gray-200 shadow-sm">
                <p className="text-gray-800">{commentText}</p>
                {createdAt && (
                  <p className="text-gray-500 text-sm mt-1">🕒 {formattedDate}</p>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default ProductDetails;
