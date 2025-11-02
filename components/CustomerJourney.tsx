
import React, { useMemo, useEffect, useRef, useState } from 'react';
import { useI18n } from '../i18n';
import { JourneyStep } from '../types';
import { ICONS } from '../constants';

const staticJourneyData = [
  { processIcon: ICONS.DIAGNOSTICS, resultIcon: ICONS.REPORT },
  { processIcon: ICONS.NEXUS, resultIcon: ICONS.DASHBOARD },
  { processIcon: ICONS.GROW, resultIcon: ICONS.ROCKET },
];

const JourneyStepCard: React.FC<{ step: JourneyStep, index: number, isVisible: boolean }> = ({ step, index, isVisible }) => {
  return (
    <div className="flex items-center w-full mb-8">
      {/* Desktop Line & Icon */}
      <div className="hidden md:flex flex-col items-center mr-8">
        <div className={`flex-shrink-0 w-16 h-16 rounded-full border-2 ${step.planColor} flex items-center justify-center bg-neutral-900 z-10 transition-transform duration-500 ${isVisible ? 'scale-100' : 'scale-0'}`}>
          {React.cloneElement(step.process.icon as React.ReactElement<any>, { className: `h-8 w-8 text-white`})}
        </div>
      </div>

      {/* Card Content */}
      <div className={`w-full transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-[-20px]'}`} style={{ transitionDelay: `${index * 200}ms` }}>
        <div className={`border ${step.planColor} rounded-2xl overflow-hidden`}>
          <div className={`p-4 bg-gradient-to-r from-neutral-900 to-black`}>
            <span className={`font-bold px-3 py-1 text-xs rounded-full border ${step.planColor} ${step.planName === 'Spark' ? 'text-neutral-300' : 'text-white'}`}>{step.planName}</span>
            <h3 className="text-xl lg:text-2xl font-bold text-white mt-2">{step.title}</h3>
          </div>
          <div className="p-6 bg-neutral-900/50 grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Action */}
            <div className="border-r border-neutral-800 pr-6">
              <h4 className="font-semibold text-neutral-300 mb-2">{step.action.label}</h4>
              <p className="text-sm text-neutral-400">{step.action.description}</p>
            </div>
            {/* Process */}
             <div className="border-r border-neutral-800 pr-6">
              <h4 className="font-semibold text-neutral-300 mb-2">{step.process.title}</h4>
              <p className="text-sm text-neutral-400">{step.process.description}</p>
            </div>
            {/* Result */}
            <div>
              <h4 className="font-semibold text-neutral-300 mb-2">{step.result.title}</h4>
              <div className="bg-neutral-800 p-4 rounded-lg">
                {step.result.metrics.map(metric => (
                  <div key={metric.label} className="flex justify-between items-baseline text-sm mb-1 last:mb-0">
                    <span className="text-neutral-400">{metric.label}</span>
                    <span className="font-bold text-white flex items-center">
                      {metric.value}
                      {metric.change && <span className={`ml-2 text-xs font-semibold ${metric.color}`}>{metric.change}</span>}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const CustomerJourney: React.FC = () => {
    const { t } = useI18n();
    const sectionRef = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);
    
    const journeySteps: JourneyStep[] = useMemo(() => {
        const journeyContent = t('customerJourney.steps');
        return journeyContent.map((step: Omit<JourneyStep, 'process.icon' | 'result.icon'>, index: number) => ({
            ...step,
            planColor: index === 0 ? 'border-neutral-700' : (index === 1 ? 'border-lime-500' : 'border-green-500'),
            process: {
              ...step.process,
              icon: staticJourneyData[index].processIcon,
            },
            result: {
              ...step.result,
              icon: staticJourneyData[index].resultIcon,
            }
        }));
    }, [t]);

    useEffect(() => {
      const observer = new IntersectionObserver(
          ([entry]) => {
              if (entry.isIntersecting) {
                  setIsVisible(true);
                  observer.disconnect();
              }
          },
          { threshold: 0.2 }
      );

      const currentRef = sectionRef.current;
      if (currentRef) {
          observer.observe(currentRef);
      }

      return () => {
          if (currentRef) {
              observer.unobserve(currentRef);
          }
      };
  }, []);

    return (
        <section id="customer-journey" className="py-20 lg:py-28 bg-black relative" ref={sectionRef}>
            <div className="absolute inset-0 bg-grid-neutral-800/[0.1]"></div>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl lg:text-4xl font-bold tracking-tight text-white mb-4">
                        {t('customerJourney.title')}
                    </h2>
                    <p className="text-lg text-neutral-400">
                        {t('customerJourney.description')}
                    </p>
                </div>

                <div className="relative">
                    <div className="absolute left-0 md:left-8 top-0 h-full w-0.5 bg-neutral-800" aria-hidden="true"></div>
                    <div className="ml-0 md:ml-16">
                      {journeySteps.map((step, index) => (
                          <JourneyStepCard key={step.planName} step={step} index={index} isVisible={isVisible} />
                      ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CustomerJourney;