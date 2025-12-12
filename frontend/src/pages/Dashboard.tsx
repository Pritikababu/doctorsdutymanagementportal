// src/pages/Dashboard.tsx
import DashboardHeader from "../components/DashboardHeader";
import StatsCard from "../components/StatsCard";
import AppointmentsSummary from "../components/AppointmentsSummary";
import ActivityTimeline from "../components/ActivityTimeline";

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <DashboardHeader />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard number="10" label="All Doctors" />
        <StatsCard number="45" label="All Patients" />
        <StatsCard number="8" label="New Appointments" />
        <StatsCard number="4" label="Today Sessions" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <AppointmentsSummary />
        <ActivityTimeline />
      </div>
    </div>
  );
}
