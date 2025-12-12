import { useEffect, useState } from "react";

type Note = { id: string; text: string; time: string; read?: boolean };

const initial: Note[] = [
  { id: "1", text: "New booking from Rahul Reddy", time: "2m ago" },
  { id: "2", text: "Patient profile updated: Kavya Menon", time: "1h ago" },
  { id: "3", text: "Session completed: Isha Roy", time: "Yesterday" },
];

export default function NotificationsPanel() {
  const [notes, setNotes] = useState<Note[]>(initial);

  // Demo "real-time" - every 12s add a random notification
  useEffect(() => {
    const t = setInterval(() => {
      setNotes((s) => [
        { id: Date.now().toString(), text: "New incoming booking", time: "just now" },
        ...s,
      ].slice(0, 6));
    }, 12000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="bg-white rounded-2xl p-4 shadow">
      <h4 className="font-semibold mb-3">Notifications</h4>
      <ul className="space-y-3">
        {notes.map((n) => (
          <li key={n.id} className="flex justify-between items-start">
            <div>
              <p className="text-sm">{n.text}</p>
              <p className="text-xs text-gray-400">{n.time}</p>
            </div>
            <button className="text-xs text-blue-600">Open</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
