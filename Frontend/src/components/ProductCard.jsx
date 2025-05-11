const ProductCard = ({ id, img, name, price, detail, onView }) => {
  return (
    <div className="border border-gray-300 rounded-xl p-4 w-60 m-3 text-center mt-20 mb-10 shadow-md">
      <img src={img} alt={name} className="w-full h-40 object-cover rounded-md" />
      <h3 className="mt-3 mb-1 text-lg font-semibold">{name}</h3>
      <p className="text-sm text-gray-500">ID: {id}</p>
      <button
        onClick={() => onView({ id, img, name, price, detail })}
        className="mt-4 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition"
      >
        View
      </button>
    </div>
  );
};

export default ProductCard;
