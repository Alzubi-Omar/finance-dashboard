import { NavLink } from "react-router-dom";

const links = [
  { to: "/", label: "Dashboard", icon: "▦" },
  { to: "/transactions", label: "Transactions", icon: "↕" },
  { to: "/analytics", label: "Analytics", icon: "📊" },
];

export default function Sidebar() {
  return (
    <aside className="fixed top-0 left-0 h-screen w-56 bg-zinc-900 border-r border-zinc-800 flex flex-col">
      {/* Logo */}
      <div className="px-6 py-6 border-b border-zinc-800">
        <span className="text-indigo-400 font-bold text-lg tracking-tight">
          FinanceOS
        </span>
      </div>
      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {links.map(({ to, label, icon }) => (
          <NavLink
            key={to}
            to={to}
            end={to === "/"}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-colors ${
                isActive
                  ? "bg-indigo-600 text-white"
                  : "text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800"
              }`
            }
          >
            <span className="text-base">{icon}</span>
            {label}
          </NavLink>
        ))}
      </nav>
      {/* Footer */}
      <div className="px-6 py-4 border-t border-zinc-800">
        <p className="text-xs text-zinc-600">
          © {new Date().getFullYear()} Finance Dashboard. All rights reserved.
        </p>
      </div>
    </aside>
  );
}
