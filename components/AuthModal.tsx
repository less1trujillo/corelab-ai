
import React, { useState } from 'react';
import { useI18n } from '../i18n';
import { ICONS } from '../constants';
import { supabase } from '../lib/supabaseClient';

interface AuthModalProps {
  onClose: () => void;
  onAdminLogin: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ onClose, onAdminLogin }) => {
  const { t } = useI18n();
  const [isLoginView, setIsLoginView] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const toggleView = () => {
    setIsLoginView(!isLoginView);
    setError('');
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    await supabase.auth.signInWithOAuth({
      provider: 'google',
    });
    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (isLoginView) {
      // Special admin login check
      if (email === 'master@corelab.global' && password === 'HephaestusForge3136') {
        onAdminLogin();
        setLoading(false);
        return;
      }
      
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) setError(error.message);
      else onClose();

    } else { // Signup view
      const { error } = await supabase.auth.signUp({ email, password });
      if (error) setError(error.message);
      else onClose();
    }
    setLoading(false);
  };


  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-lg z-[100] flex items-center justify-center p-4" onClick={onClose}>
      <div 
        className="bg-neutral-900 border border-neutral-700 rounded-2xl w-full max-w-md flex flex-col shadow-2xl shadow-lime-500/20"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-end p-2">
          <button onClick={onClose} className="text-neutral-500 hover:text-white transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-8 pt-0">
          <h2 className="text-2xl font-bold text-white text-center mb-2">
            {isLoginView ? t('authModal.loginTitle') : t('authModal.signupTitle')}
          </h2>
          <p className="text-neutral-400 text-center text-sm mb-6">
            {isLoginView ? t('authModal.loginSubtitle') : t('authModal.signupSubtitle')}
          </p>
          
          <button 
            onClick={handleGoogleSignIn}
            disabled={loading}
            className="w-full flex items-center justify-center gap-3 bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors mb-4"
          >
            {ICONS.GOOGLE}
            <span>{t('authModal.googleButton')}</span>
          </button>

          <div className="relative flex py-5 items-center">
              <div className="flex-grow border-t border-neutral-700"></div>
              <span className="flex-shrink mx-4 text-neutral-500 text-xs uppercase">{t('authModal.or')}</span>
              <div className="flex-grow border-t border-neutral-700"></div>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit}>
            {!isLoginView && (
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-neutral-300 mb-1">{t('authModal.nameLabel')}</label>
                <input type="text" id="name" name="name" className="w-full bg-neutral-800 border border-neutral-600 text-white rounded-lg p-3 focus:ring-lime-500 focus:border-lime-500" placeholder={t('authModal.namePlaceholder')} required />
              </div>
            )}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-neutral-300 mb-1">{t('authModal.emailLabel')}</label>
              <input 
                type="email" 
                id="email" 
                name="email" 
                className="w-full bg-neutral-800 border border-neutral-600 text-white rounded-lg p-3 focus:ring-lime-500 focus:border-lime-500" 
                placeholder={t('authModal.emailPlaceholder')} 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required 
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-neutral-300 mb-1">{t('authModal.passwordLabel')}</label>
              <input 
                type="password" 
                id="password" 
                name="password" 
                className="w-full bg-neutral-800 border border-neutral-600 text-white rounded-lg p-3 focus:ring-lime-500 focus:border-lime-500" 
                placeholder="••••••••" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {error && <p className="text-red-500 text-sm text-center">{error}</p>}
            <button type="submit" disabled={loading} className="w-full bg-lime-600 hover:bg-lime-700 text-white font-bold py-3 px-4 rounded-lg transition-colors disabled:bg-neutral-700">
              {loading ? '...' : (isLoginView ? t('authModal.loginButton') : t('authModal.signupButton'))}
            </button>
          </form>

          <p className="text-center text-sm text-neutral-400 mt-6">
            {isLoginView ? t('authModal.noAccount') : t('authModal.hasAccount')}
            <button onClick={toggleView} className="font-semibold text-lime-400 hover:underline ml-1">
              {isLoginView ? t('authModal.signupLink') : t('authModal.loginLink')}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;