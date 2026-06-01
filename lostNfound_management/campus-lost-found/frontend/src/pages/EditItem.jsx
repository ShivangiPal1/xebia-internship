import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate, useParams } from "react-router-dom";
import Loader from "../components/Loader.jsx";
import { getItem, updateItem } from "../services/api.js";

function EditItem() {
  const [formData, setFormData] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const { data } = await getItem(id);
        setFormData({
          title: data.title,
          description: data.description,
          category: data.category,
          location: data.location,
          status: data.status
        });
      } catch (error) {
        toast.error(error.response?.data?.message || "Could not load item");
        navigate("/");
      }
    };

    fetchItem();
  }, [id, navigate]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((currentData) => ({ ...currentData, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);

    try {
      await updateItem(id, formData);
      toast.success("Item updated successfully");
      navigate(`/items/${id}`);
    } catch (error) {
      toast.error(error.response?.data?.message || "Could not update item");
    } finally {
      setSubmitting(false);
    }
  };

  if (!formData) {
    return <Loader message="Loading item details..." />;
  }

  return (
    <section className="mx-auto max-w-3xl">
      <div className="mb-6">
        <p className="text-sm font-bold uppercase tracking-wide text-campus-teal">
          Update report
        </p>
        <h1 className="mt-2 text-3xl font-extrabold text-campus-ink">
          Edit Item
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
          <Link to={`/items/${id}`} className="secondary-button">
            Cancel
          </Link>
          <button type="submit" disabled={submitting} className="primary-button">
            {submitting ? "Updating..." : "Update Item"}
          </button>
        </div>
      </form>
    </section>
  );
}

export default EditItem;
