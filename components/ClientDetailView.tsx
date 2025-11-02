
import React, { useState, useMemo } from 'react';
import { useI18n } from '../i18n';
import { Client, ChartDataPoint, BotMetric } from '../types';
import { ICONS } from '../constants';

interface ClientDetailViewProps {
  client: Client;
  onClose: () => void;
}

const generateChartData = (): ChartDataPoint[] => {
    return Array.from({ length: 12 }, (_, i) => ({
        x: i,
        y: 50 + Math.random() * 40 + Math.sin(i / 2) * 10,
    }));
};

const Chart: React.FC<{ data: ChartDataPoint[], color: string }> = ({ data, color }) => {
    const maxY = 100;
    const points = data.map((p, i) => `${(i / (data.length - 1)) * 100},${100 - (p.y / maxY) * 100}`).join(' ');
    const gradientId = `chartGradient-${color}`;

    return (
        <svg className="w-full h-24" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
                <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={`var(--tw-gradient-from, ${color})`} stopOpacity={0.4}/>
                    <stop offset="95%" stopColor={`var(--tw-gradient-to, ${color})`} stopOpacity={0}/>
                </linearGradient>
            </defs>
            <polyline
                fill={`url(#${gradientId})`}
                stroke={color}
                strokeWidth="2"
                points={points}
            />
        </svg>
    );
};

const ClientDetailView: React.FC<ClientDetailViewProps> = ({ client, onClose }) => {
  const { t } = useI18n();
  const [botStates, setBotStates] = useState({ sentinel: true, nexus: true, growth: false });

  const toggleBot = (bot: 'sentinel' | 'nexus' | 'growth') => {
      setBotStates(prev => ({ ...prev, [bot]: !prev[bot] }));
  };

  const botDetails = useMemo(() => {
    const details = t('clientDetailView');
    return {
      sentinel: {
        title: details.bots.sentinel.title,
        color: '#a3e635', // lime-400
        metrics: [
          { label: details.bots.sentinel.metrics.risks, value: '3', icon: ICONS.PROACTIVE_THREAT },
          { label: details.bots.sentinel.metrics.opportunities, value: '8', icon: ICONS.TARGET_GOAL },
        ],
        chartData: generateChartData(),
      },
      nexus: {
        title: details.bots.nexus.title,
        color: '#4ade80', // green-400
        metrics: [
          { label: details.bots.nexus.metrics.emails, value: '1,204', icon: ICONS.EMAIL_BOT },
          { label: details.bots.nexus.metrics.reviews, value: '89', icon: ICONS.REVIEW_BOT },
        ],
        chartData: generateChartData(),
      },
      growth: {
        title: details.bots.growth.title,
        color: '#10b981', // emerald-500
        metrics: [
          { label: details.bots.growth.metrics.traffic, value: '+15.2%', icon: ICONS.TRAFFIC_BOT },
          { label: details.bots.growth.metrics.conversions, value: '+8.1%', icon: ICONS.CONVERSION_BOT },
        ],
        chartData: generateChartData(),
      }
    };
  }, [t]);

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-xl z-[150] flex items-center justify-center p-4" onClick={onClose}>
      <div 
        className="bg-neutral-900 border border-neutral-700 rounded-2xl w-full max-w-6xl h-[90vh] flex flex-col shadow-2xl shadow-lime-500/20"
        onClick={(e) => e.stopPropagation()}
      >
        <header className="flex justify-between items-center p-4 border-b border-neutral-800 flex-shrink-0">
          <div>
            <h2 className="text-xl font-bold text-lime-400">{t('clientDetailView.title')}</h2>
            <p className="text-sm text-neutral-400">{t('clientDetailView.subtitle')}: <span className="font-bold text-white">{client.name}</span></p>
          </div>
          <button onClick={onClose} className="text-neutral-500 hover:text-white transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </header>

        <main className="p-6 overflow-y-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Sentinel AI */}
            <div className="bg-neutral-800/50 p-6 rounded-lg">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-lime-400">{botDetails.sentinel.title}</h3>
                <label className="inline-flex items-center cursor-pointer">
                  <input type="checkbox" checked={botStates.sentinel} onChange={() => toggleBot('sentinel')} className="sr-only peer" />
                  <div className="relative w-11 h-6 bg-neutral-700 rounded-full peer peer-focus:ring-4 peer-focus:ring-lime-800 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-lime-600"></div>
                </label>
              </div>
              <div className="space-y-3 mb-4">
                {botDetails.sentinel.metrics.map(metric => (
                  <div key={metric.label} className="flex items-center text-sm">
                    <div className="text-neutral-400 mr-2">{metric.icon}</div>
                    <span className="text-neutral-300">{metric.label}:</span>
                    <span className="font-bold text-white ml-auto">{metric.value}</span>
                  </div>
                ))}
              </div>
              <Chart data={botDetails.sentinel.chartData} color={botDetails.sentinel.color} />
            </div>

            {/* Nexus AI */}
            <div className="bg-neutral-800/50 p-6 rounded-lg">
               <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-green-400">{botDetails.nexus.title}</h3>
                <label className="inline-flex items-center cursor-pointer">
                  <input type="checkbox" checked={botStates.nexus} onChange={() => toggleBot('nexus')} className="sr-only peer" />
                  <div className="relative w-11 h-6 bg-neutral-700 rounded-full peer peer-focus:ring-4 peer-focus:ring-green-800 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                </label>
              </div>
              <div className="space-y-3 mb-4">
                {botDetails.nexus.metrics.map(metric => (
                  <div key={metric.label} className="flex items-center text-sm">
                    <div className="text-neutral-400 mr-2">{metric.icon}</div>
                    <span className="text-neutral-300">{metric.label}:</span>
                    <span className="font-bold text-white ml-auto">{metric.value}</span>
                  </div>
                ))}
              </div>
              <Chart data={botDetails.nexus.chartData} color={botDetails.nexus.color} />
            </div>

            {/* Growth AI */}
            <div className="bg-neutral-800/50 p-6 rounded-lg">
               <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-emerald-400">{botDetails.growth.title}</h3>
                <label className="inline-flex items-center cursor-pointer">
                  <input type="checkbox" checked={botStates.growth} onChange={() => toggleBot('growth')} className="sr-only peer" />
                  <div className="relative w-11 h-6 bg-neutral-700 rounded-full peer peer-focus:ring-4 peer-focus:ring-emerald-800 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
                </label>
              </div>
              <div className="space-y-3 mb-4">
                {botDetails.growth.metrics.map(metric => (
                  <div key={metric.label} className="flex items-center text-sm">
                    <div className="text-neutral-400 mr-2">{metric.icon}</div>
                    <span className="text-neutral-300">{metric.label}:</span>
                    <span className="font-bold text-white ml-auto">{metric.value}</span>
                  </div>
                ))}
              </div>
              <Chart data={botDetails.growth.chartData} color={botDetails.growth.color} />
            </div>
          </div>
          
           {/* Future Automated Piloting Section */}
          <div className="mt-8 p-6 bg-neutral-900/50 rounded-lg border border-neutral-700 text-center">
             <h3 className="text-lg font-bold text-yellow-400 mb-2">{t('clientDetailView.automatedPiloting.title')}</h3>
             <p className="text-sm text-neutral-400 mb-4 max-w-2xl mx-auto">{t('clientDetailView.automatedPiloting.description')}</p>
             <label className="inline-flex items-center cursor-not-allowed">
                  <input type="checkbox" disabled className="sr-only peer" />
                  <div className="relative w-14 h-8 bg-neutral-800 rounded-full peer after:content-[''] after:absolute after:top-1 after:left-1 after:bg-neutral-500 after:border-neutral-600 after:border after:rounded-full after:h-6 after:w-6 after:transition-all"></div>
                  <span className="ml-3 text-sm font-medium text-neutral-500">{t('clientDetailView.automatedPiloting.comingSoon')}</span>
             </label>
          </div>

        </main>
      </div>
    </div>
  );
};

export default ClientDetailView;