import profilePic from "../assets/images/doc1.png";

export default function DoctorCard() {
  return (
    <div className="bg-white rounded-2xl p-6 shadow">
      <div className="flex items-center gap-4">
        <img src={profilePic} alt="doc" className="w-16 h-16 rounded-full object-cover border" />
        <div>
          <h3 className="text-lg font-bold">Dr. Samantha Roy</h3>
          <p className="text-gray-500">Dermatologist • Skin Specialist</p>
          <p className="mt-2 text-sm text-gray-600">Location: Bengaluru</p>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-3 text-center">
        <div>
          <div className="text-2xl font-bold">120</div>
          <div className="text-xs text-gray-500">Patients</div>
        </div>
        <div>
          <div className="text-2xl font-bold">48</div>
          <div className="text-xs text-gray-500">Appointments</div>
        </div>
        <div>
          <div className="text-2xl font-bold">4.9</div>
          <div className="text-xs text-gray-500">Rating</div>
        </div>
      </div>

      <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg">Edit Profile</button>
    </div>
  );
}
