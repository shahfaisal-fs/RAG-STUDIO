import { SectionWrapper } from './SectionWrapper';

interface ChunkingConfig {
  strategy: 'recursive' | 'paragraph' | 'semantic' | 'graph-based';
  maxTokensPerChunk: number;
  overlapPercentage: number;
}

interface ChunkingSectionProps {
  config: ChunkingConfig;
  isExpanded: boolean;
  onToggle: () => void;
  onChange: (updates: Partial<ChunkingConfig>) => void;
}

export const ChunkingSection = ({
  config,
  isExpanded,
  onToggle,
  onChange
}: ChunkingSectionProps) => {
  const isComplete = Boolean(config.strategy && config.maxTokensPerChunk > 0);
  const summary = `${config.strategy} (${config.maxTokensPerChunk} tokens)`;

  return (
    <SectionWrapper
      title="Chunking Strategy"
      isExpanded={isExpanded}
      onToggle={onToggle}
      isComplete={isComplete}
      summary={summary}
    >
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
            Strategy
            <span className="text-red-500 ml-1">*</span>
          </label>
          <select
            value={config.strategy}
            onChange={(e) => onChange({ strategy: e.target.value as ChunkingConfig['strategy'] })}
            className="w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-700 dark:border-slate-600"
          >
            <option value="recursive">Recursive</option>
            <option value="paragraph">Paragraph</option>
            <option value="semantic">Semantic</option>
            <option value="graph-based">Graph-based</option>
          </select>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Method used to split documents into smaller chunks
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
            Max Tokens per Chunk
            <span className="text-red-500 ml-1">*</span>
          </label>
          <input
            type="number"
            value={config.maxTokensPerChunk}
            onChange={(e) => onChange({ maxTokensPerChunk: parseInt(e.target.value) })}
            min={1}
            className="w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-700 dark:border-slate-600"
          />
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Maximum number of tokens in each chunk
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
            Overlap Percentage
          </label>
          <input
            type="number"
            value={config.overlapPercentage}
            onChange={(e) => onChange({ overlapPercentage: parseInt(e.target.value) })}
            min={0}
            max={100}
            className="w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-700 dark:border-slate-600"
          />
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Percentage of overlap between consecutive chunks
          </p>
        </div>
      </div>
    </SectionWrapper>
  );
};