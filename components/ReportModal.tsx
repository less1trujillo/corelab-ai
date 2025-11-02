
import React from 'react';
import { useI18n } from '../i18n';
import { ICONS } from '../constants';

const ReportModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
    const { t } = useI18n();
    const report = t('panchitosReport');

    return (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-lg z-[100] flex items-center justify-center p-4" onClick={onClose}>
            <div 
                className="bg-neutral-900 border border-neutral-700 rounded-2xl w-full max-w-4xl h-[90vh] flex flex-col shadow-2xl shadow-lime-500/20"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex justify-between items-center p-4 border-b border-neutral-800 flex-shrink-0">
                     <div className="flex items-center space-x-2">
                        <svg className="h-6 w-6 text-lime-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c0-3.517 3.134-6.364 7-6.364 3.866 0 7 2.847 7 6.364 0 3.518-3.134 6.364-7 6.364-3.866 0-7-2.846-7-6.364zM12 11c0 3.518-3.134 6.364-7 6.364-3.866 0-7-2.846-7-6.364 0-3.517 3.134-6.364 7-6.364 3.866 0 7 2.847 7 6.364z"/>
                        </svg>
                        <span className="text-lg font-bold text-white">CoreLabGlobal AI</span>
                    </div>
                    <button onClick={onClose} className="text-neutral-500 hover:text-white transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                
                <div className="p-6 md:p-8 overflow-y-auto">
                    <header className="text-center mb-8">
                        <h1 className="text-2xl md:text-3xl font-bold text-white">{report.title}</h1>
                        <p className="text-md md:text-lg text-lime-400 font-semibold">{report.client}</p>
                    </header>

                    <section className="mb-8">
                        <h2 className="text-xl font-bold text-white mb-4 pb-2 border-b-2 border-neutral-700">{report.executiveSummary.title}</h2>
                        <p className="text-neutral-300 leading-relaxed">{report.executiveSummary.content}</p>
                    </section>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                        {/* Phase 1 */}
                        <div className="bg-neutral-800/50 p-6 rounded-lg">
                            <h3 className="text-lg font-semibold text-lime-300 mb-4">{report.phase1.title}</h3>
                            <div className="flex items-center gap-2 text-sm text-neutral-400 mb-4">
                                {ICONS.DIAGNOSTICS} <span>{report.phase1.bot}</span>
                            </div>
                            <ul className="space-y-4">
                                {report.phase1.findings.map((item: any) => (
                                    <li key={item.title}>
                                        <h4 className="font-bold text-white">{item.title}</h4>
                                        <p className="text-sm text-neutral-400">{item.description}</p>
                                    </li>
                                ))}
                            </ul>
                        </div>
                         {/* Phase 2 */}
                        <div className="bg-neutral-800/50 p-6 rounded-lg">
                            <h3 className="text-lg font-semibold text-lime-400 mb-4">{report.phase2.title}</h3>
                             <div className="flex items-center gap-2 text-sm text-neutral-400 mb-4">
                                {ICONS.NEXUS} <span>{report.phase2.bot}</span>
                            </div>
                            <ul className="space-y-4">
                                {report.phase2.actions.map((item: any) => (
                                    <li key={item.title}>
                                        <h4 className="font-bold text-white">{item.title}</h4>
                                        <p className="text-sm text-neutral-400">{item.description}</p>
                                    </li>
                                ))}
                            </ul>
                        </div>
                         {/* Phase 3 */}
                        <div className="bg-neutral-800/50 p-6 rounded-lg">
                            <h3 className="text-lg font-semibold text-lime-500 mb-4">{report.phase3.title}</h3>
                            <div className="flex items-center gap-2 text-sm text-neutral-400 mb-4">
                                {ICONS.ROCKET} <span>{report.phase3.bot}</span>
                            </div>
                            <ul className="space-y-4">
                                {report.phase3.actions.map((item: any) => (
                                    <li key={item.title}>
                                        <h4 className="font-bold text-white">{item.title}</h4>
                                        <p className="text-sm text-neutral-400">{item.description}</p>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    
                    <section>
                        <h2 className="text-xl font-bold text-white mb-4 pb-2 border-b-2 border-neutral-700">{report.projections.title}</h2>
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-center">
                            {report.projections.items.map((item: any) => (
                                <div key={item.label} className="bg-neutral-800/50 p-4 rounded-lg">
                                    <div className="text-2xl font-bold text-green-400">{item.value}</div>
                                    <div className="text-sm text-neutral-300 mt-1">{item.label}</div>
                                    <div className="text-xs text-neutral-500">Powered by {item.bot}</div>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>

                <div className="text-center p-4 border-t border-neutral-800 mt-auto flex-shrink-0">
                    <p className="text-xs text-neutral-500">{report.footer}</p>
                </div>
            </div>
        </div>
    );
};

export default ReportModal;