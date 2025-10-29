import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, PieChart, Pie, Cell } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const mockBarData = [
  { project: 'Project A', tokens: 4000 },
  { project: 'Project B', tokens: 3000 },
  { project: 'Project C', tokens: 2000 },
  { project: 'Project D', tokens: 2780 },
];

const mockPieData = [
  { name: 'Basic RAG', value: 400 },
  { name: 'Multi-Vector', value: 300 },
  { name: 'Hybrid Search', value: 300 },
  { name: 'Agent RAG', value: 200 },
];

export const Dashboard = () => {
  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-6 bg-white rounded-xl shadow-sm dark:bg-slate-800">
          <h3 className="text-lg font-medium text-slate-900 dark:text-white">Total Projects</h3>
          <p className="text-3xl font-bold mt-2 text-blue-600">24</p>
        </div>
        <div className="p-6 bg-white rounded-xl shadow-sm dark:bg-slate-800">
          <h3 className="text-lg font-medium text-slate-900 dark:text-white">Active RAGs</h3>
          <p className="text-3xl font-bold mt-2 text-green-600">12</p>
        </div>
        <div className="p-6 bg-white rounded-xl shadow-sm dark:bg-slate-800">
          <h3 className="text-lg font-medium text-slate-900 dark:text-white">Token Usage (7d)</h3>
          <p className="text-3xl font-bold mt-2 text-purple-600">1.2M</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="p-6 bg-white rounded-xl shadow-sm dark:bg-slate-800">
          <h3 className="text-lg font-medium mb-4 text-slate-900 dark:text-white">Token Usage by Project</h3>
          <BarChart width={500} height={300} data={mockBarData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="project" />
            <YAxis />
            <Tooltip />
            {/* Legend removed to avoid type mismatch with current recharts types */}
            <Bar dataKey="tokens" fill="#8884d8" />
          </BarChart>
        </div>
        
        <div className="p-6 bg-white rounded-xl shadow-sm dark:bg-slate-800">
          <h3 className="text-lg font-medium mb-4 text-slate-900 dark:text-white">RAG Strategy Distribution</h3>
          <PieChart width={400} height={300}>
            <Pie
              data={mockPieData}
              cx={200}
              cy={150}
              labelLine={false}
              label={(entry: any) => `${entry.name} ${Math.round((entry.percent || 0) * 100)}%`}
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
            >
              {mockPieData.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </div>
      </div>

      {/* Top Projects Table */}
      <div className="p-6 bg-white rounded-xl shadow-sm dark:bg-slate-800">
        <h3 className="text-lg font-medium mb-4 text-slate-900 dark:text-white">Top Projects</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-700">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Project</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Department</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Usage</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900 dark:text-white">Customer Support RAG</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">Support</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">450K tokens</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    Active
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};