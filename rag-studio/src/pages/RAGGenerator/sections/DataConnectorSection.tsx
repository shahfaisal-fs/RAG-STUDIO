import { useState } from 'react';
import { SectionWrapper } from './SectionWrapper';
import { Upload, Info } from 'lucide-react';
import type { DataType, ContentType } from '../types';

interface DataConnectorConfig {
  type: 'confluence' | 'jira' | 'sharepoint' | 'azure-devops' | 'file-upload';
  dataType: DataType;
  contentTypes: ContentType[];
  connectionString: string;
  validated: boolean;
  files?: File[];
}

interface DataConnectorSectionProps {
  config: DataConnectorConfig;
  isExpanded: boolean;
  onToggle: () => void;
  onChange: (updates: Partial<DataConnectorConfig>) => void;
  onValidate: () => Promise<void>;
}

export const DataConnectorSection = ({
  config,
  isExpanded,
  onToggle,
  onChange,
  onValidate
}: DataConnectorSectionProps) => {
  const [dragActive, setDragActive] = useState(false);

  const isComplete = Boolean(config.validated || (config.type === 'file-upload' && config.files && config.files.length > 0));
  const summary = config.validated 
    ? `${config.type} (Validated)` 
    : config.type === 'file-upload' && config.files && config.files.length > 0
    ? `${config.files.length} files uploaded`
    : `${config.type} (Not validated)`;

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const newFiles = Array.from(e.dataTransfer.files);
      onChange({ 
        files: [...(config.files || []), ...newFiles],
        validated: true 
      });
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files);
      onChange({ 
        files: [...(config.files || []), ...newFiles],
        validated: true 
      });
    }
  };

  return (
    <SectionWrapper
      title="Data Connector"
      isExpanded={isExpanded}
      onToggle={onToggle}
      isComplete={isComplete}
      summary={summary}
    >
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
            Connector Type
            <span className="text-red-500 ml-1">*</span>
          </label>
          <select
            value={config.type}
            onChange={(e) => onChange({ 
              type: e.target.value as DataConnectorConfig['type'],
              validated: false,
              files: []
            })}
            className="w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-700 dark:border-slate-600"
          >
            <option value="confluence">Confluence</option>
            <option value="jira">Jira</option>
            <option value="sharepoint">SharePoint</option>
            <option value="azure-devops">Azure DevOps</option>
            <option value="file-upload">File Upload</option>
          </select>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Select the source of your documents
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
            Data Type
            <span className="text-red-500 ml-1">*</span>
          </label>
          <select
            value={config.dataType}
            onChange={(e) => onChange({ dataType: e.target.value as DataType })}
            className="w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-700 dark:border-slate-600"
          >
            <option value="structured">Structured Data</option>
            <option value="unstructured">Unstructured Data</option>
            <option value="mixed">Mixed Data</option>
          </select>
          <div className="mt-1 flex items-center">
            <Info className="h-4 w-4 text-slate-400 mr-2" />
            <p className="text-sm text-slate-500 dark:text-slate-400">
              {config.dataType === 'structured' && "Data with a clear schema like databases or spreadsheets"}
              {config.dataType === 'unstructured' && "Free-form text like documents, emails, or web pages"}
              {config.dataType === 'mixed' && "A combination of structured and unstructured data"}
            </p>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
            Content Types
            <span className="text-red-500 ml-1">*</span>
          </label>
          <div className="space-y-2">
            {(['text', 'code', 'pdf', 'image', 'audio', 'video'] as ContentType[]).map((type) => (
              <label key={type} className="flex items-center">
                <input
                  type="checkbox"
                  checked={config.contentTypes.includes(type)}
                  onChange={(e) => {
                    const newTypes = e.target.checked
                      ? [...config.contentTypes, type]
                      : config.contentTypes.filter(t => t !== type);
                    onChange({ contentTypes: newTypes });
                  }}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-slate-300 rounded"
                />
                <span className="ml-2 text-sm text-slate-700 dark:text-slate-300 capitalize">
                  {type}
                </span>
              </label>
            ))}
          </div>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Select all types of content you want to process
          </p>
        </div>

        {config.type === 'file-upload' ? (
          <div 
            className={`border-2 border-dashed rounded-lg p-6 text-center ${
              dragActive ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' : 'border-slate-300 dark:border-slate-600'
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <div className="flex flex-col items-center">
              <Upload className="h-12 w-12 text-slate-400" />
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                Drag and drop files here, or{' '}
                <label className="text-blue-500 hover:text-blue-600 cursor-pointer">
                  browse
                  <input
                    type="file"
                    multiple
                    className="hidden"
                    onChange={handleFileInput}
                  />
                </label>
              </p>
            </div>
            {config.files && config.files.length > 0 && (
              <div className="mt-4">
                <h4 className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Uploaded Files:
                </h4>
                <ul className="text-sm text-slate-500 space-y-1">
                  {config.files.map((file, index) => (
                    <li key={index} className="flex items-center">
                      <span className="truncate">{file.name}</span>
                      <span className="ml-2 text-xs text-slate-400">
                        ({(file.size / 1024).toFixed(1)} KB)
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ) : (
          <>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                Connection String
                <span className="text-red-500 ml-1">*</span>
              </label>
              <input
                type="text"
                value={config.connectionString}
                onChange={(e) => onChange({ connectionString: e.target.value })}
                className="w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-700 dark:border-slate-600"
                placeholder={`Enter your ${config.type} connection details`}
              />
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                The connection string for your {config.type} instance
              </p>
            </div>

            <button
              onClick={() => onValidate()}
              className="px-4 py-2 bg-slate-100 text-slate-700 rounded-md hover:bg-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2"
            >
              Validate Connection
            </button>
          </>
        )}
      </div>
    </SectionWrapper>
  );
};