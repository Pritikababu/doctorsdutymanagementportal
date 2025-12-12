// src/pages/MySessions.tsx
import PageHeader from "../components/PageHeader";
const sessions = [
  { id: "s1", title: "Diagnosis", icon: "🩺", color: "bg-blue-50 text-blue-700" },
  { id: "s2", title: "Treatment", icon: "💊", color: "bg-green-50 text-green-700" },
  { id: "s3", title: "Monitoring", icon: "📊", color: "bg-yellow-50 text-yellow-700" },
  { id: "s4", title: "Emergency Care", icon: "🚑", color: "bg-red-50 text-red-700" },
];

export default function MySessions() {
  return (
    <div>
      <PageHeader title="Sessions" showDate />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
        {sessions.map((s) => (
          <div key={s.id} className="bg-white p-5 rounded-xl shadow-sm border flex items-center gap-4">
            <div className={`w-14 h-14 rounded-full flex items-center justify-center text-2xl ${s.color}`}>{s.icon}</div>
            <div>
              <h4 className="font-semibold">{s.title}</h4>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
