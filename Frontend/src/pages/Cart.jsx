import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../components/CartContext";
import { useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const Cart = () => {
  const { cart, removeFromCart } = useContext(CartContext);
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  // Listen to Firebase Auth state
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe(); // Clean up on unmount
  }, []);

  const total = cart.reduce((acc, item) => acc + item.totalPrice, 0);

  const handleOrder = () => {
    navigate("/order");
  };

  if (!user) {
    return (
      <div className="p-6 flex justify-center items-center min-h-screen">
        <div className="bg-white rounded-xl p-8 shadow-lg text-center">
          <h1 className="text-2xl font-bold text-red-600">Please log in to access your cart</h1>
          <button
            onClick={() => navigate("/login")}
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 flex justify-center items-center min-h-screen">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-3xl mt-24 font-bold mb-6 text-center">🛒 Your Cart</h1>

        {cart.length === 0 ? (
          <p className="text-center text-gray-600">Your cart is empty.</p>
        ) : (
          <>
            <ul className="space-y-6">
              {cart.map((item) => (
                <li
                  key={item.id}
                  className="flex items-center justify-between gap-4 p-4 border-b"
                >
                  <img
                    src={item.img}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded"
                  />
                  <div className="flex-1">
                    <h2 className="font-semibold text-gray-800">{item.name}</h2>
                    <p className="text-sm text-gray-600">Price: ₹{item.price}</p>
                    <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                    <p className="text-sm font-medium text-gray-700">
                      Total: ₹{item.totalPrice}
                    </p>
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
              Total: ₹{total}
            </div>
            <div className="mt-8 flex justify-center">
              <button
                onClick={handleOrder}
                className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition duration-200"
              >
                Order Now
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;
