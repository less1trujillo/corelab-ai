
import React, { useState, useEffect } from 'react';
import { useI18n } from '../i18n';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabaseClient';

interface HeaderProps {
    onAuthOpen: () => void;
    onNavigate: (modalName: string) => void;
}

const Header: React.FC<HeaderProps> = ({ onAuthOpen, onNavigate }) => {
    const [isScrolled, setIsScrolled] = useState(false);
    const { language, changeLanguage, t } = useI18n();
    const { user } = useAuth();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-black/50 backdrop-blur-lg border-b border-neutral-800' : 'bg-transparent'}`}>
      <div className="container mx-auto flex justify-between items-center py-4 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center space-x-2">
           <svg className="h-8 w-8 text-lime-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c0-3.517 3.134-6.364 7-6.364 3.866 0 7 2.847 7 6.364 0 3.518-3.134 6.364-7 6.364-3.866 0-7-2.846-7-6.364zM12 11c0 3.518-3.134 6.364-7 6.364-3.866 0-7-2.846-7-6.364 0-3.517 3.134-6.364 7-6.364 3.866 0 7 2.847 7 6.364z"/>
            </svg>
          <span className="text-xl font-bold tracking-tight text-white">CoreLabGlobal AI</span>
        </div>
        <div className="flex items-center space-x-4">
            <nav className="hidden md:flex items-center space-x-6">
              <button onClick={() => onNavigate('features')} className="text-sm font-medium text-neutral-300 hover:text-white transition-colors">{t('header.nav.features')}</button>
              <button onClick={() => onNavigate('security')} className="text-sm font-medium text-neutral-300 hover:text-white transition-colors">{t('header.nav.security')}</button>
              <button onClick={() => onNavigate('pricing')} className="text-sm font-medium text-neutral-300 hover:text-white transition-colors">{t('header.nav.pricing')}</button>
            </nav>
            <div className="hidden md:flex items-center border border-neutral-700 rounded-full p-1 space-x-1">
                <button onClick={() => changeLanguage('en')} className={`px-3 py-1 text-sm rounded-full transition-colors ${language === 'en' ? 'bg-neutral-200 text-black' : 'text-neutral-400 hover:bg-neutral-800'}`}>EN</button>
                <button onClick={() => changeLanguage('es')} className={`px-3 py-1 text-sm rounded-full transition-colors ${language === 'es' ? 'bg-neutral-200 text-black' : 'text-neutral-400 hover:bg-neutral-800'}`}>ES</button>
            </div>
            
            {user ? (
              <div className="hidden md:flex items-center space-x-4">
                <span className="text-sm text-neutral-300">{user.email}</span>
                <button 
                  onClick={() => supabase.auth.signOut()} 
                  className="bg-neutral-800 hover:bg-neutral-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
                >
                  Log Out
                </button>
              </div>
            ) : (
              <div className="hidden md:flex items-center space-x-4">
                <button onClick={onAuthOpen} className="text-sm font-medium text-neutral-300 hover:text-white transition-colors">{t('header.nav.login')}</button>
                <button onClick={onAuthOpen} className="bg-lime-600 hover:bg-lime-700 text-white font-semibold py-2 px-4 rounded-lg shadow-lg transition-transform transform hover:scale-105">
                    {t('header.cta')}
                </button>
              </div>
            )}
        </div>
      </div>
    </header>
  );
};

export default Header;