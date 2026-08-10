import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBoxOpen, FaTags, FaEnvelope, FaStar, FaFire, FaExclamationTriangle } from 'react-icons/fa';
import Loader from '../../components/common/Loader';
import { fetchDashboardStats } from '../../api/dashboard';
import { formatDate, formatPrice } from '../../utils/formatters';

const StatCard = ({ icon: Icon, label, value, color }) => (
  <div className="card flex items-center gap-4 p-6">
    <span className={`flex h-12 w-12 items-center justify-center rounded-xl ${color}`}>
      <Icon size={20} />
    </span>
    <div>
      <p className="text-2xl font-bold text-brand-dark">{value}</p>
      <p className="text-sm text-brand-gray">{label}</p>
    </div>
  </div>
);

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardStats()
      .then((res) => setStats(res.data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Loader fullScreen />;

  return (
    <div>
      <h1 className="text-2xl font-bold text-brand-dark">Dashboard Overview</h1>
      <p className="mt-1 text-sm text-brand-gray">A snapshot of your store's activity.</p>

      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard icon={FaBoxOpen} label="Total Products" value={stats.totalProducts} color="bg-brand-blue/10 text-brand-blue" />
        <StatCard icon={FaTags} label="Total Categories" value={stats.totalCategories} color="bg-brand-green/10 text-brand-green" />
        <StatCard icon={FaEnvelope} label="Messages Received" value={stats.totalMessages} color="bg-amber-100 text-amber-600" />
        <StatCard icon={FaExclamationTriangle} label="Unread Messages" value={stats.unreadMessages} color="bg-red-100 text-red-600" />
        <StatCard icon={FaStar} label="Featured Products" value={stats.featuredProducts} color="bg-purple-100 text-purple-600" />
        <StatCard icon={FaFire} label="Best Sellers" value={stats.bestSellerProducts} color="bg-orange-100 text-orange-600" />
        <StatCard icon={FaBoxOpen} label="Out of Stock" value={stats.outOfStockProducts} color="bg-gray-100 text-brand-gray" />
      </div>

      <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="card p-6">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-brand-dark">Recent Products</h2>
            <Link to="/admin/products" className="text-sm font-semibold text-brand-blue hover:underline">
              View all
            </Link>
          </div>
          <div className="mt-4 divide-y divide-gray-100">
            {stats.recentProducts.length === 0 && <p className="py-4 text-sm text-brand-gray">No products yet.</p>}
            {stats.recentProducts.map((product) => (
              <div key={product._id} className="flex items-center justify-between py-3">
                <div>
                  <p className="text-sm font-medium text-brand-dark">{product.name}</p>
                  <p className="text-xs text-brand-gray">{product.category?.name}</p>
                </div>
                <span className="text-sm font-semibold text-brand-dark">{formatPrice(product.price)}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="card p-6">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-brand-dark">Recent Messages</h2>
            <Link to="/admin/messages" className="text-sm font-semibold text-brand-blue hover:underline">
              View all
            </Link>
          </div>
          <div className="mt-4 divide-y divide-gray-100">
            {stats.recentMessages.length === 0 && <p className="py-4 text-sm text-brand-gray">No messages yet.</p>}
            {stats.recentMessages.map((message) => (
              <div key={message._id} className="py-3">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-brand-dark">{message.name}</p>
                  <span className="text-xs text-brand-gray">{formatDate(message.createdAt)}</span>
                </div>
                <p className="mt-1 line-clamp-1 text-xs text-brand-gray">{message.subject}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
