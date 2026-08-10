import React, { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FaSearch, FaFilter } from 'react-icons/fa';
import SEO from '../components/common/SEO';
import ProductCard from '../components/common/ProductCard';
import Loader from '../components/common/Loader';
import EmptyState from '../components/common/EmptyState';
import Pagination from '../components/common/Pagination';
import { fetchProducts } from '../api/products';
import { fetchCategories } from '../api/categories';

const sortOptions = [
  { value: 'newest', label: 'Newest' },
  { value: 'oldest', label: 'Oldest' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'name-asc', label: 'Name: A to Z' },
];

const Shop = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, totalPages: 1 });
  const [loading, setLoading] = useState(true);
  const [searchInput, setSearchInput] = useState(searchParams.get('search') || '');

  const filters = useMemo(
    () => ({
      search: searchParams.get('search') || undefined,
      category: searchParams.get('category') || undefined,
      inStock: searchParams.get('inStock') || undefined,
      sort: searchParams.get('sort') || 'newest',
      page: searchParams.get('page') || 1,
    }),
    [searchParams]
  );

  useEffect(() => {
    fetchCategories().then((res) => setCategories(res.data));
  }, []);

  useEffect(() => {
    setLoading(true);
    fetchProducts({ ...filters, limit: 12 })
      .then((res) => {
        setProducts(res.data);
        setPagination(res.pagination);
      })
      .finally(() => setLoading(false));
  }, [filters]);

  const updateParam = (key, value) => {
    const next = new URLSearchParams(searchParams);
    if (value) {
      next.set(key, value);
    } else {
      next.delete(key);
    }
    next.delete('page');
    setSearchParams(next);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    updateParam('search', searchInput);
  };

  const handlePageChange = (page) => {
    const next = new URLSearchParams(searchParams);
    next.set('page', page);
    setSearchParams(next);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <SEO title="Shop Research Peptides" description="Browse, search, and filter our full catalog of research peptides." url="/shop" />

      <section className="border-b border-gray-100 bg-blue-50/60 py-12">
        <div className="container-page">
          <h1 className="text-3xl font-extrabold text-brand-dark">Shop Research Peptides</h1>
          <p className="mt-2 text-brand-gray">Search, filter, and sort our full catalog.</p>
        </div>
      </section>

      <section className="container-page py-10">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
          <aside className="space-y-6">
            <form onSubmit={handleSearchSubmit} className="relative">
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Search products..."
                className="input-field pr-10"
              />
              <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-brand-gray">
                <FaSearch />
              </button>
            </form>

            <div className="card p-5">
              <h3 className="flex items-center gap-2 font-semibold text-brand-dark">
                <FaFilter size={14} /> Categories
              </h3>
              <div className="mt-3 space-y-2">
                <button
                  type="button"
                  onClick={() => updateParam('category', '')}
                  className={`block w-full rounded-lg px-3 py-2 text-left text-sm ${
                    !filters.category ? 'bg-brand-blue text-white' : 'hover:bg-gray-50'
                  }`}
                >
                  All Categories
                </button>
                {categories.map((cat) => (
                  <button
                    key={cat._id}
                    type="button"
                    onClick={() => updateParam('category', cat._id)}
                    className={`block w-full rounded-lg px-3 py-2 text-left text-sm ${
                      filters.category === cat._id ? 'bg-brand-blue text-white' : 'hover:bg-gray-50'
                    }`}
                  >
                    {cat.name} ({cat.productCount})
                  </button>
                ))}
              </div>
            </div>

            <div className="card p-5">
              <label className="flex items-center gap-2 text-sm font-medium text-brand-dark">
                <input
                  type="checkbox"
                  checked={filters.inStock === 'true'}
                  onChange={(e) => updateParam('inStock', e.target.checked ? 'true' : '')}
                  className="h-4 w-4 rounded border-gray-300 text-brand-blue focus:ring-brand-blue"
                />
                In stock only
              </label>
            </div>
          </aside>

          <div className="lg:col-span-3">
            <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-brand-gray">
                {pagination.total ?? products.length} product{(pagination.total ?? products.length) !== 1 ? 's' : ''} found
              </p>
              <select
                value={filters.sort}
                onChange={(e) => updateParam('sort', e.target.value)}
                className="input-field w-full sm:w-56"
              >
                {sortOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            {loading ? (
              <Loader />
            ) : products.length === 0 ? (
              <EmptyState title="No products found" description="Try adjusting your search or filters." />
            ) : (
              <>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
                  {products.map((product) => (
                    <ProductCard key={product._id} product={product} />
                  ))}
                </div>
                <Pagination page={pagination.page} totalPages={pagination.totalPages} onPageChange={handlePageChange} />
              </>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default Shop;
