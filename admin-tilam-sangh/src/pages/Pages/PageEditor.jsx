import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { pageService } from '../../services/pageService';
import { ArrowLeft, Save } from 'lucide-react';
import { toast } from 'sonner';
import DynamicFormBuilder from '../../components/common/DynamicFormBuilder';

const PageEditor = () => {
    const { slug } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [editMode, setEditMode] = useState('form'); // 'form', 'json'
    const [formData, setFormData] = useState({
        slug: '',
        language: 'English',
        data: {},
        seo: {
            title: '',
            description: '',
            keywords: '',
            ogTitle: '',
            ogDescription: '',
            ogImage: ''
        },
        status: true
    });

    useEffect(() => {
        if (slug && slug !== 'new') {
            fetchPage();
        } else {
            setLoading(false);
        }
    }, [slug]);

    const fetchPage = async () => {
        try {
            setLoading(true);
            // Convert _home to empty string for API call
            const apiSlug = slug === '_home' ? '' : slug;
            const response = await pageService.getBySlug(apiSlug);
            if (response.success) {
                setFormData({
                    slug: response.data.slug,
                    language: response.data.language,
                    data: response.data.data || {},
                    seo: response.data.seo || {
                        title: '',
                        description: '',
                        keywords: '',
                        ogTitle: '',
                        ogDescription: '',
                        ogImage: ''
                    },
                    status: response.data.status
                });
            }
        } catch (error) {
            toast.error('Failed to load page');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate JSON if in JSON mode
        if (editMode === 'json' && typeof formData.data === 'string') {
            try {
                JSON.parse(formData.data);
            } catch (jsonError) {
                toast.error('Invalid JSON in Page Data. Please fix the syntax before saving.');
                return;
            }
        }

        try {
            setSaving(true);
            // Convert _home to empty string for API call
            const apiSlug = slug === '_home' ? '' : slug;
            if (slug && slug !== 'new') {
                await pageService.update(apiSlug, formData);
                toast.success('Page updated successfully');
            } else {
                await pageService.create(formData);
                toast.success('Page created successfully');
            }
            navigate('/pages');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Operation failed');
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="text-center">
                    <div className="inline-block w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
                    <div className="mt-3 text-gray-700">Loading page...</div>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-6xl">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div className="flex max-sm:flex-col max-sm:items-start items-center gap-4">
                    <button
                        onClick={() => navigate('/pages')}
                        className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
                    >
                        <ArrowLeft size={20} />
                        Back to Pages
                    </button>
                    <h1 className="text-2xl font-bold text-gray-900 max-sm:text-xl">
                        {slug && slug !== 'new' ? `Edit Page: ${slug || 'Home'}` : 'Create New Page'}
                    </h1>
                </div>
                <button
                    onClick={handleSubmit}
                    disabled={saving}
                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition disabled:opacity-50"
                >
                    <Save size={18} />
                    {saving ? 'Saving...' : 'Save Page'}
                </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Page Content Section */}
                <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold">Page Content</h3>
                        <div className="flex gap-2">
                            <button
                                type="button"
                                onClick={() => setEditMode('form')}
                                className={`text-xs px-3 py-1 rounded transition ${editMode === 'form' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                            >
                                Form
                            </button>
                            {/* <button
                                type="button"
                                onClick={() => setEditMode('json')}
                                className={`text-xs px-3 py-1 rounded transition ${editMode === 'json' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                            >
                                JSON
                            </button> */}
                        </div>
                    </div>

                    {editMode === 'json' ? (
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Page Data (JSON)
                            </label>
                            <textarea
                                value={JSON.stringify(formData.data, null, 2)}
                                onChange={(e) => {
                                    try {
                                        const parsed = JSON.parse(e.target.value);
                                        setFormData({ ...formData, data: parsed });
                                    } catch (err) {
                                        // Allow invalid JSON while typing
                                        setFormData({ ...formData, data: e.target.value });
                                    }
                                }}
                                rows="20"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm"
                                placeholder='{"key": "value"}'
                            />
                            <p className="mt-1 text-xs text-gray-500">
                                Advanced mode: Edit the page content as JSON. Make sure it's valid JSON before saving.
                            </p>
                        </div>
                    ) : (
                        <div className="max-h-[600px] overflow-y-auto">
                            <DynamicFormBuilder
                                data={formData.data}
                                onChange={(newData) => setFormData({ ...formData, data: newData })}
                                uploadFolder={slug === '_home' || !slug ? 'home' : slug}
                            />
                        </div>
                    )}
                </div>

                {/* SEO Section */}
                <div className="bg-white rounded-lg shadow p-6">
                    <h3 className="text-lg font-semibold mb-4">SEO Settings</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                SEO Title
                            </label>
                            <input
                                type="text"
                                value={formData.seo.title}
                                onChange={(e) => setFormData({
                                    ...formData,
                                    seo: { ...formData.seo, title: e.target.value }
                                })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Keywords
                            </label>
                            <input
                                type="text"
                                value={formData.seo.keywords}
                                onChange={(e) => setFormData({
                                    ...formData,
                                    seo: { ...formData.seo, keywords: e.target.value }
                                })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Description
                            </label>
                            <textarea
                                value={formData.seo.description}
                                onChange={(e) => setFormData({
                                    ...formData,
                                    seo: { ...formData.seo, description: e.target.value }
                                })}
                                rows="3"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default PageEditor;
