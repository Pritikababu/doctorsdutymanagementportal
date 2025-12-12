// src/pages/MyAppointments.tsx
import { useEffect, useMemo, useState } from "react";
import PageHeader from "../components/PageHeader";
import Badge from "../components/Badge";
import Pagination from "../components/Pagination";

interface Appointment {
  appointment_id?: number | string;
  patient_id: string;
  patient_name: string;
  appointment_date: string; // ISO
  appointment_time?: string;
  appointment_type: string;
  status: string;
}

export default function MyAppointments() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);

  // filters
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  // pagination
  const [page, setPage] = useState(1);
  const rows = 10;

  useEffect(() => {
    setLoading(true);
    fetch("http://localhost:4000/api/appointments")
      .then((r) => r.json())
      .then((data) => {
        setAppointments(data || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const filtered = useMemo(() => {
    return appointments.filter((a) => {
      if (search && !a.patient_name.toLowerCase().includes(search.toLowerCase())) return false;
      if (statusFilter !== "All" && a.status !== statusFilter) return false;
      return true;
    });
  }, [appointments, search, statusFilter]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / rows));
  const pageRows = filtered.slice((page - 1) * rows, page * rows);

  function formatDate(iso: string) {
    const d = new Date(iso);
    return d.toLocaleDateString("en-CA");
  }
  function formatTime(iso: string) {
    const d = new Date(iso);
    return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  }

  if (loading) return <p className="text-center p-8 text-gray-500">Loading...</p>;

  return (
    <div>
      <PageHeader title="Appointments" showDate />

      <div className="flex flex-col md:flex-row md:items-center gap-3 justify-between mb-4">
        <div className="flex items-center gap-3">
          <input
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            placeholder="Search patient..."
            className="border p-2 rounded w-64"
          />
          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setPage(1);
            }}
            className="border p-2 rounded"
          >
            <option value="All">All Status</option>
            <option>Scheduled</option>
            <option>Completed</option>
            <option>Cancelled</option>
            <option>Requested</option>
            <option>No-Show</option>
          </select>
        </div>
        <div className="text-sm text-gray-500">Showing {filtered.length} results</div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        <table className="w-full table-fixed text-left">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="p-3 w-36">Patient ID</th>
              <th className="p-3">Patient Name</th>
              <th className="p-3 w-40">Date</th>
              <th className="p-3 w-28">Time</th>
              <th className="p-3 w-40">Type</th>
              <th className="p-3 w-36">Status</th>
            </tr>
          </thead>
          <tbody>
            {pageRows.map((a, idx) => (
              <tr key={a.patient_id + idx} className="odd:bg-white even:bg-gray-50 hover:bg-gray-100">
                <td className="p-3">{a.patient_id}</td>
                <td className="p-3 font-medium">{a.patient_name}</td>
                <td className="p-3">{formatDate(a.appointment_date)}</td>
                <td className="p-3">{formatTime(a.appointment_date)}</td>
                <td className="p-3">{a.appointment_type}</td>
                <td className="p-3">
                  <Badge text={a.status} />
                </td>
              </tr>
            ))}
            {pageRows.length === 0 && (
              <tr>
                <td colSpan={6} className="p-6 text-center text-gray-500">
                  No appointments found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex justify-center">
        <Pagination current={page} total={totalPages} onPage={(n) => setPage(Math.max(1, Math.min(totalPages, n)))} />
      </div>
    </div>
  );
}
