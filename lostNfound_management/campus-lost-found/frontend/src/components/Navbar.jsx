import { NavLink, Link } from "react-router-dom";

const navLinkClass = ({ isActive }) =>
  `rounded-lg px-3 py-2 text-sm font-semibold transition ${
    isActive
      ? "bg-teal-50 text-campus-teal"
      : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
  }`;

function Navbar() {
  return (
    <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/90 backdrop-blur">
      <nav className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-lg bg-campus-teal text-lg font-black text-white">
            LF
          </span>
          <div>
            <p className="text-base font-extrabold leading-none text-campus-ink">
              Campus Lost & Found
            </p>
            <p className="mt-1 text-xs font-medium text-slate-500">
              Reconnect items with owners
            </p>
          </div>
        </Link>

        <div className="flex items-center gap-2">
          <NavLink to="/" className={navLinkClass}>
            Home
          </NavLink>
          <NavLink to="/add" className={navLinkClass}>
            Add Item
          </NavLink>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
