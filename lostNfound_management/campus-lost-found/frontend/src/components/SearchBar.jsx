function SearchBar({ searchTerm, setSearchTerm, statusFilter, setStatusFilter }) {
  return (
    <div className="grid gap-4 rounded-lg border border-slate-200 bg-white p-4 shadow-soft md:grid-cols-[1fr_220px]">
      <div>
        <label htmlFor="search" className="form-label">
          Search by title
        </label>
        <input
          id="search"
          type="text"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          placeholder="Search phone, keys, notebook..."
          className="form-input"
        />
      </div>

      <div>
        <label htmlFor="status" className="form-label">
          Filter status
        </label>
        <select
          id="status"
          value={statusFilter}
          onChange={(event) => setStatusFilter(event.target.value)}
          className="form-input"
        >
          <option value="all">All items</option>
          <option value="lost">Lost</option>
          <option value="found">Found</option>
          <option value="resolved">Resolved</option>
        </select>
      </div>
    </div>
  );
}

export default SearchBar;
