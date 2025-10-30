import { SectionWrapper } from './SectionWrapper';

interface PiiFilteringConfig {
  mode: 'none' | 'regex' | 'llm-based';
}

interface PiiFilteringSectionProps {
  config: PiiFilteringConfig;
  isExpanded: boolean;
  onToggle: () => void;
  onChange: (updates: Partial<PiiFilteringConfig>) => void;
}

export const PiiFilteringSection = ({
  config,
  isExpanded,
  onToggle,
  onChange
}: PiiFilteringSectionProps) => {
  const isComplete = Boolean(config.mode);
  const summary = config.mode === 'none' ? 'No PII filtering' : `${config.mode} filtering enabled`;

  return (
    <SectionWrapper
      title="PII Filtering"
      isExpanded={isExpanded}
      onToggle={onToggle}
      isComplete={isComplete}
      summary={summary}
    >
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
            Filtering Mode
            <span className="text-red-500 ml-1">*</span>
          </label>
          <select
            value={config.mode}
            onChange={(e) => onChange({ mode: e.target.value as PiiFilteringConfig['mode'] })}
            className="w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-700 dark:border-slate-600"
          >
            <option value="none">None</option>
            <option value="regex">Regex-based</option>
            <option value="llm-based">LLM-based</option>
          </select>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Choose how to handle personally identifiable information in your documents
          </p>
        </div>

        {config.mode !== 'none' && (
          <div className="rounded-md bg-blue-50 dark:bg-blue-900/20 p-4">
            <p className="text-sm text-blue-700 dark:text-blue-300">
              {config.mode === 'regex' 
                ? 'Using pattern matching to identify and redact common PII patterns'
                : 'Using AI to identify and redact sensitive information contextually'
              }
            </p>
          </div>
        )}
      </div>
    </SectionWrapper>
  );
};