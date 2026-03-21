import { Link } from "react-router-dom";

function ProductCard({ product }) {
  const BASEURL = import.meta.env.VITE_DJANGO_BASE_URL;
  return (
    <Link to={`/product/${product.id}`}>
      <div className="bg-white rounded-xl shadow-md hover:shadow-lg hover:scale-[1.02] 
                transition-transform cursor-pointer
                flex flex-col h-full p-4">
        {/* Fixed height image — same for all cards */}
  <div className="w-full h-100 overflow-hidden rounded-lg">
    <img
      src={`${BASEURL}${product.image}`}
      alt={product.name}
      className="w-full h-full object-cover"
    />
  </div>
        <h2 className="text-lg text-center font-semibold text-gray-800 mt-4">
          {product.name}
        </h2>
        <p className="text-gray-600 text-center font-medium">${product.price}</p>
      </div>
    </Link>
  );
}

export default ProductCard;
