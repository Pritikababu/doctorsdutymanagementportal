// src/components/Sidebar.tsx
import { NavLink } from "react-router-dom";
import { Grid, Calendar, Users, FileText, Settings } from "lucide-react";

const menu = [
  { name: "Dashboard", to: "/admin", icon: <Grid size={18} /> },
  { name: "Appointments", to: "/appointments", icon: <Calendar size={18} /> },
  { name: "Sessions", to: "/sessions", icon: <FileText size={18} /> },
  { name: "Patients", to: "/patients", icon: <Users size={18} /> },
  { name: "Settings", to: "/settings", icon: <Settings size={18} /> },
];

export default function Sidebar() {
  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-800">Modex Admin</h1>
        <p className="text-sm text-gray-500 mt-1">Doctor Portal</p>
      </div>

      <nav className="flex flex-col gap-2">
        {menu.map((m) => (
          <NavLink
            key={m.to}
            to={m.to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-lg transition-all ${
                isActive ? "bg-blue-50 text-blue-600 font-medium" : "text-gray-700 hover:bg-gray-50"
              }`
            }
          >
            <span className="text-gray-500">{m.icon}</span>
            <span>{m.name}</span>
          </NavLink>
        ))}
      </nav>

      <div className="mt-8 text-xs text-gray-400">v1.0 • Material Light</div>
    </div>
  );
}
