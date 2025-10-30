import { SectionWrapper } from './SectionWrapper';
import { Info, ChevronDown } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import type { LLMModel } from '../types';
import { MODEL_INFO } from '../types';

interface LLMConfig {
  model: LLMModel;
  temperature: number;
  maxTokens: number;
}

interface LLMSectionProps {
  config: LLMConfig;
  isExpanded: boolean;
  onToggle: () => void;
  onChange: (updates: Partial<LLMConfig>) => void;
}

export const LLMSection = ({
  config,
  isExpanded,
  onToggle,
  onChange
}: LLMSectionProps) => {
  const isComplete = Boolean(config.model);
  const summary = `${config.model} (temp: ${config.temperature})`;

  return (
    <SectionWrapper
      title="LLM Configuration"
      isExpanded={isExpanded}
      onToggle={onToggle}
      isComplete={isComplete}
      summary={summary}
    >
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
            Model
            <span className="text-red-500 ml-1">*</span>
          </label>
          <div className="mb-2 flex gap-2">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">High Cost</span>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800">Average Cost</span>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">Low Cost</span>
          </div>

          {/* Custom dropdown so we can style group headings */}
          <ModelDropdown
            value={config.model}
            onChange={(m) => onChange({ model: m })}
          />
          {config.model && (
            <div className="mt-2 p-3 bg-slate-50 dark:bg-slate-800/50 rounded-md">
              <div className="flex items-start">
                <Info className="h-5 w-5 text-blue-500 mt-0.5 mr-2 flex-shrink-0" />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-slate-900 dark:text-white">
                        {MODEL_INFO[config.model].name}
                      </p>
                      <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
                        {MODEL_INFO[config.model].description}
                      </p>
                    </div>
                    {/* Tier badge */}
                    <div>
                      {MODEL_INFO[config.model].tier === 'high' && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-red-100 text-red-800">High</span>
                      )}
                      {MODEL_INFO[config.model].tier === 'average' && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-100 text-amber-800">Average</span>
                      )}
                      {MODEL_INFO[config.model].tier === 'low' && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800">Low</span>
                      )}
                    </div>
                  </div>

                  <div className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs text-slate-600 dark:text-slate-300">
                    <div>Context: <span className="font-medium">{MODEL_INFO[config.model].contextWindow.toLocaleString()} tokens</span></div>
                    <div>Cost: <span className="font-medium">${MODEL_INFO[config.model].costPer1kTokens}/1K</span></div>
                    <div>Quality: <span className="font-medium">{MODEL_INFO[config.model].qualityScore}%</span></div>
                  </div>

                  <div className="mt-3">
                    <div className="text-xs text-slate-500 dark:text-slate-400">Optimization level:</div>
                    <div className="mt-1">
                      {/* High optimization -> show green (positive) */}
                      {MODEL_INFO[config.model].optimization === 'high' && (
                        <div className="w-36 h-2 rounded-full bg-emerald-100">
                          <div className="h-2 rounded-full bg-emerald-600" style={{ width: `${MODEL_INFO[config.model].qualityScore}%` }} />
                        </div>
                      )}
                      {/* Average optimization -> amber */}
                      {MODEL_INFO[config.model].optimization === 'average' && (
                        <div className="w-36 h-2 rounded-full bg-amber-100">
                          <div className="h-2 rounded-full bg-amber-600" style={{ width: `${MODEL_INFO[config.model].qualityScore}%` }} />
                        </div>
                      )}
                      {/* Low optimization -> red (needs improvement) */}
                      {MODEL_INFO[config.model].optimization === 'low' && (
                        <div className="w-36 h-2 rounded-full bg-red-100">
                          <div className="h-2 rounded-full bg-red-600" style={{ width: `${MODEL_INFO[config.model].qualityScore}%` }} />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
            Temperature
          </label>
          <input
            type="number"
            value={config.temperature}
            onChange={(e) => onChange({ temperature: parseFloat(e.target.value) })}
            step="0.1"
            min="0"
            max="2"
            className="w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-700 dark:border-slate-600"
          />
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Controls randomness in the output (0-2)
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
            Max Tokens
          </label>
          <input
            type="number"
            value={config.maxTokens}
            onChange={(e) => onChange({ maxTokens: parseInt(e.target.value) })}
            min={1}
            className="w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-700 dark:border-slate-600"
          />
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Maximum length of generated responses
          </p>
        </div>
      </div>
    </SectionWrapper>
  );
};

// Small custom dropdown component for models with styled group headings
function ModelDropdown({ value, onChange }: { value: LLMModel; onChange: (m: LLMModel) => void }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handle(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    window.addEventListener('click', handle);
    return () => window.removeEventListener('click', handle);
  }, []);

  const high = ['gpt-4-turbo', 'gpt-4', 'claude-3-opus'] as LLMModel[];
  const avg = ['claude-3-sonnet', 'palm-2', 'gemini-pro'] as LLMModel[];
  const low = ['mistral-medium', 'mistral-small', 'llama-2'] as LLMModel[];

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen(s => !s)}
        className="w-full text-left rounded-md border-slate-300 shadow-sm px-3 py-2 flex items-center justify-between bg-white dark:bg-slate-800"
      >
        <div className="flex items-center gap-3">
          <div className="text-sm font-medium">{MODEL_INFO[value].name}</div>
          <div className="text-xs text-slate-500">{MODEL_INFO[value].description}</div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400">{MODEL_INFO[value].tier.toUpperCase()}</span>
          <ChevronDown className="h-4 w-4 text-slate-400" />
        </div>
      </button>

      {open && (
        <div className="absolute z-10 mt-1 w-full rounded-md bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-lg">
          <div className="p-2">
            <div className="py-1">
              <div className="flex items-center gap-2 px-2 py-1">
                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800">High Cost</span>
                <span className="text-sm font-semibold">Highly Optimized</span>
              </div>
              {high.map(m => (
                <button key={m} onClick={() => { onChange(m); setOpen(false); }} className="w-full text-left px-3 py-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded">{MODEL_INFO[m].name}</button>
              ))}
            </div>

            <div className="py-1 border-t border-slate-100 dark:border-slate-700 mt-2">
              <div className="flex items-center gap-2 px-2 py-1">
                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-amber-100 text-amber-800">Average Cost</span>
                <span className="text-sm font-semibold">Balanced</span>
              </div>
              {avg.map(m => (
                <button key={m} onClick={() => { onChange(m); setOpen(false); }} className="w-full text-left px-3 py-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded">{MODEL_INFO[m].name}</button>
              ))}
            </div>

            <div className="py-1 border-t border-slate-100 dark:border-slate-700 mt-2">
              <div className="flex items-center gap-2 px-2 py-1">
                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-emerald-100 text-emerald-800">Low Cost</span>
                <span className="text-sm font-semibold">Economical</span>
              </div>
              {low.map(m => (
                <button key={m} onClick={() => { onChange(m); setOpen(false); }} className="w-full text-left px-3 py-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded">{MODEL_INFO[m].name}</button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}