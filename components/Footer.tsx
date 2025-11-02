
import React from 'react';
import { useI18n } from '../i18n';
import { ICONS } from '../constants';

interface FooterProps {
  onAdminOpen: () => void;
}

const Footer: React.FC<FooterProps> = ({ onAdminOpen }) => {
  const { t } = useI18n();
  const year = new Date().getFullYear();
  let clickCount = 0;
  let clickTimeout: ReturnType<typeof setTimeout>;

  const handleLogoClick = () => {
    clickCount++;
    clearTimeout(clickTimeout);
    
    if (clickCount === 5) {
      onAdminOpen();
      clickCount = 0;
    } else {
      clickTimeout = setTimeout(() => {
        clickCount = 0;
      }, 1000); // Reset after 1 second
    }
  };
  
  return (
    <footer className="bg-black border-t border-neutral-800">
      <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left space-y-4 md:space-y-0">
          <div>
            <div 
              className="flex items-center justify-center md:justify-start space-x-2 mb-2 cursor-pointer"
              onClick={handleLogoClick}
              title="Admin Access"
            >
               <svg className="h-6 w-6 text-lime-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c0-3.517 3.134-6.364 7-6.364 3.866 0 7 2.847 7 6.364 0 3.518-3.134 6.364-7 6.364-3.866 0-7-2.846-7-6.364zM12 11c0 3.518-3.134 6.364-7 6.364-3.866 0-7-2.846-7-6.364 0-3.517 3.134-6.364 7-6.364 3.866 0 7 2.847 7 6.364z"/>
                </svg>
              <span className="text-lg font-bold text-white">CoreLabGlobal AI</span>
            </div>
            <p className="text-sm text-neutral-400">{t('footer.tagline')}</p>
          </div>
          <div className="flex flex-col items-center md:items-end space-y-2">
            <a 
              href="https://paypal.me/cannagrok/4.99" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-sm text-neutral-400 hover:text-lime-400 transition-colors"
            >
              {ICONS.HEART}
              <span>{t('footer.support')}</span>
            </a>
            <div className="text-sm text-neutral-500">
              {t('footer.copyright').replace('{year}', year)}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;