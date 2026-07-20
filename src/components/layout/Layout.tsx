import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

export default function Layout() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <Sidebar />
      <main className="ml-56 p-8 min-h-screen">
        <Outlet />
      </main>
    </div>
  );
}
