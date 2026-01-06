import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { userService } from '../../services/userService';
import { Plus, Edit, Trash2, Search, Key } from 'lucide-react';
import { toast } from 'sonner';
import Modal from '../../components/common/Modal';

const UserList = () => {
    const { user: currentUser } = useSelector(state => state.auth);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
    const [editingUser, setEditingUser] = useState(null);
    const [selectedUser, setSelectedUser] = useState(null);
    const AVAILABLE_PERMISSIONS = [
        { id: 'navbar', label: 'Manage Navbar' },
        { id: 'footer', label: 'Manage Footer' },
        { id: 'pages', label: 'Manage Pages' },
        { id: 'settings', label: 'Site Settings' },
        { id: 'media', label: 'Media Library' },
        { id: 'users', label: 'Manage Users' },
    ];

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        role: 'admin',
        permissions: []
    });
    const [newPassword, setNewPassword] = useState('');

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            setLoading(true);
            const response = await userService.getAll();
            setUsers(response.data);
        } catch (error) {
            toast.error('Failed to fetch users');
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingUser) {
                const { password, ...updateData } = formData;
                await userService.update(editingUser._id, updateData);
                toast.success('User updated successfully');
            } else {
                await userService.create(formData);
                toast.success('User created successfully');
            }
            setIsModalOpen(false);
            resetForm();
            fetchUsers();
        } catch (error) {
            toast.error(error.response?.data?.message || 'Operation failed');
        }
    };

    const handlePasswordChange = async (e) => {
        e.preventDefault();
        try {
            await userService.changePassword(selectedUser._id, newPassword);
            toast.success('Password changed successfully');
            setIsPasswordModalOpen(false);
            setNewPassword('');
            setSelectedUser(null);
        } catch (error) {
            toast.error('Failed to change password');
        }
    };

    const handleDelete = async (id) => {
        if (!confirm('Are you sure you want to delete this user?')) return;

        try {
            await userService.delete(id);
            toast.success('User deleted successfully');
            fetchUsers();
        } catch (error) {
            toast.error('Failed to delete user');
        }
    };

    const handleEdit = (user) => {
        setEditingUser(user);
        setFormData({
            name: user.name,
            email: user.email,
            password: '',
            role: user.role,
            permissions: user.permissions || []
        });
        setIsModalOpen(true);
    };

    const openPasswordModal = (user) => {
        setSelectedUser(user);
        setNewPassword('');
        setIsPasswordModalOpen(true);
    };

    const resetForm = () => {
        setEditingUser(null);
        setFormData({
            name: '',
            email: '',
            password: '',
            role: 'admin',
            permissions: []
        });
    };

    const handlePermissionChange = (permissionId) => {
        setFormData(prev => {
            const currentPermissions = prev.permissions || [];
            if (currentPermissions.includes(permissionId)) {
                return { ...prev, permissions: currentPermissions.filter(p => p !== permissionId) };
            } else {
                return { ...prev, permissions: [...currentPermissions, permissionId] };
            }
        });
    };

    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>
            <div className="mb-6 flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Users</h1>
                    <p className="text-gray-600 mt-1">Manage admin users</p>
                </div>

                {currentUser?.role === 'admin' && (
                    <button
                        onClick={() => {
                            resetForm();
                            setIsModalOpen(true);
                        }}
                        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
                    >
                        <Plus size={20} />
                        Add User
                    </button>
                )}
            </div>

            <div className="mb-6 bg-white rounded-lg shadow p-4">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                        type="text"
                        placeholder="Search users..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                </div>
            </div>

            <div className="bg-white rounded-lg shadow overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Role</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {loading ? (
                            <tr>
                                <td colSpan="4" className="px-6 py-4 text-center text-gray-500">Loading...</td>
                            </tr>
                        ) : filteredUsers.length === 0 ? (
                            <tr>
                                <td colSpan="4" className="px-6 py-4 text-center text-gray-500">No users found</td>
                            </tr>
                        ) : (
                            filteredUsers.map((user) => (
                                <tr key={user._id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{user.name}</td>
                                    <td className="px-6 py-4 text-sm text-gray-500">{user.email}</td>
                                    <td className="px-6 py-4 text-sm text-gray-500">
                                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${user.role === 'admin' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'
                                            }`}>
                                            {user.role}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-sm font-medium">
                                        <div className="flex items-center gap-2">
                                            <button
                                                onClick={() => openPasswordModal(user)}
                                                className={`text-green-600 hover:text-green-900 ${(currentUser?.role !== 'admin' && user.role === 'admin' && user._id !== currentUser?._id)
                                                    ? 'opacity-50 cursor-not-allowed'
                                                    : ''
                                                    }`}
                                                title={
                                                    (currentUser?.role !== 'admin' && user.role === 'admin' && user._id !== currentUser?._id)
                                                        ? "Cannot change admin password"
                                                        : "Change Password"
                                                }
                                                disabled={currentUser?.role !== 'admin' && user.role === 'admin' && user._id !== currentUser?._id}
                                            >
                                                <Key size={18} />
                                            </button>
                                            <button
                                                onClick={() => handleEdit(user)}
                                                className={`text-blue-600 hover:text-blue-900 ${(currentUser?.role !== 'admin' && user.role === 'admin' && user._id !== currentUser?._id)
                                                    ? 'opacity-50 cursor-not-allowed'
                                                    : ''
                                                    }`}
                                                title={
                                                    (currentUser?.role !== 'admin' && user.role === 'admin' && user._id !== currentUser?._id)
                                                        ? "Cannot edit admin"
                                                        : "Edit"
                                                }
                                                disabled={currentUser?.role !== 'admin' && user.role === 'admin' && user._id !== currentUser?._id}
                                            >
                                                <Edit size={18} />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(user._id)}
                                                className={`text-red-600 hover:text-red-900 ${(user._id === currentUser?._id || (currentUser?.role !== 'admin' && user.role === 'admin'))
                                                    ? 'opacity-50 cursor-not-allowed'
                                                    : ''
                                                    }`}
                                                title={
                                                    user._id === currentUser?._id
                                                        ? "Cannot delete yourself"
                                                        : (currentUser?.role !== 'admin' && user.role === 'admin')
                                                            ? "Cannot delete admin"
                                                            : "Delete"
                                                }
                                                disabled={user._id === currentUser?._id || (currentUser?.role !== 'admin' && user.role === 'admin')}
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* User Form Modal */}
            <Modal
                isOpen={isModalOpen}
                onClose={() => {
                    setIsModalOpen(false);
                    resetForm();
                }}
                title={editingUser ? 'Edit User' : 'Add New User'}
            >
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                        <input
                            type="text"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <input
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    {!editingUser && (
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                            <input
                                type="password"
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>
                    )}

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                        <select
                            value={formData.role}
                            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
                            disabled={currentUser?.role !== 'admin'}
                            title={currentUser?.role !== 'admin' ? "Only Admin can change roles" : ""}
                        >
                            <option value="admin">Admin</option>
                            <option value="subadmin">Subadmin</option>
                        </select>
                    </div>

                    {formData.role === 'subadmin' && (
                        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Permissions</label>
                            <div className="grid grid-cols-2 gap-2">
                                {AVAILABLE_PERMISSIONS.map(perm => (
                                    <label key={perm.id} className={`flex items-center space-x-2 text-sm text-gray-600 ${currentUser?.role !== 'admin' ? 'cursor-not-allowed opacity-70' : 'cursor-pointer hover:text-gray-900'}`}>
                                        <input
                                            type="checkbox"
                                            checked={formData.permissions?.includes(perm.id)}
                                            onChange={() => currentUser?.role === 'admin' && handlePermissionChange(perm.id)}
                                            className="rounded text-blue-600 focus:ring-blue-500 disabled:cursor-not-allowed"
                                            disabled={currentUser?.role !== 'admin'}
                                        />
                                        <span>{perm.label}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                    )}

                    <div className="flex gap-3 pt-4">
                        <button
                            type="submit"
                            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
                        >
                            {editingUser ? 'Update' : 'Create'}
                        </button>
                        <button
                            type="button"
                            onClick={() => {
                                setIsModalOpen(false);
                                resetForm();
                            }}
                            className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg transition"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </Modal>

            {/* Password Change Modal */}
            <Modal
                isOpen={isPasswordModalOpen}
                onClose={() => {
                    setIsPasswordModalOpen(false);
                    setNewPassword('');
                    setSelectedUser(null);
                }}
                title="Change Password"
                size="sm"
            >
                <form onSubmit={handlePasswordChange} className="space-y-4">
                    <p className="text-sm text-gray-600">
                        Changing password for: <strong>{selectedUser?.name}</strong>
                    </p>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                        <input
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                            required
                            minLength={6}
                        />
                    </div>

                    <div className="flex gap-3 pt-4">
                        <button
                            type="submit"
                            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
                        >
                            Change Password
                        </button>
                        <button
                            type="button"
                            onClick={() => {
                                setIsPasswordModalOpen(false);
                                setNewPassword('');
                                setSelectedUser(null);
                            }}
                            className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg transition"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </Modal>
        </div >
    );
};

export default UserList;
