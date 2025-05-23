import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { auth } from "../../Firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { SiCoffeescript } from "react-icons/si";
import { BsCart4 } from "react-icons/bs";
import Button from "../layouts/Button";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [menu, setMenu] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

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
    alert("User logged out...");
    navigate("/login");
  };

  const handleMenuToggle = () => {
    setMenu(!menu);
  };

  const isActive = (path) => location.pathname === path;

  return (
    <div className="fixed w-full z-10">
      <div className="flex flex-row justify-between p-5 lg:px-32 px-5 bg-gradient-to-r from-gray-800 to-gray-900 shadow-[0_3px_10px_rgb(0,0,0,0.4)] text-white">
        <div className="flex flex-row items-center cursor-pointer gap-2">
          <SiCoffeescript size={25} />
          <h1 className="text-xl font-semibold">Black pekoe</h1>
        </div>

        <nav className="hidden md:flex flex-row items-center text-lg font-medium gap-8">
  <Link
    to="/home"
    className={`pb-1 ${isActive("/home") ? "border-b-4 border-orange-500" : ""}`}
  >
    Home
  </Link>
  <Link
    to="/menu"
    className={`pb-1 ${isActive("/menu") ? "border-b-4 border-orange-500" : ""}`}
  >
    Shop Menu
  </Link>
  <Link
    to="/about"
    className={`pb-1 ${isActive("/about") ? "border-b-4 border-orange-500" : ""}`}
  >
    About Us
  </Link>
  <Link
    to="/products"
    className={`pb-1 ${isActive("/products") ? "border-b-4 border-orange-500" : ""}`}
  >
    Products
  </Link>
   <Link
    to="/cart"
    className={`flex items-center gap-1 pb-1 ${
      isActive("/cart") ? "border-b-4 border-orange-500" : ""
    }`}
  >
    <BsCart4 /> Cart
  </Link>
  <Link
    to="/orderhistory"
    className={`pb-1 ${isActive("/orders") ? "border-b-4 border-orange-500" : ""}`}
  >
    Order History
  </Link>
 
</nav>


        <div className="hidden lg:flex items-center gap-4">
          {user ? (
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
          ) : (
            <Button title="Login/signup" onClick={() => navigate("/login")} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
