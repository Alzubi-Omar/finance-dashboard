import { useState } from "react";
import { NavLink } from "react-router-dom";

const links = [
  { to: "/", label: "Dashboard", icon: "▦" },
  { to: "/transactions", label: "Transactions", icon: "↕" },
  { to: "/analytics", label: "Analytics", icon: "↗" },
];

export default function Sidebar() {
  const [open, setOpen] = useState(false);

  const NavItems = () => (
    <>
      {links.map(({ to, label, icon }) => (
        <NavLink
          key={to}
          to={to}
          end={to === "/"}
          onClick={() => setOpen(false)}
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 py-2.5 rounded-md text-sm
             font-medium transition-colors ${
               isActive
                 ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                 : "text-slate-400 hover:text-slate-100 hover:bg-slate-700/40"
             }`
          }
        >
          <span className="text-base">{icon}</span>
          {label}
        </NavLink>
      ))}
    </>
  );

  return (
    <>
      {/* ── Desktop sidebar ── */}
      <aside
        className="hidden md:flex fixed top-0 left-0 h-screen w-56
                        flex-col z-40 border-r border-slate-700/50"
        style={{
          background: "linear-gradient(180deg, #0d1424 0%, #0a1628 100%)",
        }}
      >
        <div className="px-6 py-6 border-b border-slate-700/50">
          <span className="text-emerald-400 font-bold text-lg tracking-tight">
            FinanceOS
          </span>
          <p className="text-slate-600 text-xs mt-0.5">Personal Dashboard</p>
        </div>
        <nav className="flex-1 px-3 py-4 space-y-1">
          <NavItems />
        </nav>
        <div className="px-6 py-4 border-t border-slate-700/50">
          <p className="text-xs text-slate-600">v1.0.0</p>
        </div>
      </aside>

      {/* ── Mobile top bar ── */}
      <header
        className="md:hidden fixed top-0 left-0 right-0 z-40
                         border-b border-slate-700/50
                         flex items-center justify-between px-4 py-3"
        style={{ background: "#0d1424" }}
      >
        <span className="text-emerald-400 font-bold text-lg tracking-tight">
          FinanceOS
        </span>
        <button
          onClick={() => setOpen((prev) => !prev)}
          className="text-slate-400 hover:text-slate-100 transition-colors p-1"
          aria-label="Toggle menu"
        >
          {open ? "✕" : "☰"}
        </button>
      </header>

      {/* ── Mobile drawer ── */}
      {open && (
        <div
          className="md:hidden fixed inset-0 z-30"
          onClick={() => setOpen(false)}
        >
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
          <nav
            className="absolute top-14 left-0 right-0 border-b border-slate-700/50 px-3 py-3 space-y-1"
            style={{ background: "#0d1424" }}
            onClick={(e) => e.stopPropagation()}
          >
            <NavItems />
          </nav>
        </div>
      )}
    </>
  );
}
