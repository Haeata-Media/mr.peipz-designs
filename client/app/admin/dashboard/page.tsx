export default function AdminDashboard() {
  return (
    <div>
      <h1 className="text-3xl font-serif font-bold mb-8">Dashboard Overview</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[
          { label: 'Total Revenue', value: '$0.00', change: '+0%' },
          { label: 'Active Orders', value: '0', change: '0' },
          { label: 'Products', value: '0', change: '0' },
          { label: 'Commissions', value: '0', change: '0' },
        ].map((stat, index) => (
          <div key={index} className="bg-zinc-900 p-6 rounded-lg border border-zinc-800">
            <h3 className="text-zinc-500 text-sm font-medium uppercase tracking-wider">{stat.label}</h3>
            <p className="text-2xl font-bold mt-2 text-white">{stat.value}</p>
            <span className="text-xs text-zinc-400 mt-1 block">{stat.change} from last month</span>
          </div>
        ))}
      </div>

      <div className="bg-zinc-900 p-6 rounded-lg border border-zinc-800">
        <h2 className="text-xl font-bold mb-4">Recent Activity</h2>
        <div className="text-zinc-500 text-sm text-center py-8">
          No recent activity to display.
        </div>
      </div>
    </div>
  );
}
