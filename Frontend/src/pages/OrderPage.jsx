import React, { useContext, useState } from "react";
import { CartContext } from "../components/CartContext";
import { db } from "../../Firebase";
import { addDoc, collection, Timestamp } from "firebase/firestore";

const Order = () => {
  const { cart } = useContext(CartContext);
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [orderConfirmed, setOrderConfirmed] = useState(false);

  const total = cart.reduce((acc, item) => acc + item.totalPrice, 0);

  const handlePlaceOrder = async () => {
    if (!address || !email) {
      alert("Please fill in your address and email.");
      return;
    }

    // Create an order object
    const order = {
      items: cart,
      total,
      address,
      email,
      createdAt: Timestamp.now(),
    };

    try {
      // Save the order in Firestore
      await addDoc(collection(db, "orders"), order);

      // Set order as confirmed
      setOrderConfirmed(true);

      // Clear cart (if required)
      // clearCart();

      // Send a notification to the user and owner (simplified version)
      alert("Order placed successfully. You will receive an email confirmation.");
    } catch (error) {
      console.error("Error placing order: ", error);
      alert("Something went wrong. Please try again later.");
    }
  };

  const handleConfirmation = () => {
    alert("Order Confirmed! You will receive an email confirmation shortly.");
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 mt-20">📝 Order Summary</h1>

      {cart.length === 0 ? (
        <p>Your cart is empty. Please add items to your cart.</p>
      ) : (
        <div>
          <h2 className="font-semibold">Ordered Items</h2>
          <ul className="space-y-3 mt-4">
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
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-4 font-bold">Total: ${total}</div>

          <h2 className="font-semibold mt-6">Delivery Information</h2>
          <div className="mt-4">
            <label className="block text-sm">Email Address:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border px-2 py-1 w-full rounded mt-1"
            />
          </div>
          <div className="mt-4">
            <label className="block text-sm">Delivery Address:</label>
            <textarea
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="border px-2 py-1 w-full rounded mt-1"
            />
          </div>

          <div className="mt-4 flex justify-between">
            {/* Payment Button (Placeholder for now) */}
            <button
              onClick={() => alert("Payment functionality coming soon.")}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              Pay Now
            </button>

            {/* Confirm Order Button */}
            <button
              onClick={handlePlaceOrder}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Place Order
            </button>
          </div>

          {orderConfirmed && (
            <div className="mt-4 text-green-500">
              <p>Thank you for your order! We will process it shortly.</p>
              <button
                onClick={handleConfirmation}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
              >
                Confirm Order
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Order;
