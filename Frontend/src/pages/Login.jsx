import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../Firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
        alert("✅ Logged in successfully!");

        // Check if email is admin@gmail.com
        if (email === "admin@gmail.com") {
          navigate("/admin"); // Redirect to admin dashboard
        } else {
          navigate("/home"); // Redirect to home page
        }
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
        alert("✅ Account created successfully!");
        navigate("/home"); // Redirect to home page after sign-up
      }
    } catch (error) {
      setMessage(`❌ ${error.message}`);
    }
  };

  return (
    <div className="flex justify-center items-start pt-36 min-h-screen bg-gray-100">
      <div className="w-full max-w-sm p-8 bg-white rounded-lg shadow-md text-center">
        <h2 className="text-2xl font-semibold mb-6">
          {isLogin ? "Login" : "Sign Up"}
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
            required
          />
          <button
            type="submit"
            className="bg-orange-500 text-white py-2 px-4 rounded-md font-semibold hover:bg-orange-600 transition"
          >
            {isLogin ? "Login" : "Sign Up"}
          </button>
        </form>
        <p className="mt-4 text-sm">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <span
            onClick={() => setIsLogin(!isLogin)}
            className="text-blue-600 underline cursor-pointer"
          >
            {isLogin ? "Sign Up" : "Login"}
          </span>
        </p>
        {message && <p className="mt-4">{message}</p>}
      </div>
    </div>
  );
};

export default Login;
