import React, { useEffect, useState } from "react";
import { db } from "../../../Firebase";
import { collection, getDocs } from "firebase/firestore";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const snapshot = await getDocs(collection(db, "orders"));
      const orderList = snapshot.docs.map((doc) => {
        const data = doc.data();
        const items = Object.values(data.items || {}); // Convert from object to array
        return {
          id: doc.id,
          ...data,
          items,
        };
      });
      setOrders(orderList);
    } catch (error) {
      console.error("Failed to fetch orders:", error);
      alert("Failed to load orders.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Manage Orders</h1>

      {loading ? (
        <p>Loading orders...</p>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order.id} className="border p-4 rounded shadow bg-white">
              <h2 className="text-xl font-semibold mb-2">Order ID: {order.id}</h2>
              <p className="text-sm text-gray-700">
                <strong>Email:</strong> {order.email}
              </p>
              <p className="text-sm text-gray-700">
                <strong>Address:</strong> {order.address}
              </p>
              <p className="text-sm text-gray-700 mb-2">
                <strong>Created At:</strong>{" "}
                {order.createdAt?.toDate
                  ? order.createdAt.toDate().toLocaleString()
                  : "N/A"}
              </p>

              <div className="space-y-3">
                <h3 className="text-lg font-medium mb-2">Items:</h3>
                {order.items?.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-4 border p-2 rounded">
                    <img
                      src={item.img}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded"
                    />
                    <div>
                      <p className="font-semibold">{item.name}</p>
                      <p className="text-sm text-gray-600">Price: ${item.price}</p>
                      <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                      <p className="text-sm text-gray-600">
                        Total: ${item.totalPrice}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <p className="text-right mt-4 font-bold text-lg text-green-600">
                Total Amount: ${order.total}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminOrders;
