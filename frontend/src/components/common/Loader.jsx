import React from 'react';

const Loader = ({ fullScreen = false }) => (
  <div className={fullScreen ? 'flex min-h-[60vh] items-center justify-center' : 'flex items-center justify-center py-12'}>
    <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-brand-blue" />
  </div>
);

export default Loader;
