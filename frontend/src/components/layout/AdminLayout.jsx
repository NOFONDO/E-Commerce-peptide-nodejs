import React from 'react';
import { Outlet } from 'react-router-dom';
import AdminSidebar from '../admin/AdminSidebar';

const AdminLayout = () => (
  <div className="flex min-h-screen bg-gray-50">
    <AdminSidebar />
    <div className="flex-1 overflow-y-auto">
      <div className="mx-auto max-w-6xl p-6 lg:p-10">
        <Outlet />
      </div>
    </div>
  </div>
);

export default AdminLayout;
