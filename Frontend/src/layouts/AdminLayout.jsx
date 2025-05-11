import AdminNavbar from "../components/AdminNavbar";
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  return (
    <>
      <AdminNavbar />
      <main className="pt-20 px-5">
        <Outlet />
      </main>
    </>
  );
};

export default AdminLayout;
