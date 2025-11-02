
import React, { useMemo } from 'react';
import { Plan } from '../types';
import { ICONS } from '../constants';
import { useI18n } from '../i18n';

const staticPlanData = [
    { isFeatured: false },
    { isFeatured: false },
    { isFeatured: true },
    { isFeatured: false },
];

const PricingCard: React.FC<{ plan: Plan }> = ({ plan }) => {
    const cardClasses = `
        flex flex-col h-full p-8 rounded-2xl bg-neutral-900/50 border relative
        ${plan.isFeatured ? 'border-lime-500 scale-105 shadow-2xl shadow-lime-500/20' : 'border-neutral-800'}
        transition-transform duration-300
    `;

    const buttonClasses = `
        w-full mt-8 font-bold py-3 px-6 rounded-lg transition-all
        ${plan.isFeatured 
            ? 'bg-gradient-to-r from-lime-500 to-green-600 hover:from-lime-600 hover:to-green-700 text-white' 
            : 'bg-neutral-800 hover:bg-neutral-700 text-neutral-200'}
    `;

    return (
        <div className={cardClasses}>
            {plan.isFeatured && plan.featuredText && (
                <div className="absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2">
                    <span className="bg-lime-500 text-black text-xs font-bold px-3 py-1 rounded-full uppercase">{plan.featuredText}</span>
                </div>
            )}
            <h3 className="text-xl font-semibold text-white">{plan.name}</h3>
            <p className="text-neutral-400 mt-2 mb-6 text-sm">{plan.description}</p>
            <div className="my-4">
                <span className="text-4xl font-extrabold text-white">{plan.price}</span>
                <span className="text-neutral-500 ml-1">{plan.priceDetails}</span>
            </div>
            <ul className="space-y-3 text-neutral-300 flex-grow">
                {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                        <div className="flex-shrink-0 mt-1 mr-2">
                           {feature.toLowerCase().includes('hephaestus') ? ICONS.HEPHAESTUS : ICONS.CHECK}
                        </div>
                        <span dangerouslySetInnerHTML={{ __html: feature }}></span>
                    </li>
                ))}
            </ul>
            <button className={buttonClasses}>{plan.ctaText}</button>
        </div>
    );
};


const Pricing: React.FC = () => {
    const { t } = useI18n();

    const plans: Plan[] = useMemo(() => {
        const planContent = t('pricing.plans');
        return planContent.map((planData: Omit<Plan, 'isFeatured'>, index: number) => ({
            ...planData,
            ...staticPlanData[index],
        }));
    }, [t]);

    return (
        <section id="pricing" className="py-20 lg:py-28 bg-black relative">
            <div className="absolute inset-0 bg-grid-neutral-800/[0.1] [mask-image:linear-gradient(to_bottom,transparent,white_20%,white_80%,transparent)]"></div>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl lg:text-4xl font-bold tracking-tight text-white mb-4">
                        {t('pricing.title')}
                    </h2>
                    <p className="text-lg text-neutral-400">
                       {t('pricing.description')}
                    </p>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 max-w-7xl mx-auto items-start">
                    {plans.map((plan) => (
                        <PricingCard key={plan.name} plan={plan} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Pricing;