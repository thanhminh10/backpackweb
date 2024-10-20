import React from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode; // Add children prop here
  w?: number; // Optional width property
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children, w }) => {
    // Function to handle clicks on the backdrop
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // Close modal only if the click is on the backdrop, not inside the modal content
    if (e.currentTarget === e.target) {
      onClose();
    }
  };
  if (!isOpen) return null;

  return (
    <div
        onClick={handleBackdropClick} // Attach click handler here
     className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div 
        className={`bg-white rounded-lg shadow-lg p-4 relative`} 
        style={{ width: w ? `${w}px` : 'auto' }} // Use inline style for width
      >
        <div>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
