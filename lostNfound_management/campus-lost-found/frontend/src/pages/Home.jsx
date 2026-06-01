import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import EmptyState from "../components/EmptyState.jsx";
import ItemCard from "../components/ItemCard.jsx";
import Loader from "../components/Loader.jsx";
import SearchBar from "../components/SearchBar.jsx";
import { deleteItem, getItems, updateItem } from "../services/api.js";

function Home() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const { data } = await getItems();
        setItems(data);
      } catch (error) {
        toast.error(error.response?.data?.message || "Could not load items");
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const matchesSearch = item.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase().trim());
      const matchesStatus =
        statusFilter === "all" || item.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [items, searchTerm, statusFilter]);

  const handleDelete = async (id) => {
    const shouldDelete = window.confirm("Delete this item permanently?");

    if (!shouldDelete) return;

    try {
      await deleteItem(id);
      setItems((currentItems) => currentItems.filter((item) => item._id !== id));
      toast.success("Item deleted");
    } catch (error) {
      toast.error(error.response?.data?.message || "Could not delete item");
    }
  };

  const handleResolve = async (item) => {
    try {
      const { data } = await updateItem(item._id, {
        ...item,
        status: "resolved"
      });

      setItems((currentItems) =>
        currentItems.map((currentItem) =>
          currentItem._id === item._id ? data : currentItem
        )
      );
      toast.success("Item marked as resolved");
    } catch (error) {
      toast.error(error.response?.data?.message || "Could not update item");
    }
  };

  return (
    <section className="space-y-8">
      <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
        <div>
          <p className="text-sm font-bold uppercase tracking-wide text-campus-teal">
            Student help desk
          </p>
          <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-campus-ink sm:text-5xl">
            Find what was lost. Return what was found.
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">
            A simple campus board for posting lost and found items, tracking
            details, and closing the loop once an item reaches its owner.
          </p>
        </div>

        <div className="grid grid-cols-3 gap-3 rounded-lg bg-white p-4 shadow-soft">
          <div>
            <p className="text-2xl font-extrabold text-campus-ink">
              {items.length}
            </p>
            <p className="text-xs font-semibold text-slate-500">Total</p>
          </div>
          <div>
            <p className="text-2xl font-extrabold text-red-600">
              {items.filter((item) => item.status === "lost").length}
            </p>
            <p className="text-xs font-semibold text-slate-500">Lost</p>
          </div>
          <div>
            <p className="text-2xl font-extrabold text-campus-teal">
              {items.filter((item) => item.status === "resolved").length}
            </p>
            <p className="text-xs font-semibold text-slate-500">Resolved</p>
          </div>
        </div>
      </div>

      <SearchBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
      />

      {loading ? (
        <Loader />
      ) : filteredItems.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {filteredItems.map((item) => (
            <ItemCard
              key={item._id}
              item={item}
              onDelete={handleDelete}
              onResolve={handleResolve}
            />
          ))}
        </div>
      )}
    </section>
  );
}

export default Home;
