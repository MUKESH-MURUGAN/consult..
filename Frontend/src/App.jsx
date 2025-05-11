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
import AdminPage from './pages/AdminPage';

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
        </Route>

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminPage />} />
          {/* Add more admin-only routes here */}
        </Route>

      </Routes>
    </Router>
  );
}

export default App;
