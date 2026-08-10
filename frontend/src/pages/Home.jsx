import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaShieldAlt, FaFlask, FaTruck, FaAward } from 'react-icons/fa';
import SEO from '../components/common/SEO';
import ProductCard from '../components/common/ProductCard';
import CategoryCard from '../components/common/CategoryCard';
import Loader from '../components/common/Loader';
import { fetchProducts } from '../api/products';
import { fetchCategories } from '../api/categories';

const features = [
  { icon: FaFlask, title: 'High Purity', description: 'Every batch is specified with detailed purity and composition data.' },
  { icon: FaShieldAlt, title: 'Research Grade', description: 'Supplied strictly for laboratory research use only.' },
  { icon: FaTruck, title: 'Reliable Supply', description: 'Consistent stock availability across our full catalog.' },
  { icon: FaAward, title: 'Trusted Sourcing', description: 'Every product is documented with clear specifications.' },
];

const Home = () => {
  const [featured, setFeatured] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const [productsRes, categoriesRes] = await Promise.all([
          fetchProducts({ featured: 'true', limit: 8 }),
          fetchCategories(),
        ]);
        setFeatured(productsRes.data);
        setCategories(categoriesRes.data.slice(0, 4));
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  return (
    <>
      <SEO
        title="Premium Research Peptides"
        description="Browse our catalog of high-purity research peptides with detailed specifications and dosage information."
        structuredData={{
          '@context': 'https://schema.org',
          '@type': 'Organization',
          name: 'ZE Peptide Biotechnology',
          description: 'Premium research peptides for laboratory use.',
        }}
      />

      <section className="relative overflow-hidden bg-gradient-to-b from-blue-50 via-white to-white">
        <div className="container-page grid grid-cols-1 items-center gap-12 py-20 md:grid-cols-2 md:py-28">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <span className="inline-block rounded-full bg-brand-blue/10 px-4 py-1.5 text-sm font-semibold text-brand-blue">
              Research Use Only
            </span>
            <h1 className="mt-5 text-4xl font-extrabold leading-tight text-brand-dark md:text-5xl">
              Premium Research <span className="text-brand-blue">Peptides</span> for the Laboratory
            </h1>
            <p className="mt-5 max-w-lg text-lg text-brand-gray">
              Explore a rigorously documented catalog of research peptides, complete with specifications, dosage
              guidance, and clear stock availability.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link to="/shop" className="btn-primary">
                Browse Catalog
              </Link>
              <Link to="/contact" className="btn-secondary">
                Contact Us
              </Link>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="relative mx-auto flex h-72 w-72 items-center justify-center rounded-full bg-gradient-to-br from-brand-blue to-brand-green/70 shadow-2xl md:h-96 md:w-96"
          >
            <FaFlask className="text-white" size={120} />
          </motion.div>
        </div>
      </section>

      <section className="container-page py-16">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map(({ icon: Icon, title, description }) => (
            <div key={title} className="card p-6">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-blue/10 text-brand-blue">
                <Icon size={20} />
              </span>
              <h3 className="mt-4 font-semibold text-brand-dark">{title}</h3>
              <p className="mt-2 text-sm text-brand-gray">{description}</p>
            </div>
          ))}
        </div>
      </section>

      {loading ? (
        <Loader />
      ) : (
        <>
          {categories.length > 0 && (
            <section className="container-page py-16">
              <div className="flex items-end justify-between">
                <h2 className="text-2xl font-bold text-brand-dark md:text-3xl">Shop by Category</h2>
                <Link to="/categories" className="text-sm font-semibold text-brand-blue hover:underline">
                  View all
                </Link>
              </div>
              <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {categories.map((category) => (
                  <CategoryCard key={category._id} category={category} />
                ))}
              </div>
            </section>
          )}

          {featured.length > 0 && (
            <section className="container-page py-16">
              <div className="flex items-end justify-between">
                <h2 className="text-2xl font-bold text-brand-dark md:text-3xl">Featured Products</h2>
                <Link to="/shop" className="text-sm font-semibold text-brand-blue hover:underline">
                  View all
                </Link>
              </div>
              <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {featured.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>
            </section>
          )}
        </>
      )}
    </>
  );
};

export default Home;
