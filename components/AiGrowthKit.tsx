
import React, { useMemo, useState } from 'react';
import { useI18n } from '../i18n';
import { GrowthKitTool } from '../types';

const PromptCard: React.FC<{ tool: GrowthKitTool, onSelect: () => void }> = ({ tool, onSelect }) => (
  <div 
    className="bg-neutral-800/50 p-4 rounded-lg border border-neutral-700 cursor-pointer transition-all hover:border-lime-500 hover:bg-neutral-800"
    onClick={onSelect}
  >
    <h3 className="font-bold text-white">{tool.title}</h3>
    <p className="text-sm text-neutral-400 mt-1">{tool.description}</p>
  </div>
);

const AiGrowthKit: React.FC = () => {
    const { t } = useI18n();
    const [selectedPrompt, setSelectedPrompt] = useState<GrowthKitTool | null>(null);

    const tools: GrowthKitTool[] = useMemo(() => t('aiGrowthKit.prompts'), [t]);
    const categories: { [key: string]: string } = useMemo(() => t('aiGrowthKit.categories'), [t]);
    
    const toolsByCategory = useMemo(() => {
        return tools.reduce((acc, tool) => {
            (acc[tool.category] = acc[tool.category] || []).push(tool);
            return acc;
        }, {} as { [key: string]: GrowthKitTool[] });
    }, [tools]);

    return (
        <section>
            <h2 className="text-2xl font-bold text-white mb-2">{t('momentumDashboard.growthKitTitle')}</h2>
            <p className="text-neutral-400 mb-8">{t('momentumDashboard.growthKitDescription')}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {Object.entries(toolsByCategory).map(([category, tools]) => (
                    <div key={category}>
                        <h3 className="text-lg font-semibold text-lime-400 mb-4">{categories[category]}</h3>
                        <div className="space-y-4">
                            {/* Fix: Add Array.isArray check as a type guard because Object.entries can cause 'tools' to be inferred as 'unknown'. */}
                            {Array.isArray(tools) && tools.map(tool => (
                                <PromptCard key={tool.title} tool={tool} onSelect={() => setSelectedPrompt(tool)} />
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {selectedPrompt && (
                <div 
                    className="fixed inset-0 bg-black/80 backdrop-blur-md z-[110] flex items-center justify-center p-4"
                    onClick={() => setSelectedPrompt(null)}
                >
                    <div 
                        className="bg-neutral-900 border border-neutral-700 rounded-2xl w-full max-w-2xl flex flex-col shadow-2xl"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="p-6">
                            <h3 className="text-xl font-bold text-white mb-2">{selectedPrompt.title}</h3>
                            <p className="text-sm text-lime-400 mb-4">{categories[selectedPrompt.category]}</p>
                            <div className="bg-neutral-800 p-4 rounded-lg">
                                <p className="text-neutral-200 whitespace-pre-wrap font-mono text-sm">{selectedPrompt.description}</p>
                            </div>
                        </div>
                        <div className="p-4 bg-neutral-800/50 border-t border-neutral-700 text-right">
                             <button 
                                onClick={() => setSelectedPrompt(null)}
                                className="bg-lime-600 hover:bg-lime-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};

export default AiGrowthKit;
