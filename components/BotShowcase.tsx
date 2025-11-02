
import React, { useMemo } from 'react';
import { Bot } from '../types';
import { ICONS } from '../constants';
import { useI18n } from '../i18n';

const botIcons = [
  ICONS.DIAGNOSTICS,
  ICONS.NEXUS,
  ICONS.GROW,
];

const BotCard: React.FC<{ bot: Bot }> = ({ bot }) => (
  <div className="group bg-neutral-900/50 p-6 rounded-xl border border-neutral-800 h-full transition-all duration-300 hover:border-lime-500 hover:bg-neutral-900 shadow-lg hover:shadow-2xl hover:shadow-lime-500/30 text-center flex flex-col items-center">
    <div className="text-lime-400 mb-4 transition-transform duration-300 group-hover:scale-125 group-hover:-translate-y-1">{bot.icon}</div>
    <h3 className="text-xl font-bold text-white mb-2 transition-colors duration-300 group-hover:text-lime-400">{bot.name}</h3>
    <p className="text-neutral-400 text-sm">{bot.description}</p>
  </div>
);


const BotShowcase: React.FC = () => {
  const { t } = useI18n();

  const bots: Bot[] = useMemo(() => {
    const botContent = t('botShowcase.bots');
    return botContent.map((bot: { name: string; description: string }, index: number) => ({
      ...bot,
      icon: botIcons[index],
    }));
  }, [t]);

  return (
    <section id="bots" className="py-20 lg:py-28 bg-black">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold tracking-tight text-white mb-4">
            {t('botShowcase.title')}
          </h2>
          <p className="text-lg text-neutral-400">
            {t('botShowcase.description')}
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {bots.map((bot) => (
            <BotCard key={bot.name} bot={bot} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default BotShowcase;