import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserLayout from './layouts/UserLayout';
import AdminLayout from './layouts/AdminLayout';

import Home from "./pages/Home";
import Menu from "./pages/Menu";
import About from "./pages/About";
import Product from "./pages/Product";
import Login from "./pages/Login";
import Cart from './pages/Cart';
import OrderPage from './pages/OrderPage';
import AdminOverview from './components/admin/AdminOverview';
import AdminProduct from "./components/admin/Product";
import AdminOrders from "./components/admin/Orders";
import AdminFeedbacks from "./components/admin/Feedback";
import OrderHistory from "./components/OrderHistory";
import DeliveredOrders from "./components/admin/History";

function App() {
  return (
    <Router>
      <Routes>

        {/* User Routes */}
        <Route path="/" element={<UserLayout />}>
          <Route index element={<Home />} />
          <Route path="home" element={<Home />} />
          <Route path="menu" element={<Menu />} />
          <Route path="about" element={<About />} />
          <Route path="products" element={<Product />} />
          <Route path="login" element={<Login />} />
          <Route path="cart" element={<Cart />} />
          <Route path="order" element={<OrderPage />} />
          <Route path="orderhistory" element={<OrderHistory />} />
        </Route>

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="overview"  element={<AdminOverview />} />
          <Route path="products" element={<AdminProduct />} /> {/* <-- This line */}
          <Route path="orders" element={<AdminOrders />} /> {/* <-- This line */}
          <Route path="feedbacks" element={<AdminFeedbacks />} /> {/* <-- This line */}
          <Route path="history" element={<DeliveredOrders />} /> {/* <-- This line */}
        </Route>

      </Routes>
    </Router>
  );
}

export default App;
