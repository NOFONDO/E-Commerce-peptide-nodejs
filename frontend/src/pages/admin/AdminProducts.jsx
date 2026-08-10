import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaPlus, FaEdit, FaTrash, FaStar, FaFire } from 'react-icons/fa';
import Loader from '../../components/common/Loader';
import EmptyState from '../../components/common/EmptyState';
import Pagination from '../../components/common/Pagination';
import { deleteProduct, fetchProducts } from '../../api/products';
import { formatPrice } from '../../utils/formatters';

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, totalPages: 1 });
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  const loadProducts = (targetPage = page) => {
    setLoading(true);
    fetchProducts({ page: targetPage, limit: 10, sort: 'newest' })
      .then((res) => {
        setProducts(res.data);
        setPagination(res.pagination);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadProducts(page);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Delete "${name}"? This cannot be undone.`)) return;
    await deleteProduct(id);
    loadProducts(page);
  };

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-brand-dark">Products</h1>
          <p className="mt-1 text-sm text-brand-gray">Manage your product catalog.</p>
        </div>
        <Link to="/admin/products/new" className="btn-primary">
          <FaPlus size={14} /> Add Product
        </Link>
      </div>

      <div className="mt-8">
        {loading ? (
          <Loader />
        ) : products.length === 0 ? (
          <EmptyState
            title="No products yet"
            description="Add your first product to get started."
            action={
              <Link to="/admin/products/new" className="btn-primary">
                <FaPlus size={14} /> Add Product
              </Link>
            }
          />
        ) : (
          <div className="card overflow-hidden">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-50 text-xs uppercase text-brand-gray">
                <tr>
                  <th className="px-5 py-3">Product</th>
                  <th className="px-5 py-3">Category</th>
                  <th className="px-5 py-3">Price</th>
                  <th className="px-5 py-3">Stock</th>
                  <th className="px-5 py-3">Flags</th>
                  <th className="px-5 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {products.map((product) => (
                  <tr key={product._id}>
                    <td className="flex items-center gap-3 px-5 py-3">
                      <img src={product.images?.[0]?.url} alt={product.name} className="h-10 w-10 rounded-lg object-cover" />
                      <span className="font-medium text-brand-dark">{product.name}</span>
                    </td>
                    <td className="px-5 py-3 text-brand-gray">{product.category?.name}</td>
                    <td className="px-5 py-3 font-medium text-brand-dark">{formatPrice(product.price)}</td>
                    <td className="px-5 py-3">
                      <span className={product.stockQuantity > 0 ? 'text-brand-green' : 'text-red-500'}>
                        {product.stockQuantity}
                      </span>
                    </td>
                    <td className="px-5 py-3">
                      <div className="flex gap-1.5">
                        {product.isFeatured && <FaStar className="text-amber-400" title="Featured" />}
                        {product.isBestSeller && <FaFire className="text-orange-500" title="Best Seller" />}
                      </div>
                    </td>
                    <td className="px-5 py-3">
                      <div className="flex justify-end gap-3">
                        <Link to={`/admin/products/${product._id}/edit`} className="text-brand-blue hover:text-brand-blueDark">
                          <FaEdit />
                        </Link>
                        <button type="button" onClick={() => handleDelete(product._id, product.name)} className="text-red-500 hover:text-red-700">
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <Pagination page={pagination.page} totalPages={pagination.totalPages} onPageChange={setPage} />
      </div>
    </div>
  );
};

export default AdminProducts;
