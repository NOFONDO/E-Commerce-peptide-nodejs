import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { FaTachometerAlt, FaBoxOpen, FaTags, FaEnvelope, FaCog, FaSignOutAlt, FaFlask } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';

const links = [
  { label: 'Dashboard', to: '/admin/dashboard', icon: FaTachometerAlt },
  { label: 'Products', to: '/admin/products', icon: FaBoxOpen },
  { label: 'Categories', to: '/admin/categories', icon: FaTags },
  { label: 'Messages', to: '/admin/messages', icon: FaEnvelope },
  { label: 'Settings', to: '/admin/settings', icon: FaCog },
];

const AdminSidebar = () => {
  const { logout, admin } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/admin/login');
  };

  return (
    <aside className="flex h-screen w-64 flex-col border-r border-gray-100 bg-white">
      <div className="flex items-center gap-2 border-b border-gray-100 px-6 py-5">
        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-blue text-white">
          <FaFlask size={16} />
        </span>
        <span className="font-bold text-brand-dark">Admin Panel</span>
      </div>

      <nav className="flex-1 space-y-1 px-3 py-6">
        {links.map(({ label, to, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${
                isActive ? 'bg-brand-blue text-white' : 'text-brand-gray hover:bg-gray-50 hover:text-brand-dark'
              }`
            }
          >
            <Icon size={16} />
            {label}
          </NavLink>
        ))}
      </nav>

      <div className="border-t border-gray-100 p-4">
        <p className="truncate text-xs text-brand-gray">{admin?.email}</p>
        <button
          type="button"
          onClick={handleLogout}
          className="mt-3 flex w-full items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold text-red-600 hover:bg-red-50"
        >
          <FaSignOutAlt size={14} /> Logout
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;
