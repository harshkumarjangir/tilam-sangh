import React, { useState, useEffect } from 'react';
import { footerService } from '../../services/footerService';
import { Save, Plus, Trash2, Edit2 } from 'lucide-react';
import { toast } from 'sonner';

const FooterList = () => {
    const [footer, setFooter] = useState(null);
    const [loading, setLoading] = useState(true);
    const [editing, setEditing] = useState(false);
    const [language, setLanguage] = useState('English');
    const [formData, setFormData] = useState({
        nodalOfficer: {
            title: '',
            name: '',
            contact: '',
            designation: '',
            mission: '',
            address: []
        },
        quickLinks: {
            title: '',
            links: []
        },
        importantLinks: {
            title: '',
            links: [],
            visitors: ''
        },
        contact: {
            title: '',
            phone: '',
            email: ''
        },
        copyright: ''
    });

    useEffect(() => {
        fetchFooter();
    }, [language]);

    const fetchFooter = async () => {
        try {
            setLoading(true);
            const response = await footerService.getAll({ lang: language });
            if (response.success && response.data) {
                setFooter(response.data);
                setFormData({
                    nodalOfficer: response.data.nodalOfficer || {
                        title: '',
                        name: '',
                        contact: '',
                        designation: '',
                        mission: '',
                        address: []
                    },
                    quickLinks: response.data.quickLinks || {
                        title: '',
                        links: []
                    },
                    importantLinks: response.data.importantLinks || {
                        title: '',
                        links: [],
                        visitors: ''
                    },
                    contact: response.data.contact || {
                        title: '',
                        phone: '',
                        email: ''
                    },
                    copyright: response.data.copyright || ''
                });
            }
        } catch (error) {
            toast.error('Failed to fetch footer data');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async () => {
        try {
            const dataToSave = {
                ...formData,
                language
            };

            if (footer?._id) {
                await footerService.update(footer._id, dataToSave);
                toast.success('Footer updated successfully');
            } else {
                await footerService.create(dataToSave);
                toast.success('Footer created successfully');
            }
            setEditing(false);
            fetchFooter();
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to save footer');
        }
    };

    const addLink = (type) => {
        setFormData({
            ...formData,
            [type]: {
                ...formData[type],
                links: [...formData[type].links, { label: '', url: '', status: true }]
            }
        });
    };

    const removeLink = (type, index) => {
        setFormData({
            ...formData,
            [type]: {
                ...formData[type],
                links: formData[type].links.filter((_, i) => i !== index)
            }
        });
    };

    const updateLink = (type, index, field, value) => {
        const updated = [...formData[type].links];
        updated[index][field] = value;
        setFormData({
            ...formData,
            [type]: {
                ...formData[type],
                links: updated
            }
        });
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="text-center">
                    <div className="inline-block w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
                    <div className="mt-3 text-gray-700">Loading footer data...</div>
                </div>
            </div>
        );
    }

    return (
        <div>
            {/* Header */}
            <div className="mb-6 flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Footer Management</h1>
                    <p className="text-gray-600 mt-1">Manage website footer content</p>
                </div>
                <div className="flex gap-3">
                    <select
                        value={language}
                        onChange={(e) => setLanguage(e.target.value)}
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                        <option value="English">English</option>
                        <option value="Hindi">Hindi</option>
                    </select>
                    {!editing ? (
                        <button
                            onClick={() => setEditing(true)}
                            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
                        >
                            <Edit2 size={20} />
                            Edit Footer
                        </button>
                    ) : (
                        <>
                            <button
                                onClick={() => {
                                    setEditing(false);
                                    fetchFooter();
                                }}
                                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSave}
                                className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition"
                            >
                                <Save size={20} />
                                Save Changes
                            </button>
                        </>
                    )}
                </div>
            </div>

            {/* Content */}
            <div className="bg-white rounded-lg shadow p-6 space-y-8">
                {/* Nodal Officer */}
                <div>
                    <h2 className="text-xl font-semibold mb-4">Nodal Officer</h2>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                            <input
                                type="text"
                                value={formData.nodalOfficer.title}
                                onChange={(e) => setFormData({
                                    ...formData,
                                    nodalOfficer: { ...formData.nodalOfficer, title: e.target.value }
                                })}
                                disabled={!editing}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                            <input
                                type="text"
                                value={formData.nodalOfficer.name}
                                onChange={(e) => setFormData({
                                    ...formData,
                                    nodalOfficer: { ...formData.nodalOfficer, name: e.target.value }
                                })}
                                disabled={!editing}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Designation</label>
                            <input
                                type="text"
                                value={formData.nodalOfficer.designation}
                                onChange={(e) => setFormData({
                                    ...formData,
                                    nodalOfficer: { ...formData.nodalOfficer, designation: e.target.value }
                                })}
                                disabled={!editing}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Contact</label>
                            <input
                                type="text"
                                value={formData.nodalOfficer.contact}
                                onChange={(e) => setFormData({
                                    ...formData,
                                    nodalOfficer: { ...formData.nodalOfficer, contact: e.target.value }
                                })}
                                disabled={!editing}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
                            />
                        </div>
                        <div className="col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Mission</label>
                            <textarea
                                value={formData.nodalOfficer.mission}
                                onChange={(e) => setFormData({
                                    ...formData,
                                    nodalOfficer: { ...formData.nodalOfficer, mission: e.target.value }
                                })}
                                disabled={!editing}
                                rows="3"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
                            />
                        </div>
                        <div className="col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Address (one per line)</label>
                            <textarea
                                value={formData.nodalOfficer.address?.join('\n') || ''}
                                onChange={(e) => setFormData({
                                    ...formData,
                                    nodalOfficer: { ...formData.nodalOfficer, address: e.target.value.split('\n') }
                                })}
                                disabled={!editing}
                                rows="3"
                                placeholder="Line 1&#10;Line 2&#10;Line 3"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
                            />
                        </div>
                    </div>
                </div>

                {/* Quick Links */}
                <div>
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-semibold">Quick Links</h2>
                        {editing && (
                            <button
                                onClick={() => addLink('quickLinks')}
                                className="flex items-center gap-2 text-blue-600 hover:text-blue-700"
                            >
                                <Plus size={18} />
                                Add Link
                            </button>
                        )}
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Section Title</label>
                        <input
                            type="text"
                            value={formData.quickLinks.title}
                            onChange={(e) => setFormData({
                                ...formData,
                                quickLinks: { ...formData.quickLinks, title: e.target.value }
                            })}
                            disabled={!editing}
                            placeholder="Quick Links"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
                        />
                    </div>
                    <div className="space-y-3">
                        {formData.quickLinks.links?.map((link, index) => (
                            <div key={index} className="flex gap-3">
                                <input
                                    type="text"
                                    placeholder="Label"
                                    value={link.label}
                                    onChange={(e) => updateLink('quickLinks', index, 'label', e.target.value)}
                                    disabled={!editing}
                                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
                                />
                                <input
                                    type="text"
                                    placeholder="URL"
                                    value={link.url}
                                    onChange={(e) => updateLink('quickLinks', index, 'url', e.target.value)}
                                    disabled={!editing}
                                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
                                />
                                {editing && (
                                    <button
                                        onClick={() => removeLink('quickLinks', index)}
                                        className="text-red-600 hover:text-red-700"
                                    >
                                        <Trash2 size={20} />
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Important Links */}
                <div>
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-semibold">Important Links</h2>
                        {editing && (
                            <button
                                onClick={() => addLink('importantLinks')}
                                className="flex items-center gap-2 text-blue-600 hover:text-blue-700"
                            >
                                <Plus size={18} />
                                Add Link
                            </button>
                        )}
                    </div>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Section Title</label>
                            <input
                                type="text"
                                value={formData.importantLinks.title}
                                onChange={(e) => setFormData({
                                    ...formData,
                                    importantLinks: { ...formData.importantLinks, title: e.target.value }
                                })}
                                disabled={!editing}
                                placeholder="Important Links"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Visitors Count</label>
                            <input
                                type="text"
                                value={formData.importantLinks.visitors}
                                onChange={(e) => setFormData({
                                    ...formData,
                                    importantLinks: { ...formData.importantLinks, visitors: e.target.value }
                                })}
                                disabled={!editing}
                                placeholder="1,234,567"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
                            />
                        </div>
                    </div>
                    <div className="space-y-3">
                        {formData.importantLinks.links?.map((link, index) => (
                            <div key={index} className="flex gap-3">
                                <input
                                    type="text"
                                    placeholder="Label"
                                    value={link.label}
                                    onChange={(e) => updateLink('importantLinks', index, 'label', e.target.value)}
                                    disabled={!editing}
                                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
                                />
                                <input
                                    type="text"
                                    placeholder="URL"
                                    value={link.url}
                                    onChange={(e) => updateLink('importantLinks', index, 'url', e.target.value)}
                                    disabled={!editing}
                                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
                                />
                                {editing && (
                                    <button
                                        onClick={() => removeLink('importantLinks', index)}
                                        className="text-red-600 hover:text-red-700"
                                    >
                                        <Trash2 size={20} />
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Contact Information */}
                <div>
                    <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Section Title</label>
                            <input
                                type="text"
                                value={formData.contact.title}
                                onChange={(e) => setFormData({
                                    ...formData,
                                    contact: { ...formData.contact, title: e.target.value }
                                })}
                                disabled={!editing}
                                placeholder="Contact Us"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                                <input
                                    type="text"
                                    value={formData.contact.phone}
                                    onChange={(e) => setFormData({
                                        ...formData,
                                        contact: { ...formData.contact, phone: e.target.value }
                                    })}
                                    disabled={!editing}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                <input
                                    type="email"
                                    value={formData.contact.email}
                                    onChange={(e) => setFormData({
                                        ...formData,
                                        contact: { ...formData.contact, email: e.target.value }
                                    })}
                                    disabled={!editing}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Copyright */}
                <div>
                    <h2 className="text-xl font-semibold mb-4">Copyright</h2>
                    <input
                        type="text"
                        value={formData.copyright}
                        onChange={(e) => setFormData({ ...formData, copyright: e.target.value })}
                        disabled={!editing}
                        placeholder="© 2024 Tilam Sangh. All rights reserved."
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
                    />
                </div>
            </div>
        </div>
    );
};

export default FooterList;
