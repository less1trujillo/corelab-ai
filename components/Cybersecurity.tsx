
import React, { useMemo } from 'react';
import { useI18n } from '../i18n';
import { ICONS } from '../constants';

const featureIcons = [ICONS.SHIELD_CHECK, ICONS.PROACTIVE_THREAT, ICONS.COMPLIANCE, ICONS.DATA_ENCRYPTION];

const Cybersecurity: React.FC = () => {
    const { t } = useI18n();

    const features = useMemo(() => {
        const featureContent = t('cybersecurity.features');
        return featureContent.map((feature: { title: string, description: string }, index: number) => ({
            ...feature,
            icon: featureIcons[index]
        }));
    }, [t]);

    return (
        <section id="cybersecurity" className="py-20 lg:py-28 bg-black relative">
            <div className="absolute inset-0 bg-grid-neutral-800/[0.1]"></div>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl lg:text-4xl font-bold tracking-tight text-white mb-4">
                        {t('cybersecurity.title')}
                    </h2>
                    <p className="text-lg text-neutral-400">
                        {t('cybersecurity.description')}
                    </p>
                </div>
                <div className="max-w-5xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {features.map((feature) => (
                            <div key={feature.title} className="flex items-start space-x-4 p-6 bg-neutral-900/50 border border-neutral-800 rounded-xl">
                                <div className="flex-shrink-0 text-lime-400 mt-1">
                                    {React.cloneElement(feature.icon as React.ReactElement<any>, { className: "h-8 w-8"})}
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-white mb-2">{feature.title}</h3>
                                    <p className="text-sm text-neutral-400">{feature.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <p className="text-center mt-12 text-md text-neutral-400 max-w-3xl mx-auto">
                        {t('cybersecurity.cta')} <a href="#pricing" className="font-bold text-lime-400 hover:text-lime-300 underline">{t('cybersecurity.ctaLink')}</a>.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default Cybersecurity;