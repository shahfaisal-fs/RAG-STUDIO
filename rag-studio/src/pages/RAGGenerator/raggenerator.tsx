import { useState } from 'react';
import { ProjectSection } from './sections/ProjectSection';
import { DataConnectorSection } from './sections/DataConnectorSection';
import { ChunkingSection } from './sections/ChunkingSection';
import { PiiFilteringSection } from './sections/PiiFilteringSection';
import { EmbeddingSection } from './sections/EmbeddingSection';
import { VectorStoreSection } from './sections/VectorStoreSection';
import { RerankingSection } from './sections/RerankingSection';
import { LLMSection } from './sections/LLMSection';
import { GovernanceSection } from './sections/GovernanceSection';

import type { RAGConfig } from './types';

// Component
export const RAGGenerator = () => {
  const [expandedSections, setExpandedSections] = useState<{ [key: string]: boolean }>({
    project: true,
    dataConnector: false,
    chunking: false,
    piiFiltering: false,
    embedding: false,
    vectorStore: false,
    reranking: false,
    llm: false,
    governance: false
  });

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const [config, setConfig] = useState<RAGConfig>({
    project: {
      name: '',
      department: '',
      description: ''
    },
    dataConnector: {
      type: 'confluence',
      dataType: 'unstructured',
      contentTypes: ['text'],
      connectionString: '',
      validated: false
    },
    chunking: {
      strategy: 'recursive',
      maxTokensPerChunk: 512,
      overlapPercentage: 20
    },
    piiFiltering: {
      mode: 'none'
    },
    embedding: {
      provider: 'azure-openai',
      endpoint: '',
      dimension: 1536
    },
    vectorStore: {
      cloud: 'azure',
      database: 'cognitive-search',
      namespace: ''
    },
    reranking: {
      provider: 'none',
      weight: 0.3
    },
    llm: {
      model: 'gpt-4-turbo',
      temperature: 0.7,
      maxTokens: 1000
    },
    governance: {
      policy: 'none',
      requireApproval: false
    }
  });

  const validateConnection = async () => {
    // Mock validation
    setConfig(prev => ({
      ...prev,
      dataConnector: {
        ...prev.dataConnector,
        validated: true
      }
    }));
  };

  const handleSave = () => {
    console.log('Saving configuration:', config);
  };

  const updateConfig = <T extends keyof RAGConfig>(
    section: T,
    updates: Partial<RAGConfig[T]>
  ) => {
    setConfig(prev => ({
      ...prev,
      [section]: { ...prev[section], ...updates }
    }));
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-8">
        RAG Generator
      </h1>

      <ProjectSection
        config={config.project}
        isExpanded={expandedSections.project}
        onToggle={() => toggleSection('project')}
        onChange={(updates) => updateConfig('project', updates)}
      />

      <DataConnectorSection
        config={config.dataConnector}
        isExpanded={expandedSections.dataConnector}
        onToggle={() => toggleSection('dataConnector')}
        onChange={(updates) => updateConfig('dataConnector', updates)}
        onValidate={validateConnection}
      />

      <ChunkingSection
        config={config.chunking}
        isExpanded={expandedSections.chunking}
        onToggle={() => toggleSection('chunking')}
        onChange={(updates) => updateConfig('chunking', updates)}
      />

      <PiiFilteringSection
        config={config.piiFiltering}
        isExpanded={expandedSections.piiFiltering}
        onToggle={() => toggleSection('piiFiltering')}
        onChange={(updates) => updateConfig('piiFiltering', updates)}
      />

      <EmbeddingSection
        config={config.embedding}
        isExpanded={expandedSections.embedding}
        onToggle={() => toggleSection('embedding')}
        onChange={(updates) => updateConfig('embedding', updates)}
      />

      <VectorStoreSection
        config={config.vectorStore}
        isExpanded={expandedSections.vectorStore}
        onToggle={() => toggleSection('vectorStore')}
        onChange={(updates) => updateConfig('vectorStore', updates)}
      />

      <RerankingSection
        config={config.reranking}
        isExpanded={expandedSections.reranking}
        onToggle={() => toggleSection('reranking')}
        onChange={(updates) => updateConfig('reranking', updates)}
      />

      <LLMSection
        config={config.llm}
        isExpanded={expandedSections.llm}
        onToggle={() => toggleSection('llm')}
        onChange={(updates) => updateConfig('llm', updates)}
      />

      <GovernanceSection
        config={config.governance}
        isExpanded={expandedSections.governance}
        onToggle={() => toggleSection('governance')}
        onChange={(updates) => updateConfig('governance', updates)}
      />

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