import React from 'react';

const EmptyState = ({ title, description, action }) => (
  <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-gray-200 py-16 text-center">
    <h3 className="text-lg font-semibold text-brand-dark">{title}</h3>
    {description && <p className="mt-2 max-w-sm text-sm text-brand-gray">{description}</p>}
    {action && <div className="mt-6">{action}</div>}
  </div>
);

export default EmptyState;
