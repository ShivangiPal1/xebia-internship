import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { createItem } from "../services/api.js";

const initialFormData = {
  title: "",
  description: "",
  category: "",
  location: "",
  status: "lost"
};

function AddItem() {
  const [formData, setFormData] = useState(initialFormData);
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((currentData) => ({ ...currentData, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);

    try {
      await createItem(formData);
      toast.success("Item added successfully");
      navigate("/");
    } catch (error) {
      toast.error(error.response?.data?.message || "Could not add item");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="mx-auto max-w-3xl">
      <div className="mb-6">
        <p className="text-sm font-bold uppercase tracking-wide text-campus-teal">
          New report
        </p>
        <h1 className="mt-2 text-3xl font-extrabold text-campus-ink">
          Add Lost or Found Item
        </h1>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-5 rounded-lg border border-slate-200 bg-white p-6 shadow-soft"
      >
        <div>
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="form-input"
            placeholder="Black wallet, blue bottle, ID card..."
            required
          />
        </div>

        <div>
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="form-input min-h-32 resize-y"
            placeholder="Add helpful details such as color, brand, markings, or when it was seen."
            required
          />
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="category" className="form-label">
              Category
            </label>
            <input
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="form-input"
              placeholder="Electronics"
              required
            />
          </div>

          <div>
            <label htmlFor="location" className="form-label">
              Location
            </label>
            <input
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="form-input"
              placeholder="Library, cafeteria, lab..."
              required
            />
          </div>
        </div>

        <div>
          <label htmlFor="status" className="form-label">
            Status
          </label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="form-input"
          >
            <option value="lost">Lost</option>
            <option value="found">Found</option>
            <option value="resolved">Resolved</option>
          </select>
        </div>

        <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <Link to="/" className="secondary-button">
            Cancel
          </Link>
          <button type="submit" disabled={submitting} className="primary-button">
            {submitting ? "Saving..." : "Save Item"}
          </button>
        </div>
      </form>
    </section>
  );
}

export default AddItem;
