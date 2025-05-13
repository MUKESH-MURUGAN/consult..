import React, { useEffect, useState } from "react";
import { db } from "../../../Firebase";
import { collection, getCountFromServer } from "firebase/firestore";

const AdminOverview = () => {
  const [orderCount, setOrderCount] = useState(0);
  const [feedbackCount, setFeedbackCount] = useState(0);
  const [loading, setLoading] = useState(false);

  const fetchCounts = async () => {
    setLoading(true);
    try {
      const ordersSnap = await getCountFromServer(collection(db, "orders"));
      const feedbackSnap = await getCountFromServer(collection(db, "feedback"));

      setOrderCount(ordersSnap.data().count);
      setFeedbackCount(feedbackSnap.data().count);
    } catch (error) {
      console.error("Failed to fetch counts:", error);
      alert("Failed to load overview data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCounts();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Admin Overview</h1>

      {loading ? (
        <p>Loading overview...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white shadow p-4 rounded">
            <h2 className="text-xl font-semibold mb-2">New Orders</h2>
            <p className="text-4xl font-bold text-blue-600">{orderCount}</p>
          </div>

          <div className="bg-white shadow p-4 rounded">
            <h2 className="text-xl font-semibold mb-2">New Feedback</h2>
            <p className="text-4xl font-bold text-green-600">{feedbackCount}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminOverview;
