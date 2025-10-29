import { useState } from 'react';
import { Grid, List, Plus, Edit2, MessageSquare, Trash2 } from 'lucide-react';

interface Project {
  id: string;
  name: string;
  department: string;
  status: 'active' | 'inactive';
  ragConfig: {
    chunking: string;
    embedding: string;
    llm: string;
  };
}

export const MyProjects = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('all');

  const mockProjects: Project[] = [
    {
      id: '1',
      name: 'Customer Support RAG',
      department: 'Support',
      status: 'active',
      ragConfig: {
        chunking: 'Recursive',
        embedding: 'Azure OpenAI',
        llm: 'GPT-4'
      }
    },
    {
      id: '2',
      name: 'Product Documentation RAG',
      department: 'Product',
      status: 'active',
      ragConfig: {
        chunking: 'Semantic',
        embedding: 'OpenAI Ada',
        llm: 'Claude 3'
      }
    },
    {
      id: '3',
      name: 'Technical Specs RAG',
      department: 'Engineering',
      status: 'inactive',
      ragConfig: {
        chunking: 'Graph-based',
        embedding: 'HuggingFace',
        llm: 'Mistral'
      }
    }
  ];

  const filteredProjects = mockProjects.filter(project => {
    const matchesSearch = project.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesDepartment =
      selectedDepartment === 'all' || project.department === selectedDepartment;
    return matchesSearch && matchesDepartment;
  });

  const departments = ['Support', 'Product', 'Engineering', 'Sales', 'Marketing'];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">My Projects</h1>
        <button className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
          <Plus className="h-5 w-5 mr-2" />
          New Project
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4">
        <div className="flex-1 min-w-[200px]">
          <input
            type="text"
            placeholder="Search projects..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-700 dark:border-slate-600"
          />
        </div>

        <select
          value={selectedDepartment}
          onChange={(e) => setSelectedDepartment(e.target.value)}
          className="rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-700 dark:border-slate-600"
        >
          <option value="all">All Departments</option>
          {departments.map(dept => (
            <option key={dept} value={dept}>
              {dept}
            </option>
          ))}
        </select>

        <div className="flex rounded-md shadow-sm">
          <button
            onClick={() => setViewMode('grid')}
            className={`px-3 py-2 rounded-l-md border ${
              viewMode === 'grid'
                ? 'bg-blue-50 border-blue-500 text-blue-600'
                : 'bg-white border-slate-300 text-slate-700'
            }`}
          >
            <Grid className="h-5 w-5" />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`px-3 py-2 rounded-r-md border-t border-r border-b ${
              viewMode === 'list'
                ? 'bg-blue-50 border-blue-500 text-blue-600'
                : 'bg-white border-slate-300 text-slate-700'
            }`}
          >
            <List className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Projects Grid/List */}
      <div
        className={
          viewMode === 'grid'
            ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
            : 'space-y-4'
        }
      >
        {filteredProjects.map(project => (
          viewMode === 'grid' ? (
            // Grid View
            <div
              key={project.id}
              className="bg-white dark:bg-slate-800 rounded-xl shadow-sm p-6"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-medium text-slate-900 dark:text-white">
                    {project.name}
                  </h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    {project.department}
                  </p>
                </div>
                <span
                  className={`px-2 py-1 text-xs font-medium rounded-full ${
                    project.status === 'active'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-slate-100 text-slate-800'
                  }`}
                >
                  {project.status}
                </span>
              </div>

              <div className="space-y-2 mb-4">
                <div className="text-sm">
                  <span className="text-slate-500 dark:text-slate-400">Chunking:</span>{' '}
                  <span className="text-slate-700 dark:text-slate-300">
                    {project.ragConfig.chunking}
                  </span>
                </div>
                <div className="text-sm">
                  <span className="text-slate-500 dark:text-slate-400">Embedding:</span>{' '}
                  <span className="text-slate-700 dark:text-slate-300">
                    {project.ragConfig.embedding}
                  </span>
                </div>
                <div className="text-sm">
                  <span className="text-slate-500 dark:text-slate-400">LLM:</span>{' '}
                  <span className="text-slate-700 dark:text-slate-300">
                    {project.ragConfig.llm}
                  </span>
                </div>
              </div>

              <div className="flex space-x-2">
                <button className="flex-1 inline-flex justify-center items-center px-3 py-2 border border-slate-300 rounded-md text-slate-700 bg-white hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                  <Edit2 className="h-4 w-4 mr-2" />
                  Edit
                </button>
                <button className="flex-1 inline-flex justify-center items-center px-3 py-2 border border-slate-300 rounded-md text-slate-700 bg-white hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Chat
                </button>
              </div>
            </div>
          ) : (
            // List View
            <div
              key={project.id}
              className="bg-white dark:bg-slate-800 rounded-xl shadow-sm p-4 flex items-center justify-between"
            >
              <div className="flex items-center space-x-4">
                <div>
                  <h3 className="text-lg font-medium text-slate-900 dark:text-white">
                    {project.name}
                  </h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    {project.department} • {project.ragConfig.llm}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <span
                  className={`px-2 py-1 text-xs font-medium rounded-full ${
                    project.status === 'active'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-slate-100 text-slate-800'
                  }`}
                >
                  {project.status}
                </span>

                <div className="flex space-x-2">
                  <button className="p-2 text-slate-600 hover:text-blue-600">
                    <Edit2 className="h-5 w-5" />
                  </button>
                  <button className="p-2 text-slate-600 hover:text-blue-600">
                    <MessageSquare className="h-5 w-5" />
                  </button>
                  <button className="p-2 text-slate-600 hover:text-red-600">
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          )
        ))}
      </div>
    </div>
  );
};