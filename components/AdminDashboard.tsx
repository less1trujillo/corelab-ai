
import React, { useMemo, useState } from 'react';
import { ActivityLogItem, Client } from '../types';
import { ICONS } from '../constants';
import { useI18n } from '../i18n';

// MOCK DATA
const mockActivities: Omit<ActivityLogItem, 'icon' | 'action' | 'bot'>[] = [
    { client: { id: 101, name: "Panchito's Restaurant" }, impact: { value: "+5% CTR", type: 'positive' }, timestamp: '5s ago', type: 'success' },
    { client: { id: 102, name: 'TechNex Solutions' }, impact: { value: 'Neutralized', type: 'neutral' }, timestamp: '12s ago', type: 'log' },
    { client: { id: 103, name: 'Bloom & Branch' }, impact: { value: '2k/mo volume', type: 'positive' }, timestamp: '28s ago', type: 'log' },
    { client: { id: 104, name: 'Veloce' }, impact: { value: 'API Failure', type: 'negative' }, timestamp: '45s ago', type: 'alert' },
    { client: { id: 101, name: "Panchito's Restaurant" }, impact: { value: '+1.2% CVR', type: 'positive' }, timestamp: '1m ago', type: 'success' },
];

const mockClients: { [key: number]: Client } = {
    101: { id: 101, name: "Panchito's Restaurant", status: 'Active', statusColor: 'text-green-400', plan: 'Quantum', mrr: 299, churnRisk: 'Low' },
    102: { id: 102, name: 'TechNex Solutions', status: 'Active', statusColor: 'text-green-400', plan: 'Enterprise', mrr: 2500, churnRisk: 'Low' },
    103: { id: 103, name: 'Bloom & Branch', status: 'Warning', statusColor: 'text-yellow-400', plan: 'Momentum', mrr: 99, churnRisk: 'Medium' },
    104: { id: 104, name: 'Veloce', status: 'Error', statusColor: 'text-red-500', plan: 'Quantum', mrr: 299, churnRisk: 'High' },
};

const activityIcons = {
    'Growth AI': ICONS.GROW,
    'Nexus AI': ICONS.NEXUS,
    'Sentinel AI': ICONS.DIAGNOSTICS,
    'System Alert': ICONS.ALERT
};

interface AdminDashboardProps {
    onClose: () => void;
    onClientSelect: (client: Client) => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ onClose, onClientSelect }) => {
    const { t } = useI18n();
    const [filter, setFilter] = useState('all');
    const [focusedClient, setFocusedClient] = useState<Client | null>(null);

    const activityLog: ActivityLogItem[] = useMemo(() => {
        const activityContent = t('adminDashboard.mockActivities');
        return mockActivities.map((item, index) => ({
            ...item,
            bot: activityContent[index].bot,
            action: activityContent[index].action,
            icon: activityIcons[activityContent[index].bot as keyof typeof activityIcons] || ICONS.ALERT,
        }));
    }, [t]);

    const filteredLog = useMemo(() => {
        if (filter === 'all') return activityLog;
        if (filter === 'alerts') return activityLog.filter(item => item.type === 'alert');
        return activityLog.filter(item => item.bot.toLowerCase().includes(filter.toLowerCase()));
    }, [filter, activityLog]);

    const handleActivityClick = (client: { id: number; name: string }) => {
        setFocusedClient(mockClients[client.id] || null);
    };

    return (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-xl z-[100] flex items-center justify-center p-4">
            <div className="bg-neutral-900 border border-neutral-700 rounded-2xl w-full max-w-7xl h-[90vh] flex flex-col p-6 shadow-2xl shadow-lime-500/20">
                <header className="flex justify-between items-center mb-6 flex-shrink-0">
                    <h2 className="text-2xl font-bold text-white">{t('adminDashboard.title')}</h2>
                    <button onClick={onClose} className="text-neutral-500 hover:text-white transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 flex-grow overflow-hidden">
                    {/* Left Column: Vitals */}
                    <div className="lg:col-span-3 flex flex-col gap-6">
                        <div className="bg-neutral-800/50 p-4 rounded-lg">
                            <h3 className="text-md font-semibold text-neutral-300 mb-4">{t('adminDashboard.financialSnapshot')}</h3>
                            <div className="space-y-3">
                                <div className="flex items-center space-x-3"><div className="text-lime-400">{ICONS.MRR}</div><div><div className="text-2xl font-bold text-white">$148,329</div><div className="text-xs text-neutral-400">{t('adminDashboard.mrr')}</div></div></div>
                                <div className="flex items-center space-x-3"><div className="text-green-400">{ICONS.GROW}</div><div><div className="text-2xl font-bold text-white">+$12,480</div><div className="text-xs text-neutral-400">{t('adminDashboard.netGrowth')}</div></div></div>
                                <div className="flex items-center space-x-3"><div className="text-red-400">{ICONS.CHURN}</div><div><div className="text-2xl font-bold text-white">1.8%</div><div className="text-xs text-neutral-400">{t('adminDashboard.churn')}</div></div></div>
                            </div>
                        </div>
                         <div className="bg-neutral-800/50 p-4 rounded-lg">
                            <h3 className="text-md font-semibold text-neutral-300 mb-4">{t('adminDashboard.platformAnalytics')}</h3>
                            <div className="space-y-3">
                               <div className="flex items-center space-x-3"><div className="text-lime-400">{ICONS.CLIENTS}</div><div><div className="text-2xl font-bold text-white">384</div><div className="text-xs text-neutral-400">{t('adminDashboard.activeClients')}</div></div></div>
                               <div className="flex items-center space-x-3"><div className="text-lime-400">{ICONS.CONNECT}</div><div><div className="text-2xl font-bold text-white">+12</div><div className="text-xs text-neutral-400">{t('adminDashboard.newSignups')}</div></div></div>
                            </div>
                        </div>
                        <div className="bg-neutral-800/50 p-4 rounded-lg flex-grow">
                             <h3 className="text-md font-semibold text-neutral-300 mb-4">{t('adminDashboard.systemStatus')}</h3>
                             <ul className="space-y-2">
                                <li className="flex justify-between items-center text-sm"><span className="text-neutral-200">Sentinel AI</span><span className="font-semibold text-green-400">Operational</span></li>
                                <li className="flex justify-between items-center text-sm"><span className="text-neutral-200">Nexus AI</span><span className="font-semibold text-green-400">Operational</span></li>
                                <li className="flex justify-between items-center text-sm"><span className="text-neutral-200">Growth AI</span><span className="font-semibold text-yellow-400">Degraded</span></li>
                                <li className="flex justify-between items-center text-sm"><span className="text-neutral-200">{t('adminDashboard.apiLatency')}</span><span className="font-semibold text-white">120ms</span></li>
                             </ul>
                        </div>
                    </div>

                    {/* Center Column: Live Feed */}
                    <div className="lg:col-span-5 bg-neutral-800/50 p-4 rounded-lg flex flex-col overflow-hidden">
                        <h3 className="text-md font-semibold text-neutral-300 mb-4 flex-shrink-0">{t('adminDashboard.liveOps')}</h3>
                         <div className="flex space-x-2 mb-4 flex-shrink-0">
                            <button onClick={() => setFilter('all')} className={`px-3 py-1 text-xs rounded-full ${filter === 'all' ? 'bg-lime-600 text-white' : 'bg-neutral-700 text-neutral-300'}`}>All</button>
                            <button onClick={() => setFilter('alerts')} className={`px-3 py-1 text-xs rounded-full ${filter === 'alerts' ? 'bg-red-600 text-white' : 'bg-neutral-700 text-neutral-300'}`}>Alerts</button>
                            <button onClick={() => setFilter('growth')} className={`px-3 py-1 text-xs rounded-full ${filter === 'growth' ? 'bg-green-600 text-white' : 'bg-neutral-700 text-neutral-300'}`}>Growth</button>
                         </div>
                        <div className="overflow-y-auto pr-2">
                            <ul className="space-y-2">
                                {filteredLog.map((item, index) => (
                                    <li 
                                        key={index} 
                                        className={`flex items-start space-x-3 text-sm p-2 -ml-2 rounded-md transition-colors hover:bg-neutral-700/50 cursor-pointer border-l-2 ${item.type === 'alert' ? 'border-red-500' : 'border-transparent'}`}
                                        onClick={() => handleActivityClick(item.client)}
                                    >
                                        <div className="text-neutral-400 mt-0.5">{item.icon}</div>
                                        <div>
                                            <p className="text-neutral-300">
                                                <span className="font-bold text-white">{item.client.name}: </span>
                                                {item.action}
                                            </p>
                                            <p className={`text-xs font-semibold ${item.impact.type === 'positive' ? 'text-green-400' : item.impact.type === 'negative' ? 'text-red-400' : 'text-neutral-400'}`}>{item.impact.value}</p>
                                        </div>
                                        <div className="text-neutral-500 text-xs flex-shrink-0 ml-auto">{item.timestamp}</div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Right Column: Focus Panel */}
                    <div className="lg:col-span-4 bg-neutral-800/50 p-4 rounded-lg flex flex-col">
                        <h3 className="text-md font-semibold text-neutral-300 mb-4">{t('adminDashboard.focusPanel')}</h3>
                        {focusedClient ? (
                            <div className="flex flex-col h-full">
                                <h4 className="text-lg font-bold text-white">{focusedClient.name}</h4>
                                <div className="flex items-center space-x-2 text-sm">
                                    <span className={focusedClient.statusColor}>{focusedClient.status}</span>
                                    <span className="text-neutral-500">&bull;</span>
                                    <span className="text-neutral-300">{focusedClient.plan} Plan</span>
                                </div>
                                <div className="grid grid-cols-2 gap-4 my-6">
                                    <div><div className="text-xl font-bold text-white">${focusedClient.mrr.toLocaleString()}</div><div className="text-xs text-neutral-400">MRR</div></div>
                                    <div><div className={`text-xl font-bold ${focusedClient.churnRisk === 'High' ? 'text-red-400' : 'text-white'}`}>{focusedClient.churnRisk}</div><div className="text-xs text-neutral-400">{t('adminDashboard.clientFocus.risk')}</div></div>
                                </div>
                                <div className="flex-grow">
                                    {/* Placeholder for recent activities or mini-chart */}
                                </div>
                                <button onClick={() => onClientSelect(focusedClient)} className="w-full mt-auto bg-lime-600 hover:bg-lime-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2">
                                    {ICONS.HEPHAESTUS}
                                    {t('adminDashboard.clientFocus.launchHefestus')}
                                </button>
                            </div>
                        ) : (
                            <div className="flex items-center justify-center h-full text-center text-neutral-500">
                                <p>Select a client from the live feed to see details.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;