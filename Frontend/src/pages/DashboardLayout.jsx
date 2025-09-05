import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../features/auth/authSlice.js";
import { Home, Users, Settings, LogOut, BarChart3, User, Mail, Phone, TrendingUp } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export default function DashboardLayout({ children, title, stats }) {
  const dispatch = useDispatch();
  const location = useLocation();

  const links = [
    { name: "Dashboard", path: "/dashboard", icon: <Home size={18} /> },
    { name: "Leads", path: "/leads", icon: <Users size={18} /> },
    { name: "Settings", path: "/settings", icon: <Settings size={18} /> },
  ];

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-gray-50 to-gray-100">
    
      <aside className="w-64 bg-gradient-to-b from-blue-900 to-blue-800 text-white p-6 flex flex-col justify-between shadow-xl">
        <div>
          <div className="flex items-center mb-8">
            <div className="bg-white p-2 rounded-lg mr-3">
              <TrendingUp className="text-blue-600" size={24} />
            </div>
            <h1 className="text-2xl font-bold">
              Lead<span className="text-blue-300">Flow</span>
            </h1>
          </div>
          
          <nav className="space-y-1">
            {links.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                  location.pathname === link.path
                    ? "bg-blue-700 text-white shadow-inner"
                    : "text-blue-100 hover:bg-blue-700 hover:text-white"
                }`}
              >
                {link.icon} 
                <span className="font-medium">{link.name}</span>
              </Link>
            ))}
          </nav>
        </div>
        
        <div className="border-t border-blue-700 pt-4">
          <button
            onClick={() => dispatch(logout())}
            className="flex items-center gap-3 w-full px-4 py-3 rounded-lg text-blue-200 hover:bg-blue-700 hover:text-white transition-all"
          >
            <LogOut size={18} /> 
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </aside>

      <main className="flex-1 p-6 overflow-auto">
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
            <div className="flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full">
              <User size={18} />
              <span>Admin User</span>
            </div>
          </div>
          
     
          {stats && (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-4 rounded-xl shadow">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm opacity-80">Total Leads</p>
                    <p className="text-2xl font-bold mt-1">{stats.total || 0}</p>
                  </div>
                  <div className="bg-white/20 p-2 rounded-lg">
                    <Users size={20} />
                  </div>
                </div>
                <div className="text-xs mt-2 opacity-80">+12% from last week</div>
              </div>
              
              <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-4 rounded-xl shadow">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm opacity-80">Converted</p>
                    <p className="text-2xl font-bold mt-1">{stats.converted || 0}</p>
                  </div>
                  <div className="bg-white/20 p-2 rounded-lg">
                    <TrendingUp size={20} />
                  </div>
                </div>
                <div className="text-xs mt-2 opacity-80">+8% from last week</div>
              </div>
              
              <div className="bg-gradient-to-r from-amber-500 to-amber-600 text-white p-4 rounded-xl shadow">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm opacity-80">In Progress</p>
                    <p className="text-2xl font-bold mt-1">{stats.inProgress || 0}</p>
                  </div>
                  <div className="bg-white/20 p-2 rounded-lg">
                    <BarChart3 size={20} />
                  </div>
                </div>
                <div className="text-xs mt-2 opacity-80">+5% from last week</div>
              </div>
              
              <div className="bg-gradient-to-r from-red-500 to-red-600 text-white p-4 rounded-xl shadow">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm opacity-80">New Leads</p>
                    <p className="text-2xl font-bold mt-1">{stats.new || 0}</p>
                  </div>
                  <div className="bg-white/20 p-2 rounded-lg">
                    <Mail size={20} />
                  </div>
                </div>
                <div className="text-xs mt-2 opacity-80">+15% from last week</div>
              </div>
            </div>
          )}
        </div>

        {children}
      </main>
    </div>
  );
}