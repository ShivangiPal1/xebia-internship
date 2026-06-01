import { Link } from "react-router-dom";

const badgeStyles = {
  lost: "bg-red-50 text-red-700 ring-red-100",
  found: "bg-amber-50 text-amber-700 ring-amber-100",
  resolved: "bg-emerald-50 text-emerald-700 ring-emerald-100"
};

function ItemCard({ item, onDelete, onResolve }) {
  const createdDate = new Date(item.createdAt).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric"
  });

  return (
    <article className="flex h-full flex-col rounded-lg border border-slate-200 bg-white p-5 shadow-soft transition hover:-translate-y-1 hover:shadow-lg">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
            {item.category}
          </p>
          <h3 className="mt-2 line-clamp-2 text-lg font-bold text-campus-ink">
            {item.title}
          </h3>
        </div>
        <span
          className={`rounded-full px-3 py-1 text-xs font-bold capitalize ring-1 ${
            badgeStyles[item.status] || badgeStyles.lost
          }`}
        >
          {item.status}
        </span>
      </div>

      <p className="mt-4 line-clamp-3 flex-1 text-sm leading-6 text-slate-600">
        {item.description}
      </p>

      <div className="mt-5 space-y-2 text-sm text-slate-500">
        <p>
          <span className="font-semibold text-slate-700">Location:</span>{" "}
          {item.location}
        </p>
        <p>
          <span className="font-semibold text-slate-700">Posted:</span>{" "}
          {createdDate}
        </p>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-2">
        <Link to={`/items/${item._id}`} className="secondary-button">
          Details
        </Link>
        <Link to={`/items/${item._id}/edit`} className="secondary-button">
          Edit
        </Link>
        {item.status !== "resolved" && (
          <button
            type="button"
            onClick={() => onResolve(item)}
            className="secondary-button col-span-2 text-campus-teal"
          >
            Mark Resolved
          </button>
        )}
        <button
          type="button"
          onClick={() => onDelete(item._id)}
          className="secondary-button col-span-2 text-red-600 hover:border-red-200 hover:bg-red-50"
        >
          Delete
        </button>
      </div>
    </article>
  );
}

export default ItemCard;
