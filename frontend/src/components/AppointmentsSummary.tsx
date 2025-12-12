// src/components/AppointmentsSummary.tsx
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";

const sample = [
  { day: "Jan 01", appts: 12 },
  { day: "Jan 02", appts: 8 },
  { day: "Jan 03", appts: 21 },
  { day: "Jan 04", appts: 14 },
  { day: "Jan 05", appts: 25 },
  { day: "Jan 06", appts: 18 },
];

export default function AppointmentsSummary() {
  return (
    <div className="bg-white rounded-xl p-5 shadow-sm border">
      <h3 className="text-lg font-semibold mb-3">Appointments Overview</h3>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div style={{ height: 220 }}>
          <ResponsiveContainer>
            <LineChart data={sample}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="appts" stroke="#2563eb" strokeWidth={3} dot />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div style={{ height: 220 }}>
          <ResponsiveContainer>
            <BarChart data={sample}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="appts" fill="#10b981" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
