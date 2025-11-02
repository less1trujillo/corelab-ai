
import React from 'react';
import Pricing from './Pricing';
import CustomerJourney from './CustomerJourney';

interface PricingModalProps {
  onClose: () => void;
}

const PricingModal: React.FC<PricingModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-md z-[60] flex flex-col p-4" onClick={onClose}>
      <div 
        className="bg-black border border-neutral-800 rounded-2xl w-full h-full flex flex-col shadow-2xl shadow-lime-500/10 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <header className="flex justify-end p-2 flex-shrink-0">
          <button onClick={onClose} className="text-neutral-500 hover:text-white transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </header>
        <main className="overflow-y-auto">
          <Pricing />
          <CustomerJourney />
        </main>
      </div>
    </div>
  );
};

export default PricingModal;