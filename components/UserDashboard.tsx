
import React, { useState, useCallback } from 'react';
import { useI18n } from '../i18n';
import { useAuth } from '../contexts/AuthContext';
import { SentinelReportData } from '../types';
import OnboardingForm from './OnboardingForm';
import SentinelReport from './SentinelReport';
import CheckoutModal from './CheckoutModal';
import MomentumDashboard from './MomentumDashboard';

interface UserDashboardProps {
    onReportOpen: () => void;
}

const UserDashboard: React.FC<UserDashboardProps> = ({ onReportOpen }) => {
    const { t } = useI18n();
    const { user, plan } = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const [report, setReport] = useState<SentinelReportData | null>(null);
    const [isCheckoutVisible, setIsCheckoutVisible] = useState(false);

    const handleAnalysisComplete = useCallback((data: SentinelReportData) => {
        setReport(data);
        setIsLoading(false);
    }, []);

    const handleFormSubmit = () => {
        setIsLoading(true);
    };

    const handleUpgradeClick = () => {
        setIsCheckoutVisible(true);
    };

    if (plan === 'momentum') {
        return <MomentumDashboard />;
    }

    return (
        <>
            <main className="pt-24 pb-20">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold text-white mb-2">
                        {t('userDashboard.welcome')}
                    </h1>
                    <p className="text-neutral-400 mb-12">
                        {user?.email}
                    </p>

                    <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 md:p-8">
                        {isLoading ? (
                            <div className="text-center py-16">
                                <div className="w-12 h-12 border-4 border-lime-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                                <p className="text-lg text-neutral-300">{t('userDashboard.onboarding.loading')}</p>
                            </div>
                        ) : report ? (
                            <SentinelReport report={report} onUpgrade={handleUpgradeClick} />
                        ) : (
                            <OnboardingForm onAnalysisComplete={handleAnalysisComplete} onFormSubmit={handleFormSubmit} onReportOpen={onReportOpen} />
                        )}
                    </div>
                </div>
            </main>
            {isCheckoutVisible && <CheckoutModal onClose={() => setIsCheckoutVisible(false)} />}
        </>
    );
};

export default UserDashboard;