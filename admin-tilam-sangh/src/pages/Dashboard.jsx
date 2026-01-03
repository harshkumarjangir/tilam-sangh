import React from 'react';
import { LayoutDashboard, FileText, Image, Users, Menu as MenuIcon } from 'lucide-react';

const Dashboard = () => {
    const stats = [
        { name: 'Total Tenders', value: '153+', icon: FileText, color: 'bg-blue-500' },
        { name: 'Gallery Photos', value: '50+', icon: Image, color: 'bg-green-500' },
        { name: 'Pages', value: '12', icon: MenuIcon, color: 'bg-purple-500' },
        { name: 'Users', value: '5', icon: Users, color: 'bg-orange-500' },
    ];

    return (
        <div>
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
                <p className="text-gray-600 mt-1">Welcome to Tilam Sangh Admin Panel</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {stats.map((stat) => {
                    const Icon = stat.icon;
                    return (
                        <div key={stat.name} className="bg-white rounded-lg shadow p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                                    <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
                                </div>
                                <div className={`${stat.color} p-3 rounded-lg`}>
                                    <Icon className="text-white" size={24} />
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <button className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition">
                        <FileText className="mx-auto mb-2 text-gray-600" size={32} />
                        <p className="text-sm font-medium text-gray-700">Add New Tender</p>
                    </button>
                    <button className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-green-500 hover:bg-green-50 transition">
                        <Image className="mx-auto mb-2 text-gray-600" size={32} />
                        <p className="text-sm font-medium text-gray-700">Upload Photos</p>
                    </button>
                    <button className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-purple-500 hover:bg-purple-50 transition">
                        <Users className="mx-auto mb-2 text-gray-600" size={32} />
                        <p className="text-sm font-medium text-gray-700">Manage Users</p>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
