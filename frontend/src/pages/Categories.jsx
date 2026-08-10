import React, { useEffect, useState } from 'react';
import SEO from '../components/common/SEO';
import CategoryCard from '../components/common/CategoryCard';
import Loader from '../components/common/Loader';
import EmptyState from '../components/common/EmptyState';
import { fetchCategories } from '../api/categories';

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCategories()
      .then((res) => setCategories(res.data))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <SEO title="Categories" description="Browse peptide products by category." url="/categories" />
      <section className="border-b border-gray-100 bg-blue-50/60 py-12">
        <div className="container-page">
          <h1 className="text-3xl font-extrabold text-brand-dark">Product Categories</h1>
          <p className="mt-2 text-brand-gray">Explore our full range of research peptide categories.</p>
        </div>
      </section>

      <section className="container-page py-14">
        {loading ? (
          <Loader />
        ) : categories.length === 0 ? (
          <EmptyState title="No categories yet" description="Check back soon." />
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((category) => (
              <CategoryCard key={category._id} category={category} />
            ))}
          </div>
        )}
      </section>
    </>
  );
};

export default Categories;
