// src/pages/Settings.tsx
import PageHeader from "../components/PageHeader";
import { Cog, Eye, Trash2 } from "lucide-react";

export default function Settings() {
  return (
    <div>
      <PageHeader title="Settings" showDate />

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white p-6 rounded-xl shadow-sm border flex gap-4 items-start">
          <div className="p-3 bg-blue-50 rounded-lg"><Cog size={22} /></div>
          <div>
            <h4 className="font-semibold">Account Settings</h4>
            <p className="text-sm text-gray-500 mt-1">Edit profile, change password and update contact info.</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border flex gap-4 items-start">
          <div className="p-3 bg-gray-50 rounded-lg"><Eye size={22} /></div>
          <div>
            <h4 className="font-semibold">View Account</h4>
            <p className="text-sm text-gray-500 mt-1">View your account details and permissions.</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border flex gap-4 items-start">
          <div className="p-3 bg-red-50 rounded-lg"><Trash2 size={22} /></div>
          <div>
            <h4 className="font-semibold text-red-600">Delete Account</h4>
            <p className="text-sm text-gray-500 mt-1">This will permanently remove your account.</p>
          </div>
        </div>

      </div>
    </div>
  );
}
