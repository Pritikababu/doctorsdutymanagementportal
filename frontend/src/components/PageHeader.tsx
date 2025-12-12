// src/components/PageHeader.tsx
import { ArrowLeft, Calendar as CalIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function PageHeader({ title, showDate = false }: { title?: string; showDate?: boolean }) {
  const nav = useNavigate();
  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="flex justify-between items-center mb-4">
      <div className="flex items-center gap-4">
        <button onClick={() => nav(-1)} className="inline-flex items-center gap-2 text-blue-600">
          <ArrowLeft size={18} /> Back
        </button>
        <h2 className="text-xl font-semibold">{title}</h2>
      </div>

      {showDate && (
        <div className="flex items-center gap-3 text-gray-600">
          <div className="text-sm">{today}</div>
          <button className="p-2 rounded-md hover:bg-gray-100">
            <CalIcon size={18} />
          </button>
        </div>
      )}
    </div>
  );
}
