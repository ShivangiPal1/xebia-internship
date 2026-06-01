import { Link } from "react-router-dom";

function EmptyState({
  title = "No items found",
  message = "Try changing your search or add the first lost or found item.",
  showAction = true
}) {
  return (
    <div className="rounded-lg border border-dashed border-slate-300 bg-white px-6 py-14 text-center shadow-soft">
      <div className="mx-auto grid h-14 w-14 place-items-center rounded-lg bg-teal-50 text-2xl font-black text-campus-teal">
        ?
      </div>
      <h2 className="mt-5 text-xl font-bold text-campus-ink">{title}</h2>
      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
        {message}
      </p>
      {showAction && (
        <Link to="/add" className="primary-button mt-6">
          Add Item
        </Link>
      )}
    </div>
  );
}

export default EmptyState;
