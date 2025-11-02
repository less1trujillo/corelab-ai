import React, { useState } from 'react';
import { useI18n } from '../i18n';
import { Review } from '../types';
import { ICONS } from '../constants';

const mockReviewsData: Omit<Review, 'sourceIcon' | 'aiResponse'>[] = [
    {
        id: 1,
        author: 'Jane D.',
        rating: 5,
        content: "Absolutely amazing service! The team went above and beyond to help me with my issue. Highly recommend!",
        source: 'Google'
    },
    {
        id: 2,
        author: 'Mike P.',
        rating: 2,
        content: "The product didn't meet my expectations. It was difficult to set up and the instructions were unclear. I had to return it.",
        source: 'Google'
    },
    {
        id: 3,
        author: 'Samantha K.',
        rating: 4,
        content: "Good experience overall. The staff was friendly and the atmosphere was nice. The food was good, but not great. I would probably go back.",
        source: 'Google Maps'
    }
];

const Rating: React.FC<{ rating: number }> = ({ rating }) => {
    return (
        <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
                <svg key={i} xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${i < rating ? 'text-yellow-400' : 'text-neutral-600'}`} viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
            ))}
        </div>
    );
};


const ReputationManager: React.FC = () => {
    const { t } = useI18n();
    const [reviews, setReviews] = useState<Review[]>(() => {
        return mockReviewsData.map(r => ({
            ...r,
            sourceIcon: r.source === 'Google Maps' ? ICONS.GOOGLE_MAPS : ICONS.GOOGLE,
            aiResponse: r.rating > 3 
                ? `Thank you so much for your kind words, ${r.author}! We're thrilled to hear you had a great experience. We look forward to seeing you again soon!`
                : `We're very sorry to hear that your experience didn't meet your expectations, ${r.author}. We value your feedback and would appreciate the opportunity to learn more and make things right. Please contact us at support@example.com.`
        }));
    });

    const handleDismiss = (id: number) => {
        setReviews(prev => prev.filter(r => r.id !== id));
    };

    return (
        <section>
            <h2 className="text-2xl font-bold text-white mb-2">{t('reputationManager.title')}</h2>
            <p className="text-neutral-400 mb-8">{t('reputationManager.description')}</p>

            <div className="bg-neutral-900 border border-neutral-800 rounded-xl">
                <div className="p-4 border-b border-neutral-800">
                    <h3 className="font-semibold text-white">{t('reputationManager.awaitingApproval')} ({reviews.length})</h3>
                </div>
                <div className="divide-y divide-neutral-800">
                    {reviews.length > 0 ? reviews.map(review => (
                        <div key={review.id} className="p-6 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                            <div className="md:col-span-4">
                                <div className="flex items-center mb-2">
                                    <div className="flex-shrink-0 mr-3">{review.sourceIcon}</div>
                                    <div>
                                        <p className="font-semibold text-white">{review.author}</p>
                                        <p className="text-sm text-neutral-400">{review.source}</p>
                                    </div>
                                </div>
                                <Rating rating={review.rating} />
                                <p className="text-sm text-neutral-300 italic mt-4">"{review.content}"</p>
                            </div>
                            <div className="md:col-span-5">
                                 <h4 className="text-sm font-bold text-neutral-400 mb-2">{t('reputationManager.aiResponse')}</h4>
                                 <div className="bg-neutral-800/60 p-4 rounded-lg text-sm text-neutral-300">
                                     {review.aiResponse}
                                 </div>
                            </div>
                            <div className="md:col-span-3 flex flex-col md:items-end justify-center space-y-2">
                                <button className="w-full md:w-auto bg-lime-600 hover:bg-lime-700 text-white font-semibold py-2 px-4 rounded-lg text-sm transition-colors">{t('reputationManager.approve')}</button>
                                <button className="w-full md:w-auto bg-neutral-700 hover:bg-neutral-600 text-white font-semibold py-2 px-4 rounded-lg text-sm transition-colors">{t('reputationManager.edit')}</button>
                                <button onClick={() => handleDismiss(review.id)} className="w-full md:w-auto bg-transparent hover:bg-neutral-700 text-neutral-400 font-semibold py-2 px-4 rounded-lg text-sm transition-colors">{t('reputationManager.dismiss')}</button>
                            </div>
                        </div>
                    )) : (
                        <div className="p-8 text-center text-neutral-500">
                            <p>No new reviews awaiting approval.</p>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default ReputationManager;