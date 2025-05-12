// backend/index.js
const express = require("express");
const cors = require("cors");
const admin = require("firebase-admin");

// Initialize Firebase Admin SDK
// const serviceAccount = require("./serviceAccountKey.json"); // You need to create/download this
const serviceAccount = require("./serviceAccountKey.json"); // You need to create/download this

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const app = express();
app.use(cors());
app.use(express.json());

// Example protected route
app.post("/api/protected-route", async (req, res) => {
  const authHeader = req.headers.authorization || "";
  const token = authHeader.replace("Bearer ", "");

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    res.json({ message: `Hello ${decodedToken.email}` });
  } catch (err) {
    res.status(401).json({ error: "Unauthorized" });
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`✅ Backend server running on http://localhost:${PORT}`);
});
