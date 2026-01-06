import React, { useState, useEffect } from 'react';
import { navbarService } from '../../services/navbarService';
import { Save, Plus, Trash2, Edit2, ChevronDown, ChevronRight, RefreshCw } from 'lucide-react';
import { toast } from 'sonner';
import Modal from '../../components/common/Modal';

const NavbarList = () => {
    const [navbar, setNavbar] = useState(null);
    const [loading, setLoading] = useState(true);
    const [language, setLanguage] = useState('English');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState(null);
    const [formData, setFormData] = useState({ title: '', link: '', submenu: [] });

    useEffect(() => {
        fetchNavbar();
    }, [language]);

    const fetchNavbar = async () => {
        try {
            setLoading(true);
            const response = await navbarService.getAll({ language });
            if (response.success && response.data) {
                setNavbar(response.data);
            } else {
                setNavbar(null);
            }
        } catch (error) {
            toast.error('Failed to fetch navbar data');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    // Translation Dictionary
    const TRANSLATIONS = {
        'Home': 'होम',
        'Profile': 'प्रोफ़ाइल',
        'Tenders': 'निविदाएँ',
        'Infrastructure': 'इन्फ्रास्ट्रक्चर',
        'Marketing': 'मार्केटिंग',
        'Quality': 'गुणवत्ता',
        'Products': 'उत्पाद',
        'Financial Result': 'वित्तीय परिणाम',
        'About Us': 'हमारे बारे में',
        'Gallery': 'गैलरी',
        'Photos Gallery': 'फोटो गैलरी',
        'Videos Gallery': 'वीडियो गैलरी',
        'Contact Us': 'संपर्क करें',
        'Career': 'करियर',
        'Services': 'सेवाएँ',
        'Industries': 'उद्योग',
        'Media': 'मीडिया',
        'CSR': 'सीएसआर'
    };

    const handleSync = async () => {
        const fromLang = language === 'English' ? 'Hindi' : 'English';
        if (!confirm(`This will overwrite current ${language} items with ${fromLang} items. Continue?`)) return;

        try {
            setLoading(true);
            const response = await navbarService.getAll({ language: fromLang });
            if (response.success && response.data) {
                const sourceItems = response.data.items || [];

                // Translate items if syncing from English to Hindi
                const translatedItems = (language === 'Hindi' && fromLang === 'English')
                    ? sourceItems.map(item => ({
                        ...item,
                        title: TRANSLATIONS[item.title] || item.title,
                        submenu: item.submenu?.map(sub => ({
                            ...sub,
                            title: TRANSLATIONS[sub.title] || sub.title
                        })) || []
                    }))
                    : sourceItems; // Keep as is if syncing Hindi -> English or other combinations (assuming English is source of truth)

                // Keep the current ID but replace items
                setNavbar(prev => ({
                    ...prev,
                    items: translatedItems
                }));

                const msg = language === 'Hindi'
                    ? `Imported from English with auto-translation.`
                    : `Imported from ${fromLang}.`;

                toast.success(`${msg} Please Review and Save.`);
            } else {
                toast.error(`No ${fromLang} navbar found to copy from.`);
            }
        } catch (error) {
            toast.error('Failed to sync navbar');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async (updatedItems) => {
        try {
            const dataToSave = {
                language,
                items: updatedItems
            };

            if (navbar?._id) {
                await navbarService.update(navbar._id, dataToSave);
                toast.success('Navbar updated successfully');
            } else {
                await navbarService.create(dataToSave);
                toast.success('Navbar created successfully');
            }
            fetchNavbar();
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to save navbar');
        }
    };

    const handleAddItem = () => {
        setEditingItem(null);
        setFormData({ title: '', link: '', submenu: [] });
        setIsModalOpen(true);
    };

    const handleEditItem = (item) => {
        setEditingItem(item);
        setFormData({
            ...item,
            submenu: item.submenu || []
        });
        setIsModalOpen(true);
    };

    const handleDeleteItem = async (index) => {
        if (!confirm('Are you sure you want to delete this menu item?')) return;

        const updatedItems = navbar.items.filter((_, i) => i !== index);
        await handleSave(updatedItems);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        let updatedItems;
        if (editingItem) {
            updatedItems = navbar.items.map(item =>
                item === editingItem ? formData : item
            );
        } else {
            updatedItems = [...(navbar?.items || []), formData];
        }

        await handleSave(updatedItems);
        setIsModalOpen(false);
    };

    const addSubmenuItem = () => {
        setFormData({
            ...formData,
            submenu: [...formData.submenu, { title: '', link: '' }]
        });
    };

    const removeSubmenuItem = (index) => {
        setFormData({
            ...formData,
            submenu: formData.submenu.filter((_, i) => i !== index)
        });
    };

    const updateSubmenuItem = (index, field, value) => {
        const updated = [...formData.submenu];
        updated[index][field] = value;
        setFormData({ ...formData, submenu: updated });
    };

    // ... existing loading check

    return (
        <div>
            {/* Header */}
            <div className="mb-6 flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Navbar Management</h1>
                    <p className="text-gray-600 mt-1">Manage website navigation menu</p>
                </div>
                <div className="flex gap-3">
                    {/* <button
                        onClick={handleSync}
                        className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded-lg transition border border-gray-300"
                        title={`Copy items from ${language === 'English' ? 'Hindi' : 'English'}`}
                    >
                        <RefreshCw size={18} />
                        Copy from {language === 'English' ? 'Hindi' : 'English'}
                    </button> */}

                    <select
                        value={language}
                        onChange={(e) => setLanguage(e.target.value)}
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                        <option value="English">English</option>
                        <option value="Hindi">Hindi</option>
                    </select>
                    <button
                        onClick={handleAddItem}
                        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
                    >
                        <Plus size={20} />
                        Add Menu Item
                    </button>
                </div>
            </div>

            {/* Menu Items List */}
            <div className="bg-white rounded-lg shadow overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Title
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Link
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Submenu Items
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {navbar?.items?.map((item, index) => (
                            <tr key={index} className="hover:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                    {item.title}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {item.link || '-'}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {item.submenu?.length || 0} items
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={() => handleEditItem(item)}
                                            className="text-blue-600 hover:text-blue-900"
                                            title="Edit"
                                        >
                                            <Edit2 size={18} />
                                        </button>
                                        <button
                                            onClick={() => handleDeleteItem(index)}
                                            className="text-red-600 hover:text-red-900"
                                            title="Delete"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        {(!navbar?.items || navbar.items.length === 0) && (
                            <tr>
                                <td colSpan="4" className="px-6 py-4 text-center text-gray-500">
                                    No menu items found. Click "Add Menu Item" to create one.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Add/Edit Modal */}
            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={editingItem ? 'Edit Menu Item' : 'Add Menu Item'}
            >
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Title *
                        </label>
                        <input
                            type="text"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Link
                        </label>
                        <input
                            type="text"
                            value={formData.link}
                            onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                            placeholder="/about"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>

                    <div>
                        <div className="flex items-center justify-between mb-2">
                            <label className="block text-sm font-medium text-gray-700">
                                Submenu Items
                            </label>
                            <button
                                type="button"
                                onClick={addSubmenuItem}
                                className="flex items-center gap-1 text-blue-600 hover:text-blue-700 text-sm"
                            >
                                <Plus size={16} />
                                Add Submenu
                            </button>
                        </div>
                        <div className="space-y-2 max-h-64 overflow-y-auto">
                            {formData.submenu.map((sub, index) => (
                                <div key={index} className="flex gap-2">
                                    <input
                                        type="text"
                                        placeholder="Title"
                                        value={sub.title}
                                        onChange={(e) => updateSubmenuItem(index, 'title', e.target.value)}
                                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                    <input
                                        type="text"
                                        placeholder="Link"
                                        value={sub.link}
                                        onChange={(e) => updateSubmenuItem(index, 'link', e.target.value)}
                                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => removeSubmenuItem(index)}
                                        className="text-red-600 hover:text-red-700"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="flex gap-3 pt-4">
                        <button
                            type="submit"
                            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
                        >
                            {editingItem ? 'Update' : 'Create'}
                        </button>
                        <button
                            type="button"
                            onClick={() => setIsModalOpen(false)}
                            className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg transition"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </Modal>
        </div>
    );
};

export default NavbarList;
