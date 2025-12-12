// src/pages/MyPatients.tsx
import { useEffect, useMemo, useState } from "react";
import PageHeader from "../components/PageHeader";
import Pagination from "../components/Pagination";
import PatientModal from "../components/PatientModal";

interface Patient {
  patient_id: string;
  patient_name: string;
  age: number;
  gender: string;
  phone_number: string;
  medical_history?: string;
}

export default function MyPatients() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [genderFilter, setGenderFilter] = useState("All");
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState<Patient | null>(null);
  const rows = 10;

  useEffect(() => {
    setLoading(true);
    fetch("http://localhost:4000/api/patients")
      .then((r) => r.json())
      .then((data) => {
        setPatients(data || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const filtered = useMemo(() => {
    return patients.filter((p) => {
      if (search && !p.patient_name.toLowerCase().includes(search.toLowerCase())) return false;
      if (genderFilter !== "All" && p.gender !== genderFilter) return false;
      return true;
    });
  }, [patients, search, genderFilter]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / rows));
  const pageRows = filtered.slice((page - 1) * rows, page * rows);

  if (loading) return <p className="text-center p-8 text-gray-500">Loading...</p>;

  return (
    <div>
      <PageHeader title="My Patients" showDate />

      <div className="flex flex-col md:flex-row md:items-center gap-3 justify-between mb-4">
        <div className="flex items-center gap-3">
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search patient..." className="border p-2 rounded w-64" />
          <select value={genderFilter} onChange={(e) => setGenderFilter(e.target.value)} className="border p-2 rounded">
            <option value="All">All Genders</option>
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>
        </div>
        <div className="text-sm text-gray-500">Showing {filtered.length} patients</div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="p-3 w-36">Patient ID</th>
              <th className="p-3">Name</th>
              <th className="p-3 w-48">Contact</th>
              <th className="p-3 w-24">Age</th>
              <th className="p-3 w-24">Gender</th>
            </tr>
          </thead>
          <tbody>
            {pageRows.map((p) => (
              <tr key={p.patient_id} className="hover:bg-gray-50 cursor-pointer" onClick={() => setSelected(p)}>
                <td className="p-3">{p.patient_id}</td>
                <td className="p-3 font-medium">{p.patient_name}</td>
                <td className="p-3">{p.phone_number}</td>
                <td className="p-3">{p.age}</td>
                <td className="p-3">{p.gender}</td>
              </tr>
            ))}
            {pageRows.length === 0 && (
              <tr>
                <td colSpan={5} className="p-6 text-center text-gray-500">
                  No patients found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex justify-center">
        <Pagination current={page} total={totalPages} onPage={(n) => setPage(Math.max(1, Math.min(totalPages, n)))} />
      </div>

      {selected && <PatientModal patient={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}
