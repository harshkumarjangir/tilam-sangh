import React, { useState, useEffect } from 'react';
import { siteSettingsService } from '../../services/siteSettingsService';
import { uploadService } from '../../services/uploadService';
import { Save, Upload, Grid, Globe, Loader } from 'lucide-react';
import { toast } from 'sonner';
import Modal from '../../components/common/Modal';
import MediaSelector from '../../components/common/MediaSelector';

const SiteSettings = () => {
    const [settings, setSettings] = useState({
        title: '',
        description: '',
        keywords: '',
        logo: '',
        favicon: '',
        contact: {
            phone: '',
            email: '',
            address: '',
            mapUrl: ''
        },
        socialLinks: []
    });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [language, setLanguage] = useState('English');

    // Media Selection State
    const [isMediaModalOpen, setIsMediaModalOpen] = useState(false);
    const [activeField, setActiveField] = useState(null); // 'logo' or 'favicon'
    const [uploading, setUploading] = useState(false);

    const handleFileUpload = async (field, file) => {
        if (!file) return;
        try {
            setUploading(true);
            const response = await uploadService.uploadFile(file, 'media/site-settings');
            if (response.success) {
                handleChange(field, response.url);
                toast.success('File uploaded successfully');
            }
        } catch (error) {
            toast.error('Upload failed');
            console.error(error);
        } finally {
            setUploading(false);
        }
    };

    useEffect(() => {
        fetchSettings();
    }, [language]);

    const fetchSettings = async () => {
        try {
            setLoading(true);
            const response = await siteSettingsService.getSettings(language);
            if (response.success && response.data) {
                // Merge with default structure to avoid undefined errors
                setSettings({
                    ...settings,
                    ...response.data,
                    contact: { ...settings.contact, ...response.data.contact }
                });
            }
        } catch (error) {
            toast.error('Failed to load settings');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async (e) => {
        e.preventDefault();
        try {
            setSaving(true);
            await siteSettingsService.updateSettings({ ...settings, language });
            toast.success('Settings saved successfully');
        } catch (error) {
            toast.error('Failed to save settings');
            console.error(error);
        } finally {
            setSaving(false);
        }
    };

    const handleChange = (field, value) => {
        setSettings(prev => ({ ...prev, [field]: value }));
    };

    const handleContactChange = (field, value) => {
        setSettings(prev => ({
            ...prev,
            contact: { ...prev.contact, [field]: value }
        }));
    };

    const openMediaSelector = (field) => {
        setActiveField(field);
        setIsMediaModalOpen(true);
    };

    const handleMediaSelect = (url) => {
        if (activeField) {
            handleChange(activeField, url);
            setIsMediaModalOpen(false);
            setActiveField(null);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <Loader className="animate-spin text-blue-600" size={32} />
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Site Settings</h1>
                    <p className="text-sm text-gray-500">Manage global website configuration</p>
                </div>
                <div className="flex items-center gap-4">
                    <select
                        value={language}
                        onChange={(e) => setLanguage(e.target.value)}
                        className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
                    >
                        <option value="English">English</option>
                        <option value="Hindi">Hindi</option>
                    </select>
                    <button
                        onClick={handleSave}
                        disabled={saving}
                        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition disabled:opacity-50"
                    >
                        {saving ? <Loader className="animate-spin" size={18} /> : <Save size={18} />}
                        Save Changes
                    </button>
                </div>
            </div>

            <form onSubmit={handleSave} className="space-y-6">
                {/* General Info */}
                <div className="bg-white rounded-lg shadow p-6">
                    <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                        <Globe size={20} className="text-gray-400" />
                        General Information
                    </h2>
                    <div className="grid gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Site Title</label>
                            <input
                                type="text"
                                value={settings.title}
                                onChange={(e) => handleChange('title', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Meta Description</label>
                            <textarea
                                value={settings.description}
                                onChange={(e) => handleChange('description', e.target.value)}
                                rows={3}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Keywords (comma separated)</label>
                            <input
                                type="text"
                                value={settings.keywords}
                                onChange={(e) => handleChange('keywords', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    </div>
                </div>

                {/* Branding */}
                <div className="bg-white rounded-lg shadow p-6">
                    <h2 className="text-lg font-semibold mb-4">Branding</h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        {/* Logo */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Website Logo</label>
                            <div className="border border-gray-200 rounded-lg p-4 bg-gray-50 flex flex-col items-center gap-4">
                                <div className="w-full h-32 bg-white rounded border border-gray-200 flex items-center justify-center overflow-hidden">
                                    {settings.logo ? (
                                        <img
                                            src={`${import.meta.env.VITE_API_URL}${settings.logo}`}
                                            alt="Logo"
                                            className="max-h-full max-w-full object-contain"
                                        />
                                    ) : (
                                        <span className="text-gray-400 text-sm">No Logo</span>
                                    )}
                                </div>
                                <div className="flex gap-2 w-full">
                                    <input
                                        type="text"
                                        value={settings.logo}
                                        onChange={(e) => handleChange('logo', e.target.value)}
                                        placeholder="Logo URL"
                                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm"
                                    />
                                    <label className="p-2 border border-gray-300 bg-white rounded-lg hover:bg-gray-50 cursor-pointer" title="Upload New">
                                        {uploading ? <Loader size={20} className="animate-spin" /> : <Upload size={20} />}
                                        <input
                                            type="file"
                                            className="hidden"
                                            accept="image/*"
                                            disabled={uploading}
                                            onChange={(e) => handleFileUpload('logo', e.target.files[0])}
                                        />
                                    </label>
                                    <button
                                        type="button"
                                        onClick={() => openMediaSelector('logo')}
                                        className="p-2 border border-gray-300 bg-white rounded-lg hover:bg-gray-50"
                                        title="Select from Media"
                                    >
                                        <Grid size={20} />
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Favicon */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Favicon</label>
                            <div className="border border-gray-200 rounded-lg p-4 bg-gray-50 flex flex-col items-center gap-4">
                                <div className="w-16 h-16 bg-white rounded border border-gray-200 flex items-center justify-center overflow-hidden">
                                    {settings.favicon ? (
                                        <img
                                            src={`${import.meta.env.VITE_API_URL}${settings.favicon}`}
                                            alt="Favicon"
                                            className="max-h-full max-w-full object-contain"
                                        />
                                    ) : (
                                        <span className="text-gray-400 text-xs">No Icon</span>
                                    )}
                                </div>
                                <div className="flex gap-2 w-full">
                                    <input
                                        type="text"
                                        value={settings.favicon}
                                        onChange={(e) => handleChange('favicon', e.target.value)}
                                        placeholder="Favicon URL"
                                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm"
                                    />
                                    <label className="p-2 border border-gray-300 bg-white rounded-lg hover:bg-gray-50 cursor-pointer" title="Upload New">
                                        {uploading ? <Loader size={20} className="animate-spin" /> : <Upload size={20} />}
                                        <input
                                            type="file"
                                            className="hidden"
                                            accept="image/*"
                                            disabled={uploading}
                                            onChange={(e) => handleFileUpload('favicon', e.target.files[0])}
                                        />
                                    </label>
                                    <button
                                        type="button"
                                        onClick={() => openMediaSelector('favicon')}
                                        className="p-2 border border-gray-300 bg-white rounded-lg hover:bg-gray-50"
                                        title="Select from Media"
                                    >
                                        <Grid size={20} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Contact Info */}
                <div className="bg-white rounded-lg shadow p-6">
                    <h2 className="text-lg font-semibold mb-4">Contact Information</h2>
                    <div className="grid md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                            <input
                                type="text"
                                value={settings.contact.phone}
                                onChange={(e) => handleContactChange('phone', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                            <input
                                type="email"
                                value={settings.contact.email}
                                onChange={(e) => handleContactChange('email', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                            <textarea
                                value={settings.contact.address}
                                onChange={(e) => handleContactChange('address', e.target.value)}
                                rows={2}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    </div>
                </div>
            </form>

            <Modal
                isOpen={isMediaModalOpen}
                onClose={() => setIsMediaModalOpen(false)}
                title={`Select ${activeField === 'logo' ? 'Logo' : 'Favicon'}`}
                size="lg"
            >
                <div className="h-[60vh]">
                    <MediaSelector
                        onSelect={handleMediaSelect}
                        type="image"
                        folder="media/site-settings"
                    />
                </div>
            </Modal>
        </div>
    );
};

export default SiteSettings;
