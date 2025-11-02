
import React, { useMemo, useEffect, useRef, useState } from 'react';
import { Step } from '../types';
import { ICONS } from '../constants';
import { useI18n } from '../i18n';

const stepIcons = [ICONS.CONNECT, ICONS.ANALYZE, ICONS.GROW];
const stepIds = ['01', '02', '03'];

const HowItWorks: React.FC = () => {
  const { t } = useI18n();
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

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

  const steps: Step[] = useMemo(() => {
    const stepContent = t('howItWorks.steps');
    return stepContent.map((step: { name: string; description: string }, index: number) => ({
      ...step,
      id: stepIds[index],
      icon: stepIcons[index],
    }));
  }, [t]);

  return (
    <section ref={sectionRef} id="how-it-works" className="py-20 lg:py-28 bg-neutral-900/60 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-neutral-700/[0.1]"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="text-center max-w-3xl mx-auto mb-16">
                <h2 className="text-3xl lg:text-4xl font-bold tracking-tight text-white mb-4">
                {t('howItWorks.title')}
                </h2>
                <p className="text-lg text-neutral-400">
                {t('howItWorks.description')}
                </p>
            </div>
            <div className="relative">
                <div 
                  className={`absolute top-14 left-0 h-0.5 bg-gradient-to-r from-lime-500/0 via-lime-500 to-lime-500/0 hidden md:block ${isVisible ? 'line-draw' : 'w-0'}`} 
                  aria-hidden="true"
                ></div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
                    {steps.map((step, index) => (
                        <div 
                          key={step.id} 
                          className={`text-center p-6 bg-black border border-neutral-800 rounded-xl shadow-lg transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                          style={{ transitionDelay: `${index * 150}ms` }}
                        >
                            <div className="flex justify-center items-center mb-6">
                                <div 
                                  className="bg-neutral-900 p-4 rounded-full border border-neutral-700 text-lime-400 icon-pulse"
                                  style={{ animationDelay: `${index * 250 + 500}ms` }}
                                >
                                  {step.icon}
                                </div>
                            </div>
                            <h3 className="text-xl font-semibold text-white mb-2">{step.id}. {step.name}</h3>
                            <p className="text-neutral-400 text-sm">{step.description}</p>
                        </div>
                    ))}
                </div>
            </div>
      </div>
    </section>
  );
};

export default HowItWorks;