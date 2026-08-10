import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaFlask } from 'react-icons/fa';

const CategoryCard = ({ category }) => (
  <motion.div
    initial={{ opacity: 0, y: 16 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.35 }}
  >
    <Link
      to={`/shop?category=${category._id}`}
      className="card flex flex-col items-start gap-4 p-6 transition hover:-translate-y-1 hover:border-brand-blue"
    >
      <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-blue/10 text-brand-blue">
        <FaFlask size={22} />
      </span>
      <div>
        <h3 className="text-lg font-semibold text-brand-dark">{category.name}</h3>
        <p className="mt-1 text-sm text-brand-gray">{category.productCount ?? 0} products</p>
      </div>
    </Link>
  </motion.div>
);

export default CategoryCard;
