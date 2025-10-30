import { SectionWrapper } from './SectionWrapper';

interface ProjectConfig {
  name: string;
  department: string;
  description: string;
}

interface ProjectSectionProps {
  config: ProjectConfig;
  isExpanded: boolean;
  onToggle: () => void;
  onChange: (updates: Partial<ProjectConfig>) => void;
}

const departments = ['Engineering', 'Product', 'Support', 'Sales', 'Marketing'];

export const ProjectSection = ({
  config,
  isExpanded,
  onToggle,
  onChange
}: ProjectSectionProps) => {
  const isComplete = Boolean(config.name && config.department);
  const summary = config.name ? `${config.name} (${config.department})` : 'Not configured';

  return (
    <SectionWrapper
      title="Project Details"
      isExpanded={isExpanded}
      onToggle={onToggle}
      isComplete={isComplete}
      summary={summary}
    >
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
            Project Name
            <span className="text-red-500 ml-1">*</span>
          </label>
          <input
            type="text"
            value={config.name}
            onChange={(e) => onChange({ name: e.target.value })}
            className="w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-700 dark:border-slate-600"
            placeholder="Enter your project name"
          />
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            A unique name to identify your RAG implementation
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
            Department
            <span className="text-red-500 ml-1">*</span>
          </label>
          <select
            value={config.department}
            onChange={(e) => onChange({ department: e.target.value })}
            className="w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-700 dark:border-slate-600"
          >
            <option value="">Select Department</option>
            {departments.map(dept => (
              <option key={dept} value={dept}>{dept}</option>
            ))}
          </select>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            The department or team that owns this RAG implementation
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
            Description
          </label>
          <textarea
            value={config.description}
            onChange={(e) => onChange({ description: e.target.value })}
            className="w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-700 dark:border-slate-600"
            rows={3}
            placeholder="Describe the purpose and scope of your RAG implementation"
          />
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            A brief description of what this RAG system will be used for
          </p>
        </div>
      </div>
    </SectionWrapper>
  );
};