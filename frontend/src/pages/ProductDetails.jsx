import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { FaWhatsapp, FaCheckCircle, FaTimesCircle, FaExclamationTriangle } from 'react-icons/fa';
import SEO from '../components/common/SEO';
import Loader from '../components/common/Loader';
import ProductCard from '../components/common/ProductCard';
import { fetchProductBySlug } from '../api/products';
import { formatPrice } from '../utils/formatters';
import { buildProductInquiryMessage, buildWhatsAppUrl } from '../utils/whatsapp';

const ProductDetails = () => {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [activeImage, setActiveImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [customerMessage, setCustomerMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    setLoading(true);
    setNotFound(false);
    setActiveImage(0);
    fetchProductBySlug(slug)
      .then((res) => {
        setProduct(res.data.product);
        setRelated(res.data.relatedProducts);
      })
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) return <Loader fullScreen />;
  if (notFound || !product) {
    return (
      <div className="container-page py-24 text-center">
        <h1 className="text-2xl font-bold text-brand-dark">Product not found</h1>
        <Link to="/shop" className="mt-4 inline-block text-brand-blue hover:underline">
          Back to shop
        </Link>
      </div>
    );
  }

  const inStock = product.stockQuantity > 0 && product.isAvailable;
  const whatsappUrl = buildWhatsAppUrl(
    buildProductInquiryMessage({ productName: product.name, quantity, customerMessage })
  );

  return (
    <>
      <SEO
        title={product.name}
        description={product.description?.slice(0, 160)}
        image={product.images?.[0]?.url}
        url={`/shop/${product.slug}`}
        type="product"
        structuredData={{
          '@context': 'https://schema.org',
          '@type': 'Product',
          name: product.name,
          description: product.description,
          image: product.images?.map((img) => img.url),
          offers: { '@type': 'Offer', priceCurrency: 'USD', price: product.price, availability: inStock ? 'InStock' : 'OutOfStock' },
        }}
      />

      <div className="container-page py-10">
        <nav className="mb-6 text-sm text-brand-gray">
          <Link to="/" className="hover:text-brand-blue">Home</Link> /{' '}
          <Link to="/shop" className="hover:text-brand-blue">Shop</Link> /{' '}
          <span className="text-brand-dark">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
          <div>
            <div className="aspect-square overflow-hidden rounded-2xl border border-gray-100 bg-gray-50">
              <img src={product.images[activeImage]?.url} alt={product.name} className="h-full w-full object-cover" />
            </div>
            {product.images.length > 1 && (
              <div className="mt-4 grid grid-cols-5 gap-3">
                {product.images.map((img, idx) => (
                  <button
                    key={img.publicId}
                    type="button"
                    onClick={() => setActiveImage(idx)}
                    className={`aspect-square overflow-hidden rounded-xl border-2 ${
                      idx === activeImage ? 'border-brand-blue' : 'border-transparent'
                    }`}
                  >
                    <img src={img.url} alt={`${product.name} ${idx + 1}`} className="h-full w-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-brand-blue">{product.category?.name}</p>
            <h1 className="mt-2 text-3xl font-extrabold text-brand-dark">{product.name}</h1>

            <div className="mt-4 flex items-center gap-3">
              {inStock ? (
                <span className="flex items-center gap-1.5 text-sm font-semibold text-brand-green">
                  <FaCheckCircle /> In Stock ({product.stockQuantity} available)
                </span>
              ) : (
                <span className="flex items-center gap-1.5 text-sm font-semibold text-red-500">
                  <FaTimesCircle /> Out of Stock
                </span>
              )}
            </div>

            <p className="mt-4 text-3xl font-bold text-brand-dark">{formatPrice(product.price)}</p>
            <p className="mt-4 leading-relaxed text-brand-gray">{product.description}</p>

            {product.benefits?.length > 0 && (
              <div className="mt-6">
                <h3 className="font-semibold text-brand-dark">Benefits</h3>
                <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-brand-gray">
                  {product.benefits.map((benefit) => (
                    <li key={benefit}>{benefit}</li>
                  ))}
                </ul>
              </div>
            )}

            <div className="mt-6 flex items-start gap-2 rounded-xl bg-amber-50 p-4 text-sm text-amber-800">
              <FaExclamationTriangle className="mt-0.5 shrink-0" />
              <p>{product.warnings}</p>
            </div>

            <div className="mt-8 flex flex-wrap items-end gap-4">
              <div>
                <label className="label-field">Quantity</label>
                <input
                  type="number"
                  min={1}
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
                  className="input-field w-24"
                />
              </div>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`btn-whatsapp flex-1 sm:flex-none ${!inStock ? 'pointer-events-none opacity-50' : ''}`}
              >
                <FaWhatsapp size={18} /> Buy Now via WhatsApp
              </a>
            </div>
            <textarea
              value={customerMessage}
              onChange={(e) => setCustomerMessage(e.target.value)}
              placeholder="Add a note for the seller (optional)"
              rows={2}
              className="input-field mt-4"
            />
          </div>
        </div>

        {(product.dosageInformation || product.specifications?.length > 0) && (
          <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2">
            {product.dosageInformation && (
              <div className="card p-6">
                <h3 className="font-semibold text-brand-dark">Dosage Information</h3>
                <p className="mt-2 whitespace-pre-line text-sm text-brand-gray">{product.dosageInformation}</p>
              </div>
            )}
            {product.specifications?.length > 0 && (
              <div className="card p-6">
                <h3 className="font-semibold text-brand-dark">Specifications</h3>
                <dl className="mt-3 divide-y divide-gray-100">
                  {product.specifications.map((spec) => (
                    <div key={spec.label} className="flex justify-between py-2 text-sm">
                      <dt className="text-brand-gray">{spec.label}</dt>
                      <dd className="font-medium text-brand-dark">{spec.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            )}
          </div>
        )}

        {related.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-brand-dark">Related Products</h2>
            <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {related.map((item) => (
                <ProductCard key={item._id} product={item} />
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ProductDetails;
