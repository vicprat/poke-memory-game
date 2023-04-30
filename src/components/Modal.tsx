import React, { ReactNode } from 'react';
import Button from './Button';

interface ModalProps {
  children: ReactNode;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ children, onClose }) => {
  return (
    <div className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center">
        <div className="fixed inset-0 transition-opacity">
          <div className="absolute inset-0 bg-gray-500 opacity-75" />
        </div>
        <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
          <div className="grid grid-cols-1 gap-4 items-center justify-between text-center">
            {children}
            <Button
            onClick={onClose}
          >
            Cerrar
          </Button>
          </div>
         
        </div>
      </div>
    </div>
  );
};

export default Modal;

