// src/components/StatsCard.tsx
export default function StatsCard({ number, label }: { number: string; label: string }) {
  return (
    <div className="bg-white rounded-xl p-5 shadow-sm border">
      <div className="text-3xl font-bold text-center text-gray-800">{number}</div>
      <div className="text-sm text-center text-gray-500 mt-1">{label}</div>
    </div>
  );
}
