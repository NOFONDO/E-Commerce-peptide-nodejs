import React from 'react';
import { Link } from 'react-router-dom';
import { FaFlask } from 'react-icons/fa';
import SEO from '../components/common/SEO';

const NotFound = () => (
  <>
    <SEO title="Page Not Found" description="The page you are looking for does not exist." />
    <div className="container-page flex min-h-[70vh] flex-col items-center justify-center text-center">
      <span className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-blue/10 text-brand-blue">
        <FaFlask size={28} />
      </span>
      <h1 className="mt-6 text-5xl font-extrabold text-brand-dark">404</h1>
      <p className="mt-3 text-brand-gray">The page you are looking for doesn't exist or has been moved.</p>
      <Link to="/" className="btn-primary mt-8">
        Back to Home
      </Link>
    </div>
  </>
);

export default NotFound;
