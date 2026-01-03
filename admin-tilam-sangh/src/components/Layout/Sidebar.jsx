import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/slices/authSlice';
import {
    LayoutDashboard,
    FileText,
    Image,
    Menu as MenuIcon,
    Users,
    Navigation,
    FootprintsIcon,
    LogOut,
    Video,
    Folder
} from 'lucide-react';
import { toast } from 'sonner';

const Sidebar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.auth);

    const handleLogout = () => {
        dispatch(logout());
        toast.success('Logged out successfully');
        navigate('/login');
    };

    const navItems = [
        { name: 'Dashboard', path: '/', icon: LayoutDashboard },
        { name: 'Tenders', path: '/tenders', icon: FileText },
        // { name: 'Gallery', path: '/gallery', icon: Image },
        // { name: 'Videos', path: '/videos', icon: Video },
        { name: 'Footer', path: '/footer', icon: FootprintsIcon },
        { name: 'Navbar', path: '/navbar', icon: Navigation },
        { name: 'Pages', path: '/pages', icon: MenuIcon },
        { name: 'Media', path: '/media', icon: Folder },
        { name: 'Users', path: '/users', icon: Users },
    ];

    return (
        <div className="w-64 bg-gray-900 text-white flex flex-col">
            {/* Logo/Brand */}
            <div className="p-6 border-b border-gray-800">
                <h1 className="text-xl font-bold">Tilam Sangh</h1>
                <p className="text-sm text-gray-400 mt-1">Admin Panel</p>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto custom-scrollbar">
                {navItems.map((item) => {
                    const Icon = item.icon;
                    return (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            end={item.path === '/'}
                            className={({ isActive }) =>
                                `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${isActive
                                    ? 'bg-blue-600 text-white'
                                    : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                                }`
                            }
                        >
                            <Icon size={20} />
                            <span className="font-medium">{item.name}</span>
                        </NavLink>
                    );
                })}
            </nav>

            {/* User Info & Logout */}
            <div className="p-4 border-t border-gray-800">
                <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center">
                        <span className="text-sm font-semibold">
                            {user?.name?.charAt(0).toUpperCase() || 'A'}
                        </span>
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{user?.name || 'Admin'}</p>
                        <p className="text-xs text-gray-400 truncate">{user?.email || ''}</p>
                    </div>
                </div>
                <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-300 hover:bg-gray-800 hover:text-white rounded-lg transition-colors"
                >
                    <LogOut size={18} />
                    <span>Logout</span>
                </button>
            </div>
        </div>
    );
};

export default Sidebar;
