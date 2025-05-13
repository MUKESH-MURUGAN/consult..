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
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!isLogin && password !== confirmPassword) {
      setMessage("❌ Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
        alert("✅ Logged in successfully!");
        navigate(email === "adminadmin@gmail.com" ? "/admin/overview" : "/home");
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
        alert("✅ Account created successfully!");
        navigate("/home");
      }
    } catch (error) {
      setMessage(`❌ ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex justify-center items-start pt-36 bg-gray-100">
      {/* Overlay when loading */}
      {loading && (
        <div className="absolute inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center">
          <div className="bg-white px-6 py-4 rounded shadow-lg text-center">
            <div className="loader mb-2 border-4 border-orange-500 border-t-transparent rounded-full w-8 h-8 animate-spin"></div>
            <p className="text-sm font-medium text-gray-700">Please wait...</p>
          </div>
        </div>
      )}

      <div className={`w-full max-w-sm p-8 bg-white rounded-lg shadow-md text-center z-10 ${loading ? "pointer-events-none opacity-50" : ""}`}>
        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          {isLogin ? "Login to Your Account" : "Create a New Account"}
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
            required
            disabled={loading}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
            required
            disabled={loading}
          />
          {!isLogin && (
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
              required
              disabled={loading}
            />
          )}
          <button
            type="submit"
            className="bg-orange-500 text-white py-2 px-4 rounded-md font-semibold hover:bg-orange-600 transition duration-200"
            disabled={loading}
          >
            {isLogin ? "Login" : "Sign Up"}
          </button>
        </form>

        <p className="mt-4 text-sm text-gray-600">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <span
            onClick={() => {
              if (!loading) {
                setIsLogin(!isLogin);
                setMessage("");
              }
            }}
            className="text-blue-600 underline cursor-pointer"
          >
            {isLogin ? "Sign Up" : "Login"}
          </span>
        </p>

        {message && (
          <p className="mt-4 text-sm text-red-600 bg-red-100 px-3 py-2 rounded">
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default Login;
