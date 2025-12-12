// src/components/Badge.tsx
export default function Badge({ text }: { text: string }) {
  const color =
    text === "Completed"
      ? "bg-green-100 text-green-700"
      : text === "Scheduled"
      ? "bg-blue-100 text-blue-700"
      : text === "Cancelled"
      ? "bg-red-100 text-red-700"
      : text === "Requested"
      ? "bg-yellow-100 text-yellow-700"
      : "bg-gray-100 text-gray-700";

  return <span className={`px-3 py-1 rounded-full text-sm font-medium ${color}`}>{text}</span>;
}
