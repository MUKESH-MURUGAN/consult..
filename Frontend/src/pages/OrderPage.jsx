import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../components/CartContext";
import { db } from "../../Firebase";
import {
  addDoc,
  collection,
  Timestamp,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";

const Order = () => {
  const { cart, setCart } = useContext(CartContext);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [paymentCompleted, setPaymentCompleted] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState(false);

  const total = cart.reduce((acc, item) => acc + item.totalPrice, 0);

  const TEST_MODE = true; // Toggle for payment requirement
  const navigate = useNavigate();

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  const removeItemFromCart = (itemId) => {
    const updatedCart = cart.filter((item) => item.id !== itemId);
    setCart(updatedCart);
  };

  const handlePayment = () => {
    if (!email || !phone || !address) {
      alert("❗ Please enter your email, phone number, and delivery address before making payment.");
      return;
    }

    const options = {
      key: "rzp_test_OqKM3VAcZ1O5bK",
      amount: Math.round(total * 100),
      currency: "INR",
      name: "MUKESH",
      description: "Order Payment",
      image: "/coffee-cup.png",
      handler: async function (response) {
        console.log("Payment successful", response);
        setPaymentCompleted(true);
        alert("✅ Payment successful!");
      },
      prefill: { email, contact: phone },
      notes: { address },
      theme: { color: "#3399cc" },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const handlePlaceOrder = async () => {
    if (!email || !phone || !address) {
      alert("❗ Please enter your email, phone number, and delivery address.");
      return;
    }

    if (!TEST_MODE && !paymentCompleted) {
      alert("❌ You must complete the payment before placing the order.");
      return;
    }

    const order = {
      items: cart,
      total,
      email,
      phone,
      address,
      createdAt: Timestamp.now(),
    };

    try {
      // Save order to Firestore
      await addDoc(collection(db, "orders"), order);
      await addDoc(collection(db, "orderHistory"), order);

      // Reduce stock for each item
      for (const item of cart) {
        const productRef = doc(db, "products", item.id);
        const productSnapshot = await getDoc(productRef);

        if (productSnapshot.exists()) {
          const currentStock = productSnapshot.data().stock;
          const updatedStock = Math.max(currentStock - item.quantity, 0);
          await updateDoc(productRef, { stock: updatedStock });
        } else {
          console.warn(`⚠️ Product with ID ${item.id} not found in Firestore.`);
        }
      }

      setOrderConfirmed(true);
      setCart([]); // Clear cart after placing order
      navigate("/orderhistory");
    } catch (error) {
      console.error("Order failed:", error);
      alert("❌ Failed to place order. Please try again.");
    }
  };

  return (
    <div className="flex justify-center items-start px-4">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-lg m-20 p-6">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">📝 Order Summary</h1>

        {cart.length === 0 ? (
          <p className="text-center text-gray-600">Your cart is empty. Please add items to your cart.</p>
        ) : (
          <div>
            <h2 className="text-xl font-semibold mb-2 text-gray-700">Ordered Items</h2>
            <ul className="space-y-4">
              {cart.map((item) => (
                <li key={item.id} className="flex gap-4 items-center border rounded-lg p-3 shadow-sm">
                  <img src={item.img} alt={item.name} className="w-16 h-16 object-cover rounded-lg" />
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800">{item.name}</h3>
                    <p className="text-sm text-gray-600">Price: ₹{item.price}</p>
                    <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                    <p className="text-sm font-medium text-gray-700">Total: ₹{item.totalPrice}</p>
                  </div>
                  <button
                    onClick={() => removeItemFromCart(item.id)}
                    className="text-red-500 hover:text-red-600"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>

            <div className="text-lg font-bold text-right mt-6 text-gray-800">
              Total: ₹{total}
            </div>

            <h2 className="text-xl font-semibold mt-8 mb-2 text-gray-700">Delivery Information</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-600">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="border border-gray-300 px-3 py-2 rounded-lg w-full mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600">Phone Number</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="e.g. 9876543210"
                  className="border border-gray-300 px-3 py-2 rounded-lg w-full mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600">Delivery Address</label>
                <textarea
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="border border-gray-300 px-3 py-2 rounded-lg w-full mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
            </div>

            <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-end">
              <button
                onClick={handlePayment}
                className="bg-green-500 hover:bg-green-600 text-white px-5 py-2 rounded-lg transition"
                disabled={paymentCompleted}
              >
                {paymentCompleted ? "✅ Payment Done" : "Pay Now"}
              </button>

              <button
                onClick={handlePlaceOrder}
                className={`px-5 py-2 rounded-lg text-white transition ${
                  TEST_MODE || paymentCompleted
                    ? "bg-blue-500 hover:bg-blue-600"
                    : "bg-gray-400 cursor-not-allowed"
                }`}
                disabled={!TEST_MODE && !paymentCompleted}
              >
                Place Order
              </button>
            </div>

            {orderConfirmed && (
              <div className="mt-6 bg-green-100 border border-green-300 p-4 rounded-lg text-center">
                <p className="text-green-700 font-medium">
                  ✅ Thank you for your order! A confirmation email will be sent shortly.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Order;
