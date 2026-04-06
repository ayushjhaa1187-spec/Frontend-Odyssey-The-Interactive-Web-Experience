import React from 'react';

const LoadingSkeleton = () => (
  <div style={{ padding: 'var(--space-5)', maxWidth: '800px', margin: '0 auto' }}>
    <div className="skeleton skeleton-title" style={{ width: '40%', margin: '0 auto 24px' }}></div>
    <div className="skeleton skeleton-text" style={{ width: '70%', margin: '0 auto 8px' }}></div>
    <div className="skeleton skeleton-text" style={{ width: '55%', margin: '0 auto 32px' }}></div>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
      <div className="skeleton skeleton-card"></div>
      <div className="skeleton skeleton-card"></div>
      <div className="skeleton skeleton-card"></div>
    </div>
  </div>
);

export default LoadingSkeleton;
