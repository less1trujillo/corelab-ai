
import React, { useState } from 'react';
import HowItWorks from './HowItWorks';
import BenefitsShowcase from './BenefitsShowcase';
import BenefitDetailModal from './BenefitDetailModal';
import { BenefitModule } from '../types';

interface FeaturesModalProps {
  onClose: () => void;
}

const FeaturesModal: React.FC<FeaturesModalProps> = ({ onClose }) => {
  const [selectedBenefit, setSelectedBenefit] = useState<BenefitModule | null>(null);

  return (
    <>
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
            <HowItWorks />
            <BenefitsShowcase onBenefitSelect={setSelectedBenefit} />
          </main>
        </div>
      </div>
      {selectedBenefit && <BenefitDetailModal benefit={selectedBenefit} onClose={() => setSelectedBenefit(null)} />}
    </>
  );
};

export default FeaturesModal;