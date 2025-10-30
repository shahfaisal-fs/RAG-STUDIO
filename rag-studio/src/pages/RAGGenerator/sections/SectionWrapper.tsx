import { ChevronDown, CheckCircle } from 'lucide-react';

interface SectionWrapperProps {
  title: string;
  isExpanded: boolean;
  onToggle: () => void;
  isComplete: boolean;
  summary: string;
  children: React.ReactNode;
}

export const SectionWrapper = ({
  title,
  isExpanded,
  onToggle,
  isComplete,
  summary,
  children
}: SectionWrapperProps) => {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm p-6">
      <div 
        className="flex items-center justify-between mb-4 cursor-pointer"
        onClick={onToggle}
      >
        <div className="flex flex-col">
          <h2 className="text-lg font-medium text-slate-900 dark:text-white flex items-center">
            {title}
            {isComplete && <CheckCircle className="ml-2 h-5 w-5 text-green-500" />}
          </h2>
          {!isExpanded && (
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              {summary}
            </p>
          )}
        </div>
        <ChevronDown 
          className={`h-5 w-5 text-slate-500 transform transition-transform duration-200 ${
            isExpanded ? 'rotate-180' : ''
          }`} 
        />
      </div>

      {isExpanded && children}
    </div>
  );
};