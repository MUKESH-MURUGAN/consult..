import React, { useContext } from "react";
import { CartContext } from "../components/CartContext";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { cart, removeFromCart } = useContext(CartContext);
  const navigate = useNavigate(); // Hook to navigate to another page

  const total = cart.reduce((acc, item) => acc + item.totalPrice, 0);

  const handleOrder = () => {
    // Redirect to the order page
    navigate('/order');
  };

  return (
    <div className="p-6 flex justify-center items-center min-h-screen">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-3xl font-bold mb-6 text-center">🛒 Your Cart</h1>

        {cart.length === 0 ? (
          <p className="text-center text-gray-600">Your cart is empty.</p>
        ) : (
          <div>
            <ul className="space-y-6">
              {cart.map((item) => (
                <li key={item.id} className="flex items-center justify-between gap-4 p-4 border-b">
                  <img
                    src={item.img}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded"
                  />
                  <div className="flex-1">
                    <h2 className="font-semibold text-gray-800">{item.name}</h2>
                    <p className="text-sm text-gray-600">price: ₹{item.price}</p>
                    <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                    <p className="text-sm font-medium text-gray-700">total: ₹{item.totalPrice}</p>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-500 text-sm hover:underline"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
            <div className="mt-6 font-bold text-lg text-right text-gray-800">
              total: ₹{total}
            </div>

            <div className="mt-8 flex justify-center">
              <button
                onClick={handleOrder}
                className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition duration-200"
              >
                Order Now
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
