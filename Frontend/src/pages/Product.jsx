import React, { useState, useEffect, useContext } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../Firebase";
import { CartContext } from "../components/CartContext";

const Product = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [priceFilter, setPriceFilter] = useState("all");

  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "products"));
        const productList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProducts(productList);
        setFilteredProducts(productList);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [searchTerm, categoryFilter, priceFilter]);

  const applyFilters = () => {
    const term = searchTerm.toLowerCase();
    const filtered = products.filter((product) => {
      const matchName = product.name.toLowerCase().includes(term);
      const matchCategory =
        categoryFilter === "all" || product.category === categoryFilter;

      const price = parseFloat(product.price);
      const matchPrice =
        priceFilter === "all" ||
        (priceFilter === "50-100" && price >= 50 && price <= 100) ||
        (priceFilter === "100-150" && price > 100 && price <= 150) ||
        (priceFilter === "150+" && price > 150);

      return matchName && matchCategory && matchPrice;
    });

    setFilteredProducts(filtered);
  };

  const handleView = (product) => {
    if (product.stock === 0) return;
    setSelectedProduct(product);
    setQuantity(1);
  };

  const handleAddToCart = () => {
    addToCart(selectedProduct, quantity);
    setSelectedProduct(null);
  };

  return (
    <div className="p-4">
      <div className="p-4 relative mt-20">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
          <h1 className="text-2xl font-bold">Product List</h1>
          <div className="flex flex-wrap gap-2">
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border px-2 py-1 rounded"
            />

            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="border px-2 py-1 rounded"
            >
              <option value="all">All Categories</option>
              <option value="tea">Tea</option>
              <option value="coffee">Coffee</option>
              <option value="sweet">Sweet</option>
            </select>

            <select
              value={priceFilter}
              onChange={(e) => setPriceFilter(e.target.value)}
              className="border px-2 py-1 rounded"
            >
              <option value="all">All Prices</option>
              <option value="50-100">₹50 - ₹100</option>
              <option value="100-150">₹100 - ₹150</option>
              <option value="150+">₹150+</option>
            </select>
          </div>
        </div>

        <div
          className={`flex flex-wrap gap-4 transition duration-300 ${
            selectedProduct ? "blur-sm" : ""
          }`}
        >
          {filteredProducts.length > 0 ? (
            filteredProducts.map((p) => {
              const outOfStock = p.stock === 0;
              return (
                <div
                  key={p.id}
                  className="border rounded-md p-4 shadow-md w-64 bg-white transition"
                >
                  <div
                    className={`relative ${
                      outOfStock ? "cursor-not-allowed" : "cursor-pointer"
                    }`}
                    onClick={() => handleView(p)}
                  >
                    <img
                      src={p.img}
                      alt={p.name}
                      className={`w-full h-40 object-cover rounded-md transition ${
                        outOfStock ? "blur-sm opacity-50" : ""
                      }`}
                    />
                    {outOfStock && (
                      <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
                        Out of Stock
                      </div>
                    )}
                  </div>
                  <h2 className="text-lg font-semibold mt-2">{p.name}</h2>
                  <p className="text-gray-700 mt-1">Price: ₹{p.price}</p>
                  <p className="text-gray-500 text-sm italic">
                    Category: {p.category}
                  </p>
                  <p className="text-gray-600 text-sm mt-1 line-clamp-2">
                    {p.detail}
                  </p>
                  <button
                    className={`mt-2 underline ${
                      outOfStock
                        ? "text-gray-400 cursor-not-allowed"
                        : "text-blue-500 hover:text-blue-600"
                    }`}
                    disabled={outOfStock}
                  >
                    {outOfStock ? "Out of Stock" : "View"}
                  </button>
                </div>
              );
            })
          ) : (
            <p className="text-gray-500">No products found.</p>
          )}
        </div>

        {selectedProduct && (
  <div className="fixed inset-0 mt-10 bg-opacity-99 flex items-center justify-center z-50">
    <div className="bg-white rounded-2xl shadow-lg w-96 p-6 relative">
      <button
        onClick={() => setSelectedProduct(null)}
        className="absolute top-3 right-3 text-gray-500 hover:text-red-500"
        title="Close"
      >
        ✕
      </button>

      <img
        src={selectedProduct.img}
        alt={selectedProduct.name}
        className="w-full h-48 object-cover rounded-lg mb-4"
      />

      <h2 className="text-2xl font-bold text-gray-800">{selectedProduct.name}</h2>
      <p className="text-lg text-green-600 font-semibold mt-2">
        ₹{selectedProduct.price}
      </p>
      <p className="text-sm text-gray-500 italic mt-1">
        Category: {selectedProduct.category}
      </p>
      <p className="text-gray-700 text-sm mt-3">
        {selectedProduct.detail}
      </p>

      <div className="mt-4">
        <label className="block text-sm font-medium text-gray-700">
          Quantity:
        </label>
        <input
          type="number"
          min="1"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
        />
      </div>

      <p className="mt-3 font-medium text-right text-gray-700">
        Total: ₹{selectedProduct.price * quantity}
      </p>

      <div className="mt-5 flex justify-between">
        <button
          onClick={handleAddToCart}
          className="bg-green-500 text-white font-semibold px-4 py-2 rounded-lg hover:bg-green-600 transition"
        >
          Add to Cart
        </button>
        <button
          onClick={() => setSelectedProduct(null)}
          className="text-gray-600 hover:text-red-500 transition"
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
)}

      </div>
    </div>
  );
};

export default Product;
