import React from 'react';

export function AngularButton({ children, onClick, className = '', disabled = false, id = null }) {
  const combinedClass = `angular-button ${className}`.trim();

  return (
    <div className={combinedClass} id={id} onClick={!disabled ? onClick : undefined}>
      <button type="button" disabled={disabled}>
        {children}
      </button>
    </div>
  );
}