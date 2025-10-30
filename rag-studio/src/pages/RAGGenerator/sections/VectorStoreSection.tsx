import { SectionWrapper } from './SectionWrapper';

interface VectorStoreConfig {
  cloud: 'azure' | 'aws' | 'on-prem';
  database: 'cognitive-search' | 'opensearch' | 'pgvector' | 'qdrant';
  namespace: string;
}

interface VectorStoreSectionProps {
  config: VectorStoreConfig;
  isExpanded: boolean;
  onToggle: () => void;
  onChange: (updates: Partial<VectorStoreConfig>) => void;
}

export const VectorStoreSection = ({
  config,
  isExpanded,
  onToggle,
  onChange
}: VectorStoreSectionProps) => {
  const isComplete = Boolean(config.database && config.namespace);
  const summary = `${config.database} on ${config.cloud}`;

  return (
    <SectionWrapper
      title="Vector Store Configuration"
      isExpanded={isExpanded}
      onToggle={onToggle}
      isComplete={isComplete}
      summary={summary}
    >
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
            Cloud Provider
            <span className="text-red-500 ml-1">*</span>
          </label>
          <select
            value={config.cloud}
            onChange={(e) => onChange({ cloud: e.target.value as VectorStoreConfig['cloud'] })}
            className="w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-700 dark:border-slate-600"
          >
            <option value="azure">Azure</option>
            <option value="aws">AWS</option>
            <option value="on-prem">On-Premises</option>
          </select>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Cloud platform hosting your vector database
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
            Vector Database
            <span className="text-red-500 ml-1">*</span>
          </label>
          <select
            value={config.database}
            onChange={(e) => onChange({ database: e.target.value as VectorStoreConfig['database'] })}
            className="w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-700 dark:border-slate-600"
          >
            <option value="cognitive-search">Azure Cognitive Search</option>
            <option value="opensearch">OpenSearch</option>
            <option value="pgvector">pgvector</option>
            <option value="qdrant">Qdrant</option>
          </select>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Database system for storing and querying vectors
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
            Namespace
            <span className="text-red-500 ml-1">*</span>
          </label>
          <input
            type="text"
            value={config.namespace}
            onChange={(e) => onChange({ namespace: e.target.value })}
            className="w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-700 dark:border-slate-600"
            placeholder="Enter namespace for vector storage"
          />
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Logical partition for your vectors within the database
          </p>
        </div>
      </div>
    </SectionWrapper>
  );
};