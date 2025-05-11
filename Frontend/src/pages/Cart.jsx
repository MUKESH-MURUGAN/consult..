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
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 mt-20">🛒 Your Cart</h1>

      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          <ul className="space-y-3">
            {cart.map((item) => (
              <li key={item.id} className="border-b pb-4">
                <div className="flex items-center justify-between gap-4">
                  <img
                    src={item.img}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div className="flex-1">
                    <h2 className="font-semibold">{item.name}</h2>
                    <p>Price: ${item.price}</p>
                    <p>Quantity: {item.quantity}</p>
                    <p>Total: ${item.totalPrice}</p>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-500 text-sm hover:underline"
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-4 font-bold">Total: ${total}</div>

          <button
            onClick={handleOrder}
            className="mt-6 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Order Now
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;
