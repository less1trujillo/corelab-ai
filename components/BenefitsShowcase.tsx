
import React, { useMemo } from 'react';
import { BenefitModule } from '../types';
import { ICONS } from '../constants';
import { useI18n } from '../i18n';

interface BenefitsShowcaseProps {
    onBenefitSelect: (benefit: BenefitModule) => void;
}

const staticModuleData = [
  { icon: ICONS.DIAGNOSTICS, image: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=800&auto=format&fit=crop' },
  { icon: ICONS.NEXUS, image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=800&auto=format&fit=crop' },
  { icon: ICONS.GROW, image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop' },
];

const BenefitsShowcase: React.FC<BenefitsShowcaseProps> = ({ onBenefitSelect }) => {
    const { t } = useI18n();

    const benefitModules: BenefitModule[] = useMemo(() => {
        const moduleContent = t('benefitsShowcase.modules');
        return moduleContent.map((module: Omit<BenefitModule, 'icon' | 'image'>, index: number) => ({
            ...module,
            ...staticModuleData[index],
        }));
    }, [t]);

    return (
        <section id="benefits-showcase" className="py-20 lg:py-28 bg-neutral-900/60 relative overflow-hidden">
            <div className="absolute inset-0 bg-grid-neutral-700/[0.1]"></div>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl lg:text-4xl font-bold tracking-tight text-white mb-4">
                        {t('benefitsShowcase.title')}
                    </h2>
                    <p className="text-lg text-neutral-400">
                        {t('benefitsShowcase.description')}
                    </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
                    {benefitModules.map((module, index) => (
                        <div key={index} className="bg-black p-6 rounded-2xl border border-neutral-800 flex flex-col h-full group">
                            <div className="flex-shrink-0 mb-4">
                                <div className="text-lime-400">
                                    {React.cloneElement(module.icon as React.ReactElement<any>, { className: "h-8 w-8"})}
                                </div>
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">{module.name}</h3>
                            <p className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-lime-400 to-green-500 mb-4 h-16">
                                {module.tagline}
                            </p>
                            <p className="text-neutral-400 text-sm flex-grow mb-6">
                                {module.description}
                            </p>
                             <div className="w-full h-48 rounded-lg overflow-hidden mb-6">
                               <img 
                                 src={module.image} 
                                 alt={module.name}
                                 className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                />
                            </div>
                            <button
                                onClick={() => onBenefitSelect(module)}
                                className="mt-auto w-full bg-neutral-800 hover:bg-lime-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors"
                            >
                                {t('benefitsShowcase.learnMore')}
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default BenefitsShowcase;