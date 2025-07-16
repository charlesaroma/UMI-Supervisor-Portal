import React from 'react';

const PageHeader = ({ title, subtitle, children }) => {
  return (
    <div className="border-b border-gray-200 pb-4 mb-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-semantic-text-primary">{title}</h1>
          {subtitle && (
            <p className="mt-1 text-semantic-text-secondary">{subtitle}</p>
          )}
        </div>
        {children && (
          <div className="flex items-center gap-3">
            {children}
          </div>
        )}
      </div>
    </div>
  );
};

export default PageHeader; 