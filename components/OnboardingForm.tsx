import React, { useState } from 'react';
import { useI18n } from '../i18n';
import { SentinelReportData } from '../types';
import { GoogleGenAI, Type } from '@google/genai';

interface OnboardingFormProps {
  onAnalysisComplete: (data: SentinelReportData) => void;
  onFormSubmit: () => void;
  onReportOpen: () => void;
}

const runGeminiAnalysis = async (
  businessName: string,
  websiteUrl: string,
  description: string,
  t: (key: string) => any
): Promise<SentinelReportData> => {
  // Initialize the GoogleGenAI client with the API key from environment variables.
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  const promptTemplate: string = t('geminiPrompts.sentinelAnalysis');
  const masterPrompt = promptTemplate
    .replace('{businessName}', businessName)
    .replace('{websiteUrl}', websiteUrl)
    .replace('{description}', description);
  
  const responseSchema = {
    type: Type.OBJECT,
    properties: {
      businessName: { type: Type.STRING },
      executiveSummary: { type: Type.STRING },
      keyMetrics: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            label: { type: Type.STRING },
            value: { type: Type.STRING },
          },
          required: ['label', 'value'],
        },
      },
      findings: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            description: { type: Type.STRING },
            severity: { type: Type.STRING, enum: ['High', 'Medium', 'Low'] },
            businessImpact: { type: Type.STRING },
            aiSolution: { type: Type.STRING },
          },
          required: ['title', 'description', 'severity', 'businessImpact', 'aiSolution'],
        },
      },
    },
    required: ['businessName', 'executiveSummary', 'keyMetrics', 'findings'],
  };

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: masterPrompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: responseSchema,
      },
    });
    
    const jsonString = response.text.trim();
    return JSON.parse(jsonString) as SentinelReportData;

  } catch (error) {
    console.error("Error calling Gemini API:", error);
    // Fallback to mock data on API error
    const fallbackData: any = t('geminiPrompts.sentinelFallback');
    fallbackData.businessName = businessName;
    return fallbackData as SentinelReportData;
  }
};


const OnboardingForm: React.FC<OnboardingFormProps> = ({ onAnalysisComplete, onFormSubmit, onReportOpen }) => {
  const { t } = useI18n();
  const [businessName, setBusinessName] = useState('');
  const [websiteUrl, setWebsiteUrl] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    onFormSubmit();
    
    const reportData = await runGeminiAnalysis(businessName, websiteUrl, description, t);
    onAnalysisComplete(reportData);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-white mb-2">{t('userDashboard.onboarding.title')}</h2>
      <p className="text-neutral-400 mb-6">{t('userDashboard.onboarding.description')}</p>
      
      <div className="mb-6 text-center">
        <button onClick={onReportOpen} className="text-sm text-lime-400 hover:underline">
            {t('userDashboard.onboarding.sampleReportLink')}
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="businessName" className="block text-sm font-medium text-neutral-300 mb-1">{t('userDashboard.onboarding.form.nameLabel')}</label>
          <input
            type="text"
            id="businessName"
            value={businessName}
            onChange={(e) => setBusinessName(e.target.value)}
            className="w-full bg-neutral-800 border border-neutral-600 text-white rounded-lg p-3 focus:ring-lime-500 focus:border-lime-500"
            placeholder={t('userDashboard.onboarding.form.namePlaceholder')}
            required
          />
        </div>
        <div>
          <label htmlFor="websiteUrl" className="block text-sm font-medium text-neutral-300 mb-1">{t('userDashboard.onboarding.form.urlLabel')}</label>
          <input 
            type="url" 
            id="websiteUrl" 
            value={websiteUrl}
            onChange={(e) => setWebsiteUrl(e.target.value)}
            className="w-full bg-neutral-800 border border-neutral-600 text-white rounded-lg p-3 focus:ring-lime-500 focus:border-lime-500" 
            placeholder={t('userDashboard.onboarding.form.urlPlaceholder')} 
            required 
          />
        </div>
        <div>
          <label htmlFor="businessDescription" className="block text-sm font-medium text-neutral-300 mb-1">{t('userDashboard.onboarding.form.descriptionLabel')}</label>
          <textarea
            id="businessDescription"
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full bg-neutral-800 border border-neutral-600 text-white rounded-lg p-3 focus:ring-lime-500 focus:border-lime-500"
            placeholder={t('userDashboard.onboarding.form.descriptionPlaceholder')}
            required
          ></textarea>
        </div>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <button type="submit" className="bg-lime-600 hover:bg-lime-700 text-white font-bold py-3 px-6 rounded-lg transition-colors">
          {t('userDashboard.onboarding.form.button')}
        </button>
      </form>
    </div>
  );
};

export default OnboardingForm;