import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom"; // ✅ useLocation
import { auth } from "../../Firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { SiCoffeescript } from "react-icons/si";
import { FiCheck } from "react-icons/fi";

const AdminNavbar = () => {
  const [user, setUser] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();
  const location = useLocation(); // ✅ Get current route

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    setUser(null);
    setShowDropdown(false);
    alert("Admin logged out...");
    navigate("/login");
  };

  const handleTickClick = () => {
    navigate("/admin/history");
  };

  // ✅ Helper to add active styles
  const linkClass = (path) =>
    location.pathname === path
      ? "text-orange-500 font-bold"
      : "text-white hover:text-orange-500";

  return (
    <div className="fixed w-full z-10 bg-black shadow-md">
      <div className="flex justify-between items-center px-5 lg:px-32 py-4 text-white">
        {/* Left: Logo */}
        <Link to="/" className="flex items-center gap-2 cursor-pointer">
          <SiCoffeescript size={25} />
          <h1 className="text-xl font-semibold">Admin Panel</h1>
        </Link>

        {/* Center: Navigation Links */}
        {user && (
          <nav className="flex gap-6 lg:gap-10 items-center text-sm lg:text-base">
            <Link to="/admin/overview" className={`${linkClass("/admin/overview")} font-medium`}>
              Overview
            </Link>
            <Link to="/admin/orders" className={`${linkClass("/admin/orders")} font-medium`}>
              Orders
            </Link>
            <Link to="/admin/products" className={`${linkClass("/admin/products")} font-medium`}>
              Products
            </Link>
            <Link to="/admin/feedbacks" className={`${linkClass("/admin/feedbacks")} font-medium`}>
              Feedbacks
            </Link>
          </nav>
        )}

        {/* Right: Tick Icon + User Avatar */}
        {user && (
          <div className="flex items-center gap-4">
            {/* ✅ Tick Icon */}
            <button
              onClick={handleTickClick}
              className={`transition duration-200 ${
                location.pathname === "/admin/history"
                  ? "text-green-500"
                  : "text-white hover:text-green-500"
              }`}
              title="Delivered Orders"
            >
              <FiCheck size={22} />
            </button>

            {/* User Avatar */}
            <div className="relative">
              <div
                onClick={() => setShowDropdown((prev) => !prev)}
                className="bg-orange-200 text-orange-800 w-10 h-10 flex items-center justify-center rounded-full font-bold text-lg cursor-pointer"
              >
                {user.email.charAt(0).toUpperCase()}
              </div>
              {showDropdown && (
                <div className="absolute right-0 mt-2 w-28 bg-white border rounded shadow-md z-50">
                  <button
                    onClick={handleLogout}
                    className="w-full text-white bg-black text-left px-4 py-2 text-sm hover:bg-gray-800"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminNavbar;
