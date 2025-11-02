

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Testimonial } from '../types';
import { useI18n } from '../i18n';

const avatars = [
    'https://i.pravatar.cc/150?u=sarah',
    'https://i.pravatar.cc/150?u=david',
    'https://i.pravatar.cc/150?u=maria'
];

const Testimonials: React.FC = () => {
    const { t } = useI18n();
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef<HTMLDivElement>(null);

    const testimonialsData: Testimonial[] = useMemo(() => {
        const testimonialContent = t('testimonials.items');
        return testimonialContent.map((item: Omit<Testimonial, 'avatar'>, index: number) => ({
            ...item,
            avatar: avatars[index]
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
            {
                threshold: 0.1,
            }
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
        <section ref={sectionRef} id="testimonials" className="py-20 lg:py-28 bg-black relative">
             <div className="absolute inset-0 bg-grid-neutral-800/[0.1] [mask-image:linear-gradient(to_bottom,transparent,white_20%,white_80%,transparent)]"></div>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
                 <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl lg:text-4xl font-bold tracking-tight text-white mb-4">
                        {t('testimonials.title')}
                    </h2>
                    <p className="text-lg text-neutral-400">
                       {t('testimonials.description')}
                    </p>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {testimonialsData.map((testimonial, index) => (
                        <div 
                            key={testimonial.name} 
                            className={`bg-neutral-900/50 p-8 rounded-2xl border border-neutral-800 flex flex-col items-start h-full transition-all ease-out duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                            style={{ transitionDelay: `${index * 150}ms` }}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-neutral-600 mb-6" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 8.996-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
                            </svg>
                            <p className="text-xl text-neutral-100 italic leading-relaxed flex-grow mb-6">"{testimonial.quote}"</p>
                            <div className="flex items-center mt-auto pt-6 border-t border-neutral-800 w-full">
                                <img className="h-12 w-12 rounded-full object-cover" src={testimonial.avatar} alt={testimonial.name} />
                                <div className="ml-4">
                                    <p className="font-semibold text-white">{testimonial.name}</p>
                                    <p className="text-sm text-neutral-400">{testimonial.title}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;