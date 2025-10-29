import { useState } from 'react';

type DataConnector = 'confluence' | 'jira' | 'sharepoint' | 'azure-devops' | 'file-upload';
type ChunkingStrategy = 'recursive' | 'paragraph' | 'semantic' | 'graph-based';
type EmbeddingModel = 'azure-openai' | 'openai-ada' | 'huggingface' | 'custom';
type ReRankingProvider = 'cohere' | 'azure-cognitive' | 'none';
type LLMModel = 'gpt-4-turbo' | 'claude-3' | 'mistral' | 'gemini';

interface RAGConfig {
  dataConnector: DataConnector;
  connectionString: string;
  chunkingStrategy: ChunkingStrategy;
  maxTokensPerChunk: number;
  overlapPercentage: number;
  embeddingModel: EmbeddingModel;
  embeddingEndpoint: string;
  reRankingProvider: ReRankingProvider;
  reRankingWeight: number;
  llmModel: LLMModel;
  temperature: number;
  maxTokens: number;
}

export const RAGGenerator = () => {
  const [config, setConfig] = useState<RAGConfig>({
    dataConnector: 'confluence',
    connectionString: '',
    chunkingStrategy: 'recursive',
    maxTokensPerChunk: 512,
    overlapPercentage: 20,
    embeddingModel: 'azure-openai',
    embeddingEndpoint: '',
    reRankingProvider: 'none',
    reRankingWeight: 0.3,
    llmModel: 'gpt-4-turbo',
    temperature: 0.7,
    maxTokens: 1000
  });

  const handleConfigChange = (field: keyof RAGConfig, value: any) => {
    setConfig(prev => ({ ...prev, [field]: value }));
  };

  const validateConnection = async () => {
    // Mock API call
    console.log('Validating connection...');
  };

  const handleSave = async () => {
    // Mock API call
    console.log('Saving configuration...', config);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-slate-900 dark:text-white">RAG Generator</h1>

      {/* Data Connector Section */}
      <div className="p-6 bg-white rounded-xl shadow-sm dark:bg-slate-800">
        <h2 className="text-lg font-medium mb-4 text-slate-900 dark:text-white">Data Connector</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
              Connector Type
            </label>
            <select
              value={config.dataConnector}
              onChange={(e) => handleConfigChange('dataConnector', e.target.value)}
              className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-700 dark:border-slate-600"
            >
              <option value="confluence">Confluence</option>
              <option value="jira">Jira</option>
              <option value="sharepoint">SharePoint</option>
              <option value="azure-devops">Azure DevOps</option>
              <option value="file-upload">File Upload</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
              Connection String
            </label>
            <input
              type="text"
              value={config.connectionString}
              onChange={(e) => handleConfigChange('connectionString', e.target.value)}
              className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-700 dark:border-slate-600"
              placeholder="Enter connection string or URL"
            />
          </div>

          <button
            onClick={validateConnection}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Validate Connection
          </button>
        </div>
      </div>

      {/* Chunking Strategy Section */}
      <div className="p-6 bg-white rounded-xl shadow-sm dark:bg-slate-800">
        <h2 className="text-lg font-medium mb-4 text-slate-900 dark:text-white">Chunking Strategy</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
              Strategy
            </label>
            <select
              value={config.chunkingStrategy}
              onChange={(e) => handleConfigChange('chunkingStrategy', e.target.value)}
              className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-700 dark:border-slate-600"
            >
              <option value="recursive">Recursive (Default)</option>
              <option value="paragraph">Paragraph</option>
              <option value="semantic">Semantic Similarity</option>
              <option value="graph-based">Graph-based (Hierarchical)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
              Max Tokens per Chunk
            </label>
            <input
              type="number"
              value={config.maxTokensPerChunk}
              onChange={(e) => handleConfigChange('maxTokensPerChunk', parseInt(e.target.value))}
              className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-700 dark:border-slate-600"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
              Overlap Percentage
            </label>
            <input
              type="number"
              value={config.overlapPercentage}
              onChange={(e) => handleConfigChange('overlapPercentage', parseInt(e.target.value))}
              className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-700 dark:border-slate-600"
            />
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button
          onClick={handleSave}
          className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Save Configuration
        </button>
      </div>
    </div>
  );
};