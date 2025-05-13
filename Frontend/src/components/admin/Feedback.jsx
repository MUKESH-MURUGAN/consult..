import React, { useEffect, useState } from "react";
import { db } from "../../../Firebase";
import { collection, getDocs } from "firebase/firestore";

const AdminFeedbacks = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchFeedbacks = async () => {
    setLoading(true);
    try {
      const snapshot = await getDocs(collection(db, "feedback"));
      const feedbackList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setFeedbacks(feedbackList);
    } catch (error) {
      console.error("Failed to fetch feedback:", error);
      alert("Failed to load feedback.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Customer Feedback</h1>

      {loading ? (
        <p>Loading feedback...</p>
      ) : (
        <div className="space-y-6">
          {feedbacks.length === 0 ? (
            <p>No feedback available.</p>
          ) : (
            feedbacks.map((fb) => (
              <div key={fb.id} className="border p-4 rounded shadow bg-white">
                <p className="text-sm text-gray-700 mb-1">
                  <strong>Email:</strong> {fb.email || "Anonymous"}
                </p>
                <p className="text-sm text-gray-700 mb-1">
                  <strong>Rating:</strong> {fb.rating ?? "N/A"}
                </p>
                <p className="text-sm text-gray-700 mb-1">
                  <strong>Message:</strong> {fb.message || "No message provided."}
                </p>
                <p className="text-sm text-gray-500">
                  <strong>Submitted At:</strong>{" "}
                  {fb.createdAt?.toDate
                    ? fb.createdAt.toDate().toLocaleString()
                    : "N/A"}
                </p>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default AdminFeedbacks;
