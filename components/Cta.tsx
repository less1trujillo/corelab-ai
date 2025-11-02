
import React from 'react';
import { useI18n } from '../i18n';

interface CtaProps {
  onAuthOpen: () => void;
}

const Cta: React.FC<CtaProps> = ({ onAuthOpen }) => {
  const { t } = useI18n();
  return (
    <section id="cta" className="bg-gradient-to-r from-green-900/50 to-lime-900/50 py-20 lg:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
          {t('cta.title')}
        </h2>
        <p className="text-lg text-neutral-300 max-w-2xl mx-auto mb-8">
          {t('cta.description')}
        </p>
        <div className="flex flex-col items-center gap-4">
          <button
            onClick={onAuthOpen}
            className="bg-white text-black font-bold py-5 px-12 rounded-full transition-transform duration-300 ease-in-out transform hover:scale-110 cta-button-animation"
          >
            {t('cta.button')}
          </button>
        </div>
      </div>
    </section>
  );
};

export default Cta;