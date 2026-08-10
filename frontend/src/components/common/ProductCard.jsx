import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import { formatPrice } from '../../utils/formatters';

const ProductCard = ({ product }) => {
  const inStock = product.stockQuantity > 0 && product.isAvailable;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.35 }}
      className="card group flex h-full flex-col overflow-hidden"
    >
      <Link to={`/shop/${product.slug}`} className="relative block aspect-square overflow-hidden bg-gray-50">
        <img
          src={product.images?.[0]?.url}
          alt={product.name}
          loading="lazy"
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
        <div className="absolute left-3 top-3 flex flex-col gap-1.5">
          {product.isFeatured && (
            <span className="rounded-full bg-brand-blue px-2.5 py-1 text-xs font-semibold text-white">Featured</span>
          )}
          {product.isBestSeller && (
            <span className="rounded-full bg-brand-green px-2.5 py-1 text-xs font-semibold text-white">Best Seller</span>
          )}
        </div>
      </Link>
      <div className="flex flex-1 flex-col p-5">
        <p className="text-xs font-semibold uppercase tracking-wide text-brand-blue">{product.category?.name}</p>
        <Link to={`/shop/${product.slug}`}>
          <h3 className="mt-1 line-clamp-2 text-base font-semibold text-brand-dark hover:text-brand-blue">
            {product.name}
          </h3>
        </Link>
        <div className="mt-3 flex items-center gap-1.5 text-sm">
          {inStock ? (
            <>
              <FaCheckCircle className="text-brand-green" />
              <span className="text-brand-green">In Stock</span>
            </>
          ) : (
            <>
              <FaTimesCircle className="text-red-500" />
              <span className="text-red-500">Out of Stock</span>
            </>
          )}
        </div>
        <div className="mt-4 flex items-center justify-between">
          <span className="text-lg font-bold text-brand-dark">{formatPrice(product.price)}</span>
          <Link to={`/shop/${product.slug}`} className="text-sm font-semibold text-brand-blue hover:underline">
            View details
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
