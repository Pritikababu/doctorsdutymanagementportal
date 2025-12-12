// src/components/PatientModal.tsx
export default function PatientModal({ patient, onClose }: { patient: any; onClose: () => void }) {
  if (!patient) return null;
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-96 rounded-xl p-6 shadow-lg">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-xl font-semibold">{patient.patient_name}</h3>
            <div className="text-sm text-gray-500">ID: {patient.patient_id}</div>
          </div>
          <button onClick={onClose} className="text-gray-500">Close</button>
        </div>

        <div className="mt-4 space-y-2 text-sm text-gray-700">
          <div><strong>Age:</strong> {patient.age}</div>
          <div><strong>Gender:</strong> {patient.gender}</div>
          <div><strong>Contact:</strong> {patient.phone_number}</div>
          <div><strong>Medical history:</strong> {patient.medical_history || "—"}</div>
        </div>

        <div className="mt-6 flex justify-end gap-2">
          <button onClick={onClose} className="px-4 py-2 border rounded">Close</button>
        </div>
      </div>
    </div>
  );
}
