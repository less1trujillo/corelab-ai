import React from 'react';
import { useI18n } from '../i18n';
import { SentinelReportData } from '../types';
import { ICONS } from '../constants';

interface SentinelReportProps {
  report: SentinelReportData;
  onUpgrade: () => void;
}

const SeverityBadge: React.FC<{ severity: 'High' | 'Medium' | 'Low' }> = ({ severity }) => {
    const { t } = useI18n();
    const severityClasses = {
        High: 'bg-red-500/20 text-red-400 border-red-500/30',
        Medium: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
        Low: 'bg-green-500/20 text-green-400 border-green-500/30',
    };
    const text = {
        High: t('userDashboard.report.severity.high'),
        Medium: t('userDashboard.report.severity.medium'),
        Low: t('userDashboard.report.severity.low'),
    };
    return (
        <span className={`px-2 py-1 text-xs font-semibold rounded-full border ${severityClasses[severity]}`}>
            {text[severity]}
        </span>
    );
};


const SentinelReport: React.FC<SentinelReportProps> = ({ report, onUpgrade }) => {
  const { t } = useI18n();
  
  return (
    <div>
      <h2 className="text-2xl font-bold text-white mb-2">{t('userDashboard.report.title')} <span className="text-lime-400">{report.businessName}</span></h2>
      
      <section className="my-8 p-6 bg-neutral-800/50 rounded-lg">
        <h3 className="text-lg font-semibold text-white mb-3">{t('userDashboard.report.summary')}</h3>
        <p className="text-neutral-300">{report.executiveSummary}</p>
      </section>

       <section className="my-8">
        <h3 className="text-lg font-semibold text-white mb-4">{t('userDashboard.report.metrics')}</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
            {report.keyMetrics.map(metric => (
                <div key={metric.label} className="bg-neutral-800/50 p-4 rounded-lg">
                    <div className="text-2xl font-bold text-lime-400">{metric.value}</div>
                    <div className="text-sm text-neutral-400 mt-1">{metric.label}</div>
                </div>
            ))}
        </div>
      </section>

      <section className="my-8">
        <h3 className="text-lg font-semibold text-white mb-4">{t('userDashboard.report.findings')}</h3>
        <div className="space-y-6">
            {report.findings.map(finding => (
                <div key={finding.title} className="bg-neutral-800/50 rounded-lg overflow-hidden border border-neutral-700">
                    <div className="p-4 flex items-start justify-between">
                        <div>
                            <h4 className="font-bold text-white text-lg">{finding.title}</h4>
                            <p className="text-sm text-neutral-400 max-w-2xl">{finding.description}</p>
                        </div>
                        <div className="flex-shrink-0 ml-4 mt-1">
                            <SeverityBadge severity={finding.severity} />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 border-t border-neutral-700">
                        <div className="p-4 bg-red-900/10">
                            <h5 className="flex items-center text-sm font-semibold text-red-400 mb-2">
                                {ICONS.EXPENSE}
                                <span className="ml-2">Business Impact</span>
                            </h5>
                            <p className="text-sm text-neutral-300">{finding.businessImpact}</p>
                        </div>
                        <div className="p-4 bg-green-900/10 border-t md:border-t-0 md:border-l border-neutral-700">
                             <h5 className="flex items-center text-sm font-semibold text-green-400 mb-2">
                                {ICONS.ROCKET}
                                <span className="ml-2">AI Solution</span>
                            </h5>
                            <p className="text-sm text-neutral-300">{finding.aiSolution}</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
      </section>

      <section className="mt-12 text-center p-6 bg-green-900/20 border border-lime-500/30 rounded-lg">
          <h3 className="text-xl font-bold text-white mb-2">{t('userDashboard.report.nextStep')}</h3>
          <p className="text-neutral-300 mb-4">The findings above are just the beginning. The Momentum plan activates Nexus AI to start solving these issues automatically.</p>
          <button onClick={onUpgrade} className="bg-lime-600 hover:bg-lime-700 text-white font-bold py-3 px-6 rounded-lg transition-colors">
              {t('userDashboard.report.upgradeButton')}
          </button>
      </section>

    </div>
  );
};

export default SentinelReport;