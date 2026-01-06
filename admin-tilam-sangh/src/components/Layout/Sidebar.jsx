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
    Folder,
    Settings,
    ChevronLeft,
    ChevronRight,
    X
} from 'lucide-react';
import { toast } from 'sonner';

const Sidebar = ({ isOpen, onClose, isCollapsed, toggleCollapse, logo, title }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.auth);

    const handleLogout = () => {
        dispatch(logout());
        toast.success('Logged out successfully');
        navigate('/login');
    };

    const allNavItems = [
        { name: 'Dashboard', path: '/', icon: LayoutDashboard, permission: null }, // Always visible
        { name: 'Users', path: '/users', icon: Users, permission: 'users' },
        { name: 'Pages', path: '/pages', icon: MenuIcon, permission: 'pages' },
        { name: 'Navbar', path: '/navbar', icon: Navigation, permission: 'navbar' },
        { name: 'Footer', path: '/footer', icon: FootprintsIcon, permission: 'footer' },
        { name: 'Media', path: '/media', icon: Folder, permission: 'media' },
        { name: 'Settings', path: '/settings', icon: Settings, permission: 'settings' },
    ];

    const navItems = allNavItems.filter(item => {
        if (!user || user.role === 'admin') return true;
        if (item.permission === null) return true;
        return user.permissions?.includes(item.permission);
    });

    return (
        <>
            {/* Mobile Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 z-20 bg-black/50 md:hidden"
                    onClick={onClose}
                />
            )}

            {/* Sidebar Container */}
            <div
                className={`
                    fixed md:static inset-y-0 left-0 z-30
                    bg-gray-900 text-white flex flex-col
                    transition-all duration-300 ease-in-out
                    ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
                    ${isCollapsed ? 'w-20' : 'w-64'}
                `}
            >
                {/* Logo/Brand */}
                <div className="p-4 h-16 flex items-center justify-between border-b border-gray-800">
                    {!isCollapsed && (
                        <div className="flex-1 min-w-0 flex items-center gap-2">
                            {
                                logo ? (
                                    <img src={`${import.meta.env.VITE_API_URL}${logo}`} alt={title || "Tilam Sangh"} className="h-8 w-auto object-contain" />
                                ) :
                                    // null
                                    <h1 className="text-xl font-bold truncate">{title || "Tilam Sangh"}</h1>
                            }
                        </div>
                    )}
                    {/* Mobile Close Button */}
                    <button
                        onClick={onClose}
                        className="md:hidden text-gray-400 hover:text-white"
                    >
                        <X size={24} />
                    </button>
                    {/* Desktop Collapse Toggle */}
                    <button
                        onClick={toggleCollapse}
                        className="hidden md:flex p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800"
                    >
                        {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
                    </button>
                </div>

                {/* Navigation */}
                <nav className="flex-1 px-3 py-4 space-y-2 overflow-y-auto custom-scrollbar">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        return (
                            <NavLink
                                key={item.path}
                                to={item.path}
                                end={item.path === '/'}
                                onClick={() => isOpen && onClose()} // Close on mobile when clicked
                                className={({ isActive }) =>
                                    `flex items-center gap-3 px-3 py-3 rounded-lg transition-colors whitespace-nowrap ${isActive
                                        ? 'bg-blue-600 text-white'
                                        : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                                    } ${isCollapsed ? 'justify-center' : ''}`
                                }
                                title={isCollapsed ? item.name : ''}
                            >
                                <Icon size={20} className="shrink-0" />
                                {!isCollapsed && (
                                    <span className="font-medium truncate">{item.name}</span>
                                )}
                            </NavLink>
                        );
                    })}
                </nav>

                {/* User Info & Logout */}
                <div className="p-3 border-t border-gray-800">
                    {!isCollapsed && (
                        <div className="flex items-center gap-3 mb-3 px-1">
                            <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center shrink-0">
                                <span className="text-sm font-semibold">
                                    {user?.name?.charAt(0).toUpperCase() || 'A'}
                                </span>
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium truncate">{user?.name || 'Admin'}</p>
                                <p className="text-xs text-gray-400 truncate">{user?.email || ''}</p>
                            </div>
                        </div>
                    )}
                    <button
                        onClick={handleLogout}
                        className={`w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-300 hover:bg-gray-800 hover:text-white rounded-lg transition-colors ${isCollapsed ? 'justify-center' : ''}`}
                        title={isCollapsed ? 'Logout' : ''}
                    >
                        <LogOut size={18} className="shrink-0" />
                        {!isCollapsed && <span>Logout</span>}
                    </button>
                </div>
            </div>
        </>
    );
};

export default Sidebar;
