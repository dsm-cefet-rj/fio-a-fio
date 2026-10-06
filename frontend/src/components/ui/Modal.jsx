import React, { useEffect } from 'react';
import { X } from 'lucide-react';

export const Modal = ({ isOpen, onClose, title, children, maxWidth = 'max-w-lg' }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      const previousOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = previousOverflow;
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-zinc-900/60 backdrop-blur-sm animate-fadeIn">
      <div className={`relative w-full ${maxWidth} max-h-[92dvh] bg-white rounded-t-2xl sm:rounded-2xl shadow-xl overflow-hidden flex flex-col animate-scaleUp border border-rose-100`}>
        <div className="flex items-center justify-between px-6 py-4 border-b border-rose-100 bg-rose-50/40">
          <h3 className="text-lg font-bold text-zinc-900">{title}</h3>
          <button
            onClick={onClose}
            className="p-1 text-zinc-400 hover:text-zinc-700 hover:bg-rose-100 rounded-lg transition-colors"
          >
            <X size={20} />
          </button>
        </div>
        <div className="min-h-0 p-4 sm:p-6 overflow-y-auto overscroll-contain">{children}</div>
      </div>
    </div>
  );
};
