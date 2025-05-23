// app/admin/page.tsx
import React from "react";
import Dashboard from "./Dasboard/page";

const AdminDashboard = () => {
  return (
    <div>
      <h1 className="text-3xl font-semibold text-gray-800">Admin Dashboard</h1>
      <Dashboard />
    </div>
  );
};

export default AdminDashboard;
