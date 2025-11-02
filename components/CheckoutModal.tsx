
import React from 'react';
import { useI18n } from '../i18n';
import { useAuth } from '../contexts/AuthContext';

interface CheckoutModalProps {
  onClose: () => void;
}

const CheckoutModal: React.FC<CheckoutModalProps> = ({ onClose }) => {
  const { t } = useI18n();
  const { upgradePlan } = useAuth();

  const handleUpgrade = () => {
    upgradePlan('momentum');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-lg z-[100] flex items-center justify-center p-4" onClick={onClose}>
      <div 
        className="bg-neutral-900 border border-neutral-700 rounded-2xl w-full max-w-lg flex flex-col shadow-2xl shadow-lime-500/20"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center p-4 border-b border-neutral-800">
          <h2 className="text-xl font-bold text-white">{t('checkoutModal.title')}</h2>
          <button onClick={onClose} className="text-neutral-500 hover:text-white transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-8">
          <p className="text-neutral-300 mb-6">{t('checkoutModal.description')}</p>

          <div className="bg-neutral-800/50 p-6 rounded-lg border border-neutral-700">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-white">{t('checkoutModal.planName')}</h3>
                <div>
                    <span className="text-3xl font-extrabold text-white">{t('checkoutModal.price')}</span>
                    <span className="text-neutral-400 ml-1">{t('checkoutModal.priceDetails')}</span>
                </div>
            </div>
            <p className="text-sm text-neutral-400">Billed monthly. Cancel anytime.</p>
          </div>
          
          <div className="mt-8">
             {/* This would be replaced with a real Stripe Element */}
            <div className="w-full bg-neutral-800 border border-neutral-600 text-neutral-400 rounded-lg p-3 mb-4">
                Mock Payment Form
            </div>

            <button 
              onClick={handleUpgrade} 
              className="w-full bg-lime-600 hover:bg-lime-700 text-white font-bold py-3 px-4 rounded-lg transition-colors"
            >
              {t('checkoutModal.button')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutModal;