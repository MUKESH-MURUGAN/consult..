import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../components/CartContext";
import { db } from "../../Firebase";
import { addDoc, collection, Timestamp } from "firebase/firestore";

const Order = () => {
  const { cart, setCart } = useContext(CartContext); // Make sure you have a setter for the cart
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [paymentCompleted, setPaymentCompleted] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState(false);

  const total = cart.reduce((acc, item) => acc + item.totalPrice, 0);

  // Set TEST_MODE flag for controlling payment status behavior
  const TEST_MODE = true; // Set to false in production to require payment
  const navigate = useNavigate();

  // Load Razorpay script dynamically
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  // Function to remove an item from the cart
  const removeItemFromCart = (itemId) => {
    const updatedCart = cart.filter(item => item.id !== itemId);
    setCart(updatedCart); // Update the cart state
  };

  const handlePayment = () => {
    if (!email || !phone || !address) {
      alert("❗ Please enter your email, phone number, and delivery address before making payment.");
      return;
    }

    const options = {
      key: "rzp_test_OqKM3VAcZ1O5bK", // Replace with your Razorpay key
      amount: Math.round(total * 100), // Convert ₹ to paise safely
      currency: "INR",
      name: "MUKESH",
      description: "Order Payment",
      image: "/coffee-cup.png",
      handler: async function (response) {
        console.log("Payment successful", response);
        setPaymentCompleted(true);
        alert("✅ Payment successful!");
      },
      prefill: {
        email,
        contact: phone,
      },
      notes: {
        address,
      },
      theme: {
        color: "#3399cc",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const handlePlaceOrder = async () => {
    if (!email || !phone || !address) {
      alert("❗ Please enter your email, phone number, and delivery address.");
      return;
    }

    // 🚫 Check for payment only if TEST_MODE is off
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
      await addDoc(collection(db, "orders"), order);
      await addDoc(collection(db, "orderHistory"), order);
      setOrderConfirmed(true);
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
                  <img
                    src={item.img}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800">{item.name}</h3>
                    <p className="text-sm text-gray-600">price: ₹{item.price}</p>
                    <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                    <p className="text-sm font-medium text-gray-700">total: ₹{item.totalPrice}</p>
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
