import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  PieChart, Pie, Cell, LineChart, Line
} from 'recharts';

const COLORS = ['#2563EB', '#10B981', '#F59E0B', '#EF4444'];

const tokenCostData = [
  { department: 'HR', cost: 14000 },
  { department: 'Engineering', cost: 23000 },
  { department: 'Operations', cost: 11000 },
  { department: 'Support', cost: 18000 }
];

const usageData = [
  { department: 'Engineering', activeUsers: 120 },
  { department: 'Support', activeUsers: 95 },
  { department: 'HR', activeUsers: 45 },
  { department: 'Operations', activeUsers: 70 }
];

const governancePie = [
  { name: 'Strict Policy', value: 45 },
  { name: 'Audit Only', value: 30 },
  { name: 'Lenient', value: 25 }
];

const alertsTrend = [
  { day: 'Mon', alerts: 12 },
  { day: 'Tue', alerts: 9 },
  { day: 'Wed', alerts: 15 },
  { day: 'Thu', alerts: 10 },
  { day: 'Fri', alerts: 7 },
];

export const Dashboard = () => {
  return (
    <div className="space-y-10">
      
      {/* KPI CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { title: 'Successful Answer Rate', value: '92%', color: 'text-green-600' },
          { title: 'Avg Time Saved / Query', value: '18s', color: 'text-blue-600' },
          { title: 'Estimated Cost Savings (7d)', value: '$32K', color: 'text-teal-600' },
          { title: 'Active Users (7d)', value: '265', color: 'text-purple-600' }
        ].map((item, idx) => (
          <div key={idx} className="p-6 bg-white dark:bg-slate-800 rounded-xl shadow-sm">
            <h3 className="text-sm font-medium text-slate-600 dark:text-slate-300">
              {item.title}
            </h3>
            <p className={`text-3xl font-bold mt-2 ${item.color}`}>
              {item.value}
            </p>
          </div>
        ))}
      </div>

      {/* CHART ROW */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Cost by Department */}
        <div className="p-6 bg-white dark:bg-slate-800 rounded-xl shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Cost by Department (USD)</h3>
          <BarChart width={450} height={300} data={tokenCostData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="department" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="cost" fill="#2563EB" />
          </BarChart>
        </div>

        {/* Adoption by Department */}
        <div className="p-6 bg-white dark:bg-slate-800 rounded-xl shadow-sm">
          <h3 className="text-lg font-semibold mb-4">AI Adoption by Users</h3>
          <LineChart width={450} height={300} data={usageData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="department" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="activeUsers" stroke="#10B981" strokeWidth={3} />
          </LineChart>
        </div>
      </div>

      {/* COMPLIANCE + RISK */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Governance Policy Distribution */}
        <div className="p-6 bg-white dark:bg-slate-800 rounded-xl shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Compliance Policy Distribution</h3>
          <PieChart width={400} height={250}>
            <Pie
              data={governancePie}
              cx={200}
              cy={120}
              dataKey="value"
              outerRadius={80}
              label
            >
              {governancePie.map((_, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </div>

        {/* Governance Alerts Trend */}
        <div className="p-6 bg-white dark:bg-slate-800 rounded-xl shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Governance Alerts (7d)</h3>
          <LineChart width={450} height={250} data={alertsTrend}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="alerts" stroke="#EF4444" strokeWidth={3} />
          </LineChart>
        </div>
      </div>

      {/* LEADERBOARD */}
      <div className="p-6 bg-white dark:bg-slate-800 rounded-xl shadow-sm">
        <h3 className="text-lg font-semibold mb-4">Business Impact Leaderboard</h3>
        <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-700">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase">Department</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase">Hours Saved</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase">Efficiency Uplift</th>
            </tr>
          </thead>
          <tbody>
            <tr className="text-sm">
              <td className="px-6 py-4">Engineering</td>
              <td className="px-6 py-4">1,240h</td>
              <td className="px-6 py-4 text-green-600 font-semibold">+32%</td>
            </tr>
            <tr className="text-sm">
              <td className="px-6 py-4">Support</td>
              <td className="px-6 py-4">980h</td>
              <td className="px-6 py-4 text-green-600 font-semibold">+27%</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
