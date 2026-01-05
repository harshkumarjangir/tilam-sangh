import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Menu } from 'lucide-react';
import Sidebar from './Sidebar';

const AdminLayout = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [isCollapsed, setIsCollapsed] = useState(false);

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <Sidebar
                isOpen={sidebarOpen}
                onClose={() => setSidebarOpen(false)}
                isCollapsed={isCollapsed}
                toggleCollapse={() => setIsCollapsed(!isCollapsed)}
            />

            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden transition-all duration-300">
                {/* Header */}
                <header className="bg-white shadow-sm z-10">
                    <div className="px-6 py-4 flex items-center gap-4">
                        <button
                            onClick={() => setSidebarOpen(true)}
                            className="p-1 -ml-2 text-gray-500 hover:text-gray-700 md:hidden"
                        >
                            <Menu size={24} />
                        </button>
                        <h2 className="text-2xl font-semibold text-gray-800">
                            Tilam Sangh Admin Panel
                        </h2>
                    </div>
                </header>

                {/* Content Area */}
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;
