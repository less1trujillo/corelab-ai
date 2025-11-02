import React from 'react';
import { useI18n } from '../i18n';
import AiGrowthKit from './AiGrowthKit';
import ReputationManager from './ReputationManager';

const MomentumDashboard: React.FC = () => {
    const { t } = useI18n();

    return (
        <main className="pt-24 pb-20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-gradient-to-r from-green-900/30 to-lime-900/30 border border-lime-500/30 rounded-xl p-8 mb-12">
                    <h1 className="text-3xl font-bold text-white mb-2">
                        {t('momentumDashboard.welcomeTitle')}
                    </h1>
                    <p className="text-neutral-300 max-w-3xl">
                        {t('momentumDashboard.welcomeDescription')}
                    </p>
                </div>

                <ReputationManager />

                <div className="mt-16">
                    <AiGrowthKit />
                </div>
            </div>
        </main>
    );
};

export default MomentumDashboard;