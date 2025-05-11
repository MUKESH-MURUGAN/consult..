import React, { useState } from "react";

const AdminPage = () => {
  const [products, setProducts] = useState([
    { id: "1", name: "Tea Powder", price: 10, detail: "Premium tea", img: "" },
    { id: "2", name: "Coffee Powder", price: 20, detail: "Strong coffee", img: "" },
  ]);

  const [form, setForm] = useState({ id: "", name: "", price: "", detail: "", img: "" });
  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isEditing) {
      setProducts((prev) =>
        prev.map((p) => (p.id === form.id ? { ...form } : p))
      );
    } else {
      setProducts((prev) => [...prev, { ...form, id: Date.now().toString() }]);
    }

    setForm({ id: "", name: "", price: "", detail: "", img: "" });
    setIsEditing(false);
  };

  const handleEdit = (product) => {
    setForm(product);
    setIsEditing(true);
  };

  const handleDelete = (id) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      {/* Product Form */}
      <form onSubmit={handleSubmit} className="mb-6 bg-white p-4 rounded shadow">
        <div className="mb-2">
          <label className="block text-sm font-medium">Product Name</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full border px-2 py-1 rounded"
          />
        </div>

        <div className="mb-2">
          <label className="block text-sm font-medium">Price</label>
          <input
            type="number"
            name="price"
            value={form.price}
            onChange={handleChange}
            required
            className="w-full border px-2 py-1 rounded"
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

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 mt-3 rounded hover:bg-blue-700"
        >
          {isEditing ? "Update Product" : "Add Product"}
        </button>
      </form>

      {/* Product List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((p) => (
          <div key={p.id} className="border p-4 rounded shadow bg-white">
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
                className="bg-yellow-400 text-white px-2 py-1 rounded hover:bg-yellow-500"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(p.id)}
                className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminPage;
