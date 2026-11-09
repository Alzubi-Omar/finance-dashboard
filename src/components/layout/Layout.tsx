import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

export default function Layout() {
  return (
    <div
      className="min-h-screen text-slate-100"
      style={{
        background:
          "linear-gradient(135deg, #0a0f1e 0%, #0d1628 50%, #0a1220 100%)",
      }}
    >
      <Sidebar />
      <main className="md:ml-56 pt-14 md:pt-0 p-4 md:p-8 min-h-screen">
        <Outlet />
      </main>
    </div>
  );
}
