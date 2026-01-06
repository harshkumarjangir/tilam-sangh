import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { Menu } from 'lucide-react';
import Sidebar from './Sidebar';
import { siteSettingsService } from '../../services/siteSettingsService';

const AdminLayout = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [siteSettings, setSiteSettings] = useState(null);

    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const response = await siteSettingsService.getSettings();
                if (response.success && response.data) {
                    setSiteSettings(response.data);

                    // Update document title
                    if (response.data.title) {
                        document.title = `${response.data.title} - Admin Panel`;
                    }

                    // Update favicon
                    if (response.data.favicon) {
                        let link = document.querySelector("link[rel~='icon']");
                        if (!link) {
                            link = document.createElement('link');
                            link.rel = 'icon';
                            document.getElementsByTagName('head')[0].appendChild(link);
                        }
                        link.href = `${import.meta.env.VITE_API_URL}${response.data.favicon}`;
                    }
                }
            } catch (error) {
                console.error("Failed to fetch site settings:", error);
            }
        };

        fetchSettings();
    }, []);

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <Sidebar
                isOpen={sidebarOpen}
                onClose={() => setSidebarOpen(false)}
                isCollapsed={isCollapsed}
                toggleCollapse={() => setIsCollapsed(!isCollapsed)}
                logo={siteSettings?.logo}
                title={siteSettings?.title}
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
                            {siteSettings?.title ? `${siteSettings.title} Admin` : 'Tilam Sangh Admin Panel'}
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
