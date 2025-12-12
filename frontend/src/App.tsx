// src/App.tsx
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import MyPatients from "./pages/MyPatients";
import MyAppointments from "./pages/MyAppointments";
import MySessions from "./pages/MySessions";
import Settings from "./pages/Settings";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/admin" />} />
          <Route path="admin" element={<Dashboard />} />
          <Route path="patients" element={<MyPatients />} />
          <Route path="appointments" element={<MyAppointments />} />
          <Route path="sessions" element={<MySessions />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </Router>
  );
}
