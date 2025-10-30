import { SectionWrapper } from './SectionWrapper';

interface RerankingConfig {
  provider: 'none' | 'cosine' | 'cohere' | 'azure-cognitive';
  weight: number;
}

interface RerankingSectionProps {
  config: RerankingConfig;
  isExpanded: boolean;
  onToggle: () => void;
  onChange: (updates: Partial<RerankingConfig>) => void;
}

export const RerankingSection = ({
  config,
  isExpanded,
  onToggle,
  onChange
}: RerankingSectionProps) => {
  const isComplete = config.provider !== 'none';
  const summary = config.provider === 'none' ? 'No reranking' : `${config.provider} (${config.weight})`;

  return (
    <SectionWrapper
      title="Reranking Configuration"
      isExpanded={isExpanded}
      onToggle={onToggle}
      isComplete={isComplete}
      summary={summary}
    >
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
            Provider
            <span className="text-red-500 ml-1">*</span>
          </label>
          <select
            value={config.provider}
            onChange={(e) => onChange({ provider: e.target.value as RerankingConfig['provider'] })}
            className="w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-700 dark:border-slate-600"
          >
            <option value="none">None</option>
            <option value="cosine">Cosine Similarity</option>
            <option value="cohere">Cohere</option>
            <option value="azure-cognitive">Azure Cognitive Search</option>
          </select>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Method used to rerank search results
          </p>
        </div>

        {config.provider !== 'none' && (
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
              Weight
              <span className="text-red-500 ml-1">*</span>
            </label>
            <input
              type="number"
              value={config.weight}
              onChange={(e) => onChange({ weight: parseFloat(e.target.value) })}
              step="0.1"
              min="0"
              max="1"
              className="w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-700 dark:border-slate-600"
            />
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Impact of reranking on final results (0-1)
            </p>
          </div>
        )}
      </div>
    </SectionWrapper>
  );
};