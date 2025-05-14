import React, { useEffect, useState } from "react";
import { db } from "../../Firebase";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  query,
  orderBy
} from "firebase/firestore";

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const orderRef = collection(db, "orderHistory");
      const q = query(orderRef, orderBy("createdAt", "desc"));
      const snapshot = await getDocs(q);
      const orderList = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setOrders(orderList);
    } catch (error) {
      console.error("Error fetching order history:", error);
      alert("Failed to fetch order history.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirm = window.confirm("Are you sure you want to delete this order?");
    if (!confirm) return;

    try {
      await deleteDoc(doc(db, "orderHistory", id));
      setOrders(prev => prev.filter(order => order.id !== id));
      alert("Order deleted.");
    } catch (error) {
      console.error("Error deleting order:", error);
      alert("Failed to delete order.");
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl mt-24 font-bold mb-6 text-center text-gray-800">📜 Order History</h1>

      {loading ? (
        <p className="text-center text-gray-500">Loading orders...</p>
      ) : orders.length === 0 ? (
        <p className="text-center text-gray-500">No orders found.</p>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order.id} className="border p-4 rounded-lg shadow-sm">
              <div className="flex justify-between items-center">
                <div>
                  <p><strong>Email:</strong> {order.email}</p>
                  <p><strong>Phone:</strong> {order.phone}</p>
                  <p><strong>Address:</strong> {order.address}</p>
                  <p><strong>Total:</strong> ₹{order.total}</p>
                  <p className="text-sm text-gray-500">
                    <strong>Ordered on:</strong>{" "}
                    {order.createdAt?.toDate().toLocaleString() || "Unknown"}
                  </p>
                </div>
                <button
                  onClick={() => handleDelete(order.id)}
                  className="text-red-600 hover:text-red-800"
                >
                  🗑 Delete
                </button>
              </div>

              <div className="mt-4">
                <p className="font-semibold mb-2">Items:</p>
                <ul className="space-y-1 text-sm">
                  {order.items?.map((item, index) => (
                    <li key={index} className="text-gray-700">
                      {item.name} (x{item.quantity}) - ₹{item.totalPrice}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderHistory;
