import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";

const UserLayout = () => {
  return (
    <>
      <Navbar />
      <main className=" justify-center items-start bg-gray-100">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default UserLayout;
