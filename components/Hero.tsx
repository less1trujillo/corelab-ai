
import React from 'react';
import { useI18n } from '../i18n';
import { ICONS } from '../constants';

interface HeroProps {
    onNavigate: (modalName: string) => void;
}

const ValuePillarCard: React.FC<{ icon: React.ReactNode; title: string; description: string; onClick: () => void; }> = ({ icon, title, description, onClick }) => (
    <div 
        onClick={onClick}
        className="group relative bg-neutral-900/50 p-6 rounded-xl border border-neutral-800 h-full transition-all duration-300 hover:border-lime-500 hover:bg-neutral-900 shadow-lg hover:shadow-2xl hover:shadow-lime-500/30 cursor-pointer"
    >
        <div className="flex items-center space-x-4 mb-4">
            <div className="text-lime-400 transition-transform duration-300 group-hover:scale-110">{icon}</div>
            <h3 className="text-xl font-bold text-white transition-colors duration-300 group-hover:text-lime-400">{title}</h3>
        </div>
        <p className="text-neutral-400 text-sm">{description}</p>
    </div>
);


const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  const { t } = useI18n();

  const pillars = [
    {
        icon: ICONS.GROW,
        title: t('hero.pillars.growth.title'),
        description: t('hero.pillars.growth.description'),
        onClick: () => onNavigate('features'),
    },
    {
        icon: ICONS.NEXUS,
        title: t('hero.pillars.operations.title'),
        description: t('hero.pillars.operations.description'),
        onClick: () => onNavigate('features'),
    },
    {
        icon: ICONS.SHIELD_CHECK,
        title: t('hero.pillars.security.title'),
        description: t('hero.pillars.security.description'),
        onClick: () => onNavigate('security'),
    },
  ];

  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-28 text-center bg-black overflow-hidden">
      <div className="absolute inset-0 bg-grid-neutral-800/[0.2] [mask-image:linear-gradient(to_bottom,white_5%,transparent_100%)]"></div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-lime-400 to-green-600 mb-6 leading-tight">
          {t('hero.title')}
        </h1>
        <p className="max-w-3xl mx-auto text-lg lg:text-xl text-neutral-300 mb-12">
          {t('hero.subtitle')}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-12 text-left">
            {pillars.map(p => <ValuePillarCard key={p.title} {...p} />)}
        </div>

      </div>
    </section>
  );
};

export default Hero;