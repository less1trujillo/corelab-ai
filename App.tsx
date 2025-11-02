
import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Cta from './components/Cta';
import Footer from './components/Footer';
import AdminDashboard from './components/AdminDashboard';
import ReportModal from './components/ReportModal';
import AuthModal from './components/AuthModal';
import ClientDetailView from './components/ClientDetailView';
import FeaturesModal from './components/FeaturesModal';
import SecurityModal from './components/SecurityModal';
import PricingModal from './components/PricingModal';
import UserDashboard from './components/UserDashboard';
import { I18nProvider } from './i18n';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { Client } from './types';

const AppContent: React.FC = () => {
  const { user, loading } = useAuth();
  const [isAdminViewVisible, setIsAdminViewVisible] = useState(false);
  const [isReportVisible, setIsReportVisible] = useState(false);
  const [isAuthModalVisible, setIsAuthModalVisible] = useState(false);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [activeModal, setActiveModal] = useState<string | null>(null);

  const handleAdminToggle = () => setIsAdminViewVisible(!isAdminViewVisible);
  const handleReportToggle = () => setIsReportVisible(!isReportVisible);
  const handleAuthModalToggle = () => setIsAuthModalVisible(!isAuthModalVisible);
  const handleClientSelect = (client: Client) => setSelectedClient(client);
  const handleClientDetailClose = () => setSelectedClient(null);
  
  const handleAdminLoginSuccess = () => {
    setIsAuthModalVisible(false);
    setIsAdminViewVisible(true);
  };
  
  const openModal = (modalName: string) => setActiveModal(modalName);
  const closeModal = () => setActiveModal(null);

  if (loading) {
    return (
      <div className="bg-black min-h-screen flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-lime-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="bg-black min-h-screen font-sans text-neutral-200">
      <Header 
        onAuthOpen={handleAuthModalToggle} 
        onNavigate={openModal} 
      />
      
      {user ? (
        <UserDashboard onReportOpen={handleReportToggle} />
      ) : (
        <main className="overflow-x-hidden">
          <Hero onNavigate={openModal} />
          <Cta onAuthOpen={handleAuthModalToggle} />
        </main>
      )}

      <Footer onAdminOpen={handleAdminToggle} />
      
      {isAdminViewVisible && <AdminDashboard onClose={handleAdminToggle} onClientSelect={handleClientSelect} />}
      {isReportVisible && <ReportModal onClose={handleReportToggle} />}
      {isAuthModalVisible && <AuthModal onClose={handleAuthModalToggle} onAdminLogin={handleAdminLoginSuccess} />}
      {selectedClient && <ClientDetailView client={selectedClient} onClose={handleClientDetailClose} />}

      {activeModal === 'features' && <FeaturesModal onClose={closeModal} />}
      {activeModal === 'security' && <SecurityModal onClose={closeModal} />}
      {activeModal === 'pricing' && <PricingModal onClose={closeModal} />}
    </div>
  );
};

const App: React.FC = () => {
  return (
    <I18nProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </I18nProvider>
  );
};

export default App;