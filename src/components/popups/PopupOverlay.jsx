import React from 'react';

const PopupOverlay = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
        backdropFilter: 'blur(5px)'
      }}
      onClick={onClose}
    >
      <div
        style={{
           position: 'relative',
           width: 'auto',
           maxWidth: '95vw',
           maxHeight: '95vh',
           overflow: 'auto',
           display: 'flex', // To help child center if needed
           justifyContent: 'center',
           alignItems: 'center',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};

export default PopupOverlay;
