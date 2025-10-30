import { SectionWrapper } from './SectionWrapper';

interface GovernanceConfig {
  policy: 'none' | 'strict' | 'audit-only';
  requireApproval: boolean;
}

interface GovernanceSectionProps {
  config: GovernanceConfig;
  isExpanded: boolean;
  onToggle: () => void;
  onChange: (updates: Partial<GovernanceConfig>) => void;
}

export const GovernanceSection = ({
  config,
  isExpanded,
  onToggle,
  onChange
}: GovernanceSectionProps) => {
  const isComplete = config.policy !== 'none';
  const summary = config.policy === 'none' ? 'No governance' : `${config.policy} policy`;

  return (
    <SectionWrapper
      title="Governance"
      isExpanded={isExpanded}
      onToggle={onToggle}
      isComplete={isComplete}
      summary={summary}
    >
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
            Policy
            <span className="text-red-500 ml-1">*</span>
          </label>
          <select
            value={config.policy}
            onChange={(e) => onChange({ policy: e.target.value as GovernanceConfig['policy'] })}
            className="w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-700 dark:border-slate-600"
          >
            <option value="none">None</option>
            <option value="strict">Strict</option>
            <option value="audit-only">Audit Only</option>
          </select>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Level of governance control over the RAG system
          </p>
        </div>

        <div className="flex items-center space-x-3 pt-2">
          <input
            type="checkbox"
            id="requireApproval"
            checked={config.requireApproval}
            onChange={(e) => onChange({ requireApproval: e.target.checked })}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-slate-300 rounded"
          />
          <div>
            <label htmlFor="requireApproval" className="text-sm font-medium text-slate-700 dark:text-slate-300">
              Require Approval for Changes
            </label>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Changes to the RAG system will require approval before deployment
            </p>
          </div>
        </div>

        {config.policy !== 'none' && (
          <div className="rounded-md bg-yellow-50 dark:bg-yellow-900/20 p-4">
            <p className="text-sm text-yellow-700 dark:text-yellow-300">
              {config.policy === 'strict' 
                ? 'All operations will be strictly monitored and logged'
                : 'Operations will be logged for audit purposes'
              }
            </p>
          </div>
        )}
      </div>
    </SectionWrapper>
  );
};