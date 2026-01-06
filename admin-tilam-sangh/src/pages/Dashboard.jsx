import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { LayoutDashboard, FileText, Image, Users, Menu as MenuIcon, Folder } from 'lucide-react';
import api from '../services/api';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';

const Dashboard = () => {
    const { user } = useSelector((state) => state.auth);
    const [stats, setStats] = useState({
        totalPages: 0,
        totalMedia: 0,
        totalUsers: 0
    });
    const [loading, setLoading] = useState(true);

    const hasPermission = (permission) => {
        if (!user) return false;
        if (user.role === 'admin') return true;
        return user.permissions?.includes(permission);
    };

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await api.get('/admin/stats');
                if (response.data.success) {
                    setStats(response.data.data);
                }
            } catch (error) {
                console.error('Failed to fetch stats:', error);
                toast.error('Failed to load dashboard stats');
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    const statCards = [
        { name: 'Total Pages', value: stats.totalPages, icon: MenuIcon, color: 'bg-purple-500' },
        { name: 'Media Files', value: stats.totalMedia, icon: Folder, color: 'bg-blue-500' },
        { name: 'Users', value: stats.totalUsers, icon: Users, color: 'bg-orange-500' },
    ];

    return (
        <div>
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
                <p className="text-gray-600 mt-1">Welcome to Tilam Sangh Admin Panel</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {statCards.map((stat) => {
                    const Icon = stat.icon;
                    return (
                        <div key={stat.name} className="bg-white rounded-lg shadow p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                                    <p className="text-3xl font-bold text-gray-900 mt-2">
                                        {loading ? '...' : stat.value}
                                    </p>
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
                    {hasPermission('pages') && (
                        <Link to="/pages" className="block text-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-purple-500 hover:bg-purple-50 transition no-underline">
                            <MenuIcon className="mx-auto mb-2 text-gray-600" size={32} />
                            <p className="text-sm font-medium text-gray-700">Manage Pages</p>
                        </Link>
                    )}
                    {hasPermission('media') && (
                        <Link to="/media" className="block text-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition no-underline">
                            <Folder className="mx-auto mb-2 text-gray-600" size={32} />
                            <p className="text-sm font-medium text-gray-700">Upload Media</p>
                        </Link>
                    )}
                    {hasPermission('users') && (
                        <Link to="/users" className="block text-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-orange-500 hover:bg-orange-50 transition no-underline">
                            <Users className="mx-auto mb-2 text-gray-600" size={32} />
                            <p className="text-sm font-medium text-gray-700">Manage Users</p>
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
