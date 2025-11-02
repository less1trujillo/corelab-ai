
import React, { useMemo } from 'react';
import { Principle } from '../types';
import { ICONS } from '../constants';
import { useI18n } from '../i18n';

const principleIcons = [ICONS.AUTONOMY, ICONS.ZERO_COST, ICONS.SUSTAINABILITY, ICONS.EFFICIENCY, ICONS.SCALABLE, ICONS.SHIELD_CHECK];

const PhilosophyCard: React.FC<{ principle: Principle }> = ({ principle }) => (
    <div className="flex items-start space-x-4">
        <div className="flex-shrink-0 text-lime-400 mt-1">{principle.icon}</div>
        <div>
            <h4 className="text-lg font-bold text-white">{principle.name}</h4>
            <p className="text-neutral-400">{principle.description}</p>
        </div>
    </div>
);

const Philosophy: React.FC = () => {
    const { t } = useI18n();

    const principles: Principle[] = useMemo(() => {
        const principleContent = t('philosophy.principles');
        // Ensure we only map as many principles as we have icons for
        return principleContent.slice(0, principleIcons.length).map((p: { name: string; description: string }, index: number) => ({
            ...p,
            icon: principleIcons[index]
        }));
    }, [t]);

    return (
        <section id="philosophy" className="py-20 lg:py-28 bg-black">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div className="lg:pr-12">
                        <h2 className="text-3xl lg:text-4xl font-bold tracking-tight text-white mb-4">
                           {t('philosophy.title')}
                        </h2>
                        <p className="text-lg text-neutral-400 mb-8">
                           {t('philosophy.description')}
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                            {principles.map(p => <PhilosophyCard key={p.name} principle={p} />)}
                        </div>
                    </div>
                     <div className="hidden lg:block relative h-96">
                        <div className="absolute inset-0 bg-green-900/30 blur-3xl rounded-full animate-pulse"></div>
                        <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop" alt="Strategic intelligence visualization" className="relative w-full h-full object-cover rounded-2xl shadow-2xl" />
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Philosophy;