function Loader({ message = "Loading items..." }) {
  return (
    <div className="flex min-h-64 flex-col items-center justify-center rounded-lg border border-dashed border-slate-300 bg-white p-8 text-center">
      <div className="h-12 w-12 animate-spin rounded-full border-4 border-slate-200 border-t-campus-teal" />
      <p className="mt-4 text-sm font-semibold text-slate-600">{message}</p>
    </div>
  );
}

export default Loader;
