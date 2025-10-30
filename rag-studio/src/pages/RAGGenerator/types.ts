export type DataType = 'structured' | 'unstructured' | 'mixed';
export type ContentType = 'text' | 'code' | 'pdf' | 'image' | 'audio' | 'video';
export type ConnectorType = 'confluence' | 'jira' | 'sharepoint' | 'azure-devops' | 'file-upload';
export type ChunkingStrategy = 'recursive' | 'paragraph' | 'semantic' | 'graph-based';
export type PiiFilterMode = 'none' | 'regex' | 'llm-based';
export type EmbeddingProvider = 'azure-openai' | 'openai-ada' | 'huggingface' | 'custom';
export type CloudProvider = 'azure' | 'aws' | 'on-prem';
export type VectorDB = 'cognitive-search' | 'opensearch' | 'pgvector' | 'qdrant';
export type RerankingProvider = 'none' | 'cosine' | 'cohere' | 'azure-cognitive';
export type LLMModel = 
  | 'gpt-4-turbo' 
  | 'gpt-4' 
  | 'claude-3-opus'  // High cost, highly optimized
  | 'claude-3-sonnet' 
  | 'palm-2'  // Average cost
  | 'gemini-pro'
  | 'mistral-medium'  // Low cost
  | 'mistral-small'
  | 'llama-2';
export type ModelTier = 'high' | 'average' | 'low';
export type GovernancePolicy = 'none' | 'strict' | 'audit-only';

export interface ModelInfo {
  name: LLMModel;
  tier: ModelTier;
  contextWindow: number;
  costPer1kTokens: number;
  description: string;
  optimization: ModelTier; // level of optimization (high/average/low)
  qualityScore: number; // estimated quality/accuracy score (0-100)
}

export const MODEL_INFO: Record<LLMModel, ModelInfo> = {
  'gpt-4-turbo': {
    name: 'gpt-4-turbo',
    tier: 'high',
    contextWindow: 128000,
    costPer1kTokens: 0.01,
    description: 'Latest GPT-4 model with expanded context window and improved performance'
    , optimization: 'high',
    qualityScore: 95
  },
  'gpt-4': {
    name: 'gpt-4',
    tier: 'high',
    contextWindow: 8192,
    costPer1kTokens: 0.03,
    description: 'Highly capable model for complex tasks requiring deep understanding'
    , optimization: 'high',
    qualityScore: 93
  },
  'claude-3-opus': {
    name: 'claude-3-opus',
    tier: 'high',
    contextWindow: 100000,
    costPer1kTokens: 0.015,
    description: 'Anthropic\'s most powerful model with excellent reasoning capabilities'
    , optimization: 'high',
    qualityScore: 94
  },
  'claude-3-sonnet': {
    name: 'claude-3-sonnet',
    tier: 'average',
    contextWindow: 70000,
    costPer1kTokens: 0.008,
    description: 'Good balance of performance and cost'
    , optimization: 'average',
    qualityScore: 86
  },
  'palm-2': {
    name: 'palm-2',
    tier: 'average',
    contextWindow: 8192,
    costPer1kTokens: 0.005,
    description: 'Google\'s general-purpose language model'
    , optimization: 'average',
    qualityScore: 82
  },
  'gemini-pro': {
    name: 'gemini-pro',
    tier: 'average',
    contextWindow: 32768,
    costPer1kTokens: 0.004,
    description: 'Google\'s latest model with good performance at reasonable cost'
    , optimization: 'average',
    qualityScore: 84
  },
  'mistral-medium': {
    name: 'mistral-medium',
    tier: 'low',
    contextWindow: 32768,
    costPer1kTokens: 0.002,
    description: 'Open source model with good performance at lower cost'
    , optimization: 'low',
    qualityScore: 76
  },
  'mistral-small': {
    name: 'mistral-small',
    tier: 'low',
    contextWindow: 16384,
    costPer1kTokens: 0.001,
    description: 'Lightweight open source model for basic tasks'
    , optimization: 'low',
    qualityScore: 68
  },
  'llama-2': {
    name: 'llama-2',
    tier: 'low',
    contextWindow: 4096,
    costPer1kTokens: 0.0005,
    description: 'Meta\'s open source model, can be run locally'
    , optimization: 'low',
    qualityScore: 60
  }
};

export interface RAGConfig {
  project: {
    name: string;
    department: string;
    description: string;
  };
  dataConnector: {
    type: ConnectorType;
    dataType: DataType;
    contentTypes: ContentType[];
    connectionString: string;
    validated: boolean;
    files?: File[];
  };
  chunking: {
    strategy: ChunkingStrategy;
    maxTokensPerChunk: number;
    overlapPercentage: number;
  };
  piiFiltering: {
    mode: PiiFilterMode;
  };
  embedding: {
    provider: EmbeddingProvider;
    endpoint: string;
    dimension: number;
  };
  vectorStore: {
    cloud: CloudProvider;
    database: VectorDB;
    namespace: string;
  };
  reranking: {
    provider: RerankingProvider;
    weight: number;
  };
  llm: {
    model: LLMModel;
    temperature: number;
    maxTokens: number;
  };
  governance: {
    policy: GovernancePolicy;
    requireApproval: boolean;
  };
}