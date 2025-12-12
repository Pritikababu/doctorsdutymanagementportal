// src/components/ActivityTimeline.tsx
const items = [
  { time: "09:00", text: "Consultation — Aarav Sharma" },
  { time: "11:00", text: "Reviewed lab results" },
  { time: "13:30", text: "Surgery planning" },
  { time: "15:00", text: "Follow-up calls" },
];

export default function ActivityTimeline() {
  return (
    <div className="bg-white rounded-xl p-5 shadow-sm border">
      <h3 className="text-lg font-semibold mb-3">Activity Timeline</h3>
      <div className="flex flex-col gap-3">
        {items.map((it, i) => (
          <div key={i} className="flex items-start gap-4">
            <div className="w-16 text-sm text-gray-500">{it.time}</div>
            <div className="flex-1 bg-gray-50 p-3 rounded">{it.text}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
