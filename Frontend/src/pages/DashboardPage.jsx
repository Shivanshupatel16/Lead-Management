import DashboardLayout from "./DashboardLayout.jsx";
import { useSelector } from "react-redux";
import { BarChart3, TrendingUp, Users, Mail } from "lucide-react";

export default function DashboardPage() {
  const { items } = useSelector((state) => state.leads);
  
  const stats = {
    total: items.length,
    new: items.filter(lead => lead.status === 'new').length,
    inProgress: items.filter(lead => lead.status === 'in-progress').length,
    converted: items.filter(lead => lead.status === 'converted').length,
    lost: items.filter(lead => lead.status === 'lost').length,
  };

  const recentLeads = items.slice(0, 5);

  return (
    <DashboardLayout title="Dashboard Overview" stats={stats}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {recentLeads.length > 0 ? (
              recentLeads.map(lead => (
                <div key={lead._id} className="flex items-start border-b border-gray-100 pb-4 last:border-0">
                  <div className="bg-blue-100 p-2 rounded-lg mr-3">
                    <Mail size={16} className="text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-800">{lead.name}</p>
                    <p className="text-sm text-gray-600">{lead.email}</p>
                    <div className="flex items-center mt-1">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        lead.status === 'new' ? 'bg-blue-100 text-blue-800' :
                        lead.status === 'in-progress' ? 'bg-amber-100 text-amber-800' :
                        lead.status === 'converted' ? 'bg-green-100 text-green-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {lead.status}
                      </span>
                      <span className="text-xs text-gray-500 ml-2">Just now</span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center py-4">No recent activity</p>
            )}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Performance</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
              <div className="flex items-center">
                <div className="bg-blue-100 p-2 rounded-lg mr-3">
                  <TrendingUp size={16} className="text-blue-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-800">Conversion Rate</p>
                  <p className="text-sm text-gray-600">Leads to customers</p>
                </div>
              </div>
              <span className="text-xl font-bold text-blue-600">
                {stats.total > 0 ? Math.round((stats.converted / stats.total) * 100) : 0}%
              </span>
            </div>

            <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
              <div className="flex items-center">
                <div className="bg-green-100 p-2 rounded-lg mr-3">
                  <Users size={16} className="text-green-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-800">Active Leads</p>
                  <p className="text-sm text-gray-600">In pipeline</p>
                </div>
              </div>
              <span className="text-xl font-bold text-green-600">
                {stats.new + stats.inProgress}
              </span>
            </div>

            <div className="flex items-center justify-between p-4 bg-amber-50 rounded-lg">
              <div className="flex items-center">
                <div className="bg-amber-100 p-2 rounded-lg mr-3">
                  <BarChart3 size={16} className="text-amber-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-800">Avg. Response Time</p>
                  <p className="text-sm text-gray-600">To new leads</p>
                </div>
              </div>
              <span className="text-xl font-bold text-amber-600">2.4h</span>
            </div>
          </div>
        </div>
      </div>

      {items.length === 0 && (
        <div className="bg-white rounded-xl shadow-sm p-8 text-center mt-6">
          <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
            <Users size={24} className="text-blue-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">No leads yet</h3>
          <p className="text-gray-600 mb-6">Get started by adding your first lead to the system</p>
          <a 
            href="/leads" 
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Add Your First Lead
          </a>
        </div>
      )}
    </DashboardLayout>
  );
}