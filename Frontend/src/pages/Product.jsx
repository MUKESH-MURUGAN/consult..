import React, { useState, useContext } from "react";
import ProductCard from "../components/ProductCard";
import { CartContext } from "../components/CartContext";
import coffeeBean from "../assets/coffee01.webp";
import coffeePowder from "../assets/coffee02.webp";
import Choco from "../assets/choco.jpg";
const Product = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useContext(CartContext);

  const handleView = (product) => {
    setSelectedProduct(product);
    setQuantity(1);
  };

  const handleAddToCart = () => {
    addToCart(selectedProduct, quantity);
    setSelectedProduct(null);
  };

  const products = [
    {
      id: "1",
      name: "tea Powder",
      img: coffeeBean,
      price: 10,
      detail: "Premium quality tea powder made from fresh leaves.",
    },
    {
      id: "2",
      name: "coffee Powder",
      img: coffeePowder,
      price: 20,
      detail: "Strong and aromatic coffee powder for a perfect brew.",
    },
    {
      id: "3",
      name: "sweet",
      img: Choco,
      price: 20,
      detail: "Delicious traditional sweet made with pure ingredients.",
    },
  ];
  
  return (
    <div className="p-4">
<div className="p-4 relative mt-20">
  <h1 className="text-2xl font-bold mb-4">Product List</h1>

  <div className={`flex flex-wrap transition duration-300 ${selectedProduct ? "blur-sm" : ""}`}>
    {products.map((p) => (
      <ProductCard key={p.id} {...p} onView={handleView} />
    ))}
  </div>

  {selectedProduct && (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-80">
        {/* modal content */}
      </div>
    </div>
  )}
</div>



      {selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-80">
            <img
              src={selectedProduct.img}
              alt={selectedProduct.name}
              className="w-full h-40 object-cover rounded-md"
            />
            <h2 className="text-xl font-semibold mt-3">{selectedProduct.name}</h2>
            <p className="text-gray-700 mt-1">Price: ${selectedProduct.price}</p>
            <p className="text-gray-600 mt-1">{selectedProduct.detail}</p>

            <div className="mt-3">
              <label className="block text-sm">Quantity:</label>
              <input
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="border px-2 py-1 w-full rounded mt-1"
              />
            </div>


            <p className="mt-2 font-semibold">
              Total: ${selectedProduct.price * quantity}
            </p>

            <div className="flex justify-between mt-4">
              <button
                onClick={handleAddToCart}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              >
                Add to Cart
              </button>
              <button
                onClick={() => setSelectedProduct(null)}
                className="text-red-500"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Product;
