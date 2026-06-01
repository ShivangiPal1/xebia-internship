import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate, useParams } from "react-router-dom";
import Loader from "../components/Loader.jsx";
import { deleteItem, getItem, updateItem } from "../services/api.js";

const badgeStyles = {
  lost: "bg-red-50 text-red-700 ring-red-100",
  found: "bg-amber-50 text-amber-700 ring-amber-100",
  resolved: "bg-emerald-50 text-emerald-700 ring-emerald-100"
};

function ItemDetails() {
  const [item, setItem] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const { data } = await getItem(id);
        setItem(data);
      } catch (error) {
        toast.error(error.response?.data?.message || "Could not load item");
        navigate("/");
      }
    };

    fetchItem();
  }, [id, navigate]);

  const handleDelete = async () => {
    const shouldDelete = window.confirm("Delete this item permanently?");

    if (!shouldDelete) return;

    try {
      await deleteItem(id);
      toast.success("Item deleted");
      navigate("/");
    } catch (error) {
      toast.error(error.response?.data?.message || "Could not delete item");
    }
  };

  const handleResolve = async () => {
    try {
      const { data } = await updateItem(id, { ...item, status: "resolved" });
      setItem(data);
      toast.success("Item marked as resolved");
    } catch (error) {
      toast.error(error.response?.data?.message || "Could not update item");
    }
  };

  if (!item) {
    return <Loader message="Loading item details..." />;
  }

  const createdDate = new Date(item.createdAt).toLocaleString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });

  return (
    <section className="mx-auto max-w-4xl">
      <Link to="/" className="text-sm font-semibold text-campus-teal">
        Back to all items
      </Link>

      <article className="mt-6 overflow-hidden rounded-lg border border-slate-200 bg-white shadow-soft">
        <div className="border-b border-slate-200 bg-slate-50 px-6 py-5">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="text-sm font-bold uppercase tracking-wide text-campus-teal">
                {item.category}
              </p>
              <h1 className="mt-2 text-3xl font-extrabold text-campus-ink">
                {item.title}
              </h1>
            </div>
            <span
              className={`w-fit rounded-full px-3 py-1 text-xs font-bold capitalize ring-1 ${
                badgeStyles[item.status] || badgeStyles.lost
              }`}
            >
              {item.status}
            </span>
          </div>
        </div>

        <div className="space-y-6 px-6 py-6">
          <div>
            <h2 className="text-sm font-bold uppercase tracking-wide text-slate-400">
              Description
            </h2>
            <p className="mt-2 whitespace-pre-line text-base leading-8 text-slate-700">
              {item.description}
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-lg bg-slate-50 p-4">
              <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
                Location
              </p>
              <p className="mt-2 font-semibold text-campus-ink">
                {item.location}
              </p>
            </div>
            <div className="rounded-lg bg-slate-50 p-4">
              <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
                Posted on
              </p>
              <p className="mt-2 font-semibold text-campus-ink">
                {createdDate}
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-3 border-t border-slate-200 pt-6 sm:flex-row">
            <Link to={`/items/${id}/edit`} className="primary-button">
              Edit Item
            </Link>
            {item.status !== "resolved" && (
              <button
                type="button"
                onClick={handleResolve}
                className="secondary-button text-campus-teal"
              >
                Mark Resolved
              </button>
            )}
            <button
              type="button"
              onClick={handleDelete}
              className="secondary-button text-red-600 hover:border-red-200 hover:bg-red-50"
            >
              Delete
            </button>
          </div>
        </div>
      </article>
    </section>
  );
}

export default ItemDetails;
