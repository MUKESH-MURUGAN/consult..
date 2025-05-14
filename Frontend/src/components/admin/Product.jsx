import React, { useState, useEffect } from "react";
import { db } from "../../../Firebase";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

const AdminProduct = () => {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    name: "",
    price: "",
    detail: "",
    img: "",
  });
  const [editingId, setEditingId] = useState(null); // null = add mode
  const [loading, setLoading] = useState(false);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const snapshot = await getDocs(collection(db, "products"));
      const productList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProducts(productList);
    } catch (error) {
      console.error("Failed to fetch products:", error);
      alert("Failed to load products.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, price, detail, img } = form;

    if (!name || !price) {
      alert("Name and price are required.");
      return;
    }

    try {
      if (editingId) {
        // Update
        const docRef = doc(db, "products", editingId);
        await updateDoc(docRef, {
          name,
          price: parseFloat(price),
          detail,
          img,
        });
        alert("✅ Product updated!");
      } else {
        // Add
        await addDoc(collection(db, "products"), {
          name,
          price: parseFloat(price),
          detail,
          img,
        });
        alert("✅ Product added!");
      }

      setForm({ name: "", price: "", detail: "", img: "" });
      setEditingId(null);
      fetchProducts();
    } catch (err) {
      console.error("Error saving product:", err);
      alert("Failed to save product.");
    }
  };

  const handleEdit = (product) => {
    setForm({
      name: product.name,
      price: product.price,
      detail: product.detail,
      img: product.img || "",
    });
    setEditingId(product.id);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this product?");
    if (!confirmDelete) return;

    try {
      await deleteDoc(doc(db, "products", id));
      alert("🗑️ Product deleted!");
      fetchProducts();
      if (editingId === id) {
        setEditingId(null);
        setForm({ name: "", price: "", detail: "", img: "" });
      }
    } catch (err) {
      console.error("Error deleting product:", err);
      alert("Failed to delete product.");
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
    setForm({ name: "", price: "", detail: "", img: "" });
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Manage Products</h1>

      {/* Form */}
      <form onSubmit={handleSubmit} className="mb-6 bg-white p-4 rounded shadow">
        <h2 className="text-xl font-semibold mb-2">
          {editingId ? "Edit Product" : "Add New Product"}
        </h2>
        <div className="mb-2">
          <label className="block text-sm font-medium">Product Name</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full border px-2 py-1 rounded"
            required
          />
        </div>

        <div className="mb-2">
          <label className="block text-sm font-medium">Price</label>
          <input
            type="number"
            name="price"
            value={form.price}
            onChange={handleChange}
            className="w-full border px-2 py-1 rounded"
            required
          />
        </div>

        <div className="mb-2">
          <label className="block text-sm font-medium">Detail</label>
          <textarea
            name="detail"
            value={form.detail}
            onChange={handleChange}
            className="w-full border px-2 py-1 rounded"
          />
        </div>

        <div className="mb-2">
          <label className="block text-sm font-medium">Image URL</label>
          <input
            type="text"
            name="img"
            value={form.img}
            onChange={handleChange}
            className="w-full border px-2 py-1 rounded"
          />
        </div>

        <div className="flex gap-2 mt-3">
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            {editingId ? "Save Changes" : "Add Product"}
          </button>
          {editingId && (
            <button
              type="button"
              onClick={cancelEdit}
              className="text-red-600 border border-red-600 px-4 py-2 rounded hover:bg-red-50"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      {/* Product List */}
      {loading ? (
        <p>Loading products...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map((p) => (
            <div key={p.id} className="border p-4 rounded shadow bg-white relative">
              {p.img && (
                <img
                  src={p.img}
                  alt={p.name}
                  className="w-full h-40 object-cover rounded mb-2"
                />
              )}
              <h2 className="text-xl font-semibold">{p.name}</h2>
              <p className="text-sm text-gray-600 mb-1">${p.price}</p>
              <p className="text-sm text-gray-600 mb-2">{p.detail}</p>

              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(p)}
                  className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(p.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminProduct;
