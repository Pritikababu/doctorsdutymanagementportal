// src/components/DashboardHeader.tsx
import profilePic from "../assets/images/doc1.png"; // replace if needed
import { Bell, Settings } from "lucide-react";

export default function DashboardHeader() {
  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="bg-white rounded-2xl shadow p-6 flex flex-col sm:flex-row justify-between gap-6">
      <div className="flex items-start gap-4">
        <img
          src={profilePic}
          alt="Doctor"
          className="w-20 h-20 rounded-full object-cover border-2 border-blue-50 shadow-sm"
        />
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Welcome, Dr. Sam</h1>
          <p className="text-sm text-gray-500 mt-1">Cardiologist • 12+ years experience</p>

          <div className="flex gap-4 mt-3 text-gray-600">
            <div className="text-sm">1500+ Patients</div>
            <div className="text-sm">4300+ Consultations</div>
            <div className="text-sm">4.9 Rating</div>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4 ml-auto">
        <button className="px-4 py-2 rounded-lg bg-white border hover:bg-gray-50">View Patients</button>
        <button className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700">View Appointments</button>

        <button className="p-2 rounded-full hover:bg-gray-100">
          <Bell size={18} />
        </button>

        <button className="p-2 rounded-full hover:bg-gray-100">
          <Settings size={18} />
        </button>

        <div className="text-right text-sm text-gray-600">
          <div>Today's date</div>
          <div className="font-medium">{today}</div>
        </div>
      </div>
    </div>
  );
}
