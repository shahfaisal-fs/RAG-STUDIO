import { SectionWrapper } from './SectionWrapper';

interface EmbeddingConfig {
  provider: 'azure-openai' | 'openai-ada' | 'huggingface' | 'custom';
  endpoint: string;
  dimension: number;
}

interface EmbeddingSectionProps {
  config: EmbeddingConfig;
  isExpanded: boolean;
  onToggle: () => void;
  onChange: (updates: Partial<EmbeddingConfig>) => void;
}

export const EmbeddingSection = ({
  config,
  isExpanded,
  onToggle,
  onChange
}: EmbeddingSectionProps) => {
  const isComplete = Boolean(config.provider && config.endpoint);
  const summary = `${config.provider} (${config.dimension}d)`;

  return (
    <SectionWrapper
      title="Embedding Configuration"
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
            onChange={(e) => onChange({ provider: e.target.value as EmbeddingConfig['provider'] })}
            className="w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-700 dark:border-slate-600"
          >
            <option value="azure-openai">Azure OpenAI</option>
            <option value="openai-ada">OpenAI Ada</option>
            <option value="huggingface">Hugging Face</option>
            <option value="custom">Custom</option>
          </select>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Service used to generate vector embeddings
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
            Endpoint
            <span className="text-red-500 ml-1">*</span>
          </label>
          <input
            type="text"
            value={config.endpoint}
            onChange={(e) => onChange({ endpoint: e.target.value })}
            className="w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-700 dark:border-slate-600"
            placeholder={`Enter your ${config.provider} endpoint`}
          />
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            API endpoint for the embedding service
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
            Dimension
          </label>
          <input
            type="number"
            value={config.dimension}
            onChange={(e) => onChange({ dimension: parseInt(e.target.value) })}
            className="w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-700 dark:border-slate-600"
            min={1}
          />
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Dimension of the embedding vectors
          </p>
        </div>
      </div>
    </SectionWrapper>
  );
};