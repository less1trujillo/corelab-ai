
import React from 'react';
import { BenefitModule } from '../types';
import { ICONS } from '../constants';

interface BenefitDetailModalProps {
  benefit: BenefitModule;
  onClose: () => void;
}

const BenefitDetailModal: React.FC<BenefitDetailModalProps> = ({ benefit, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-lg z-[100] flex items-center justify-center p-4" onClick={onClose}>
      <div 
        className="bg-neutral-900 border border-neutral-700 rounded-2xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl shadow-lime-500/20"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center p-4 border-b border-neutral-800 flex-shrink-0">
          <div className="flex items-center space-x-3">
            <div className="text-lime-400">
              {React.cloneElement(benefit.icon as React.ReactElement<any>, { className: "h-6 w-6"})}
            </div>
            <h2 className="text-xl font-bold text-white">{benefit.name}</h2>
          </div>
          <button onClick={onClose} className="text-neutral-500 hover:text-white transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-6 md:p-8 overflow-y-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="md:pr-8">
              <h3 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-lime-400 to-green-500 mb-4">
                {benefit.tagline}
              </h3>
              <p className="text-neutral-300 leading-relaxed mb-6">
                {benefit.description}
              </p>
              <h4 className="text-lg font-semibold text-white mb-4">Key Capabilities:</h4>
              <ul className="space-y-3 text-neutral-300">
                {benefit.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <div className="flex-shrink-0 mt-1 mr-3 text-lime-400">{ICONS.CHECK}</div>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="w-full h-64 md:h-full rounded-lg overflow-hidden">
              <img 
                src={benefit.image} 
                alt={benefit.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BenefitDetailModal;