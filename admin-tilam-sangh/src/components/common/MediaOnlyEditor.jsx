import React, { useState } from 'react';
import { Upload, Image as ImageIcon, FileText, X, Grid } from 'lucide-react';
import { mediaService } from '../../services/mediaService';
import { toast } from 'sonner';
import MediaSelector from './MediaSelector';

const MediaOnlyEditor = ({ data, onChange }) => {
    const [uploading, setUploading] = useState({});
    const [selectorOpen, setSelectorOpen] = useState(false);
    const [activeField, setActiveField] = useState(null);

    // Recursively find all media fields (images and PDFs)
    const extractMediaFields = (obj, path = '') => {
        // ... (keep existing implementation) ...
        const mediaFields = [];

        const traverse = (current, currentPath) => {
            if (!current || typeof current !== 'object') return;

            Object.keys(current).forEach(key => {
                const value = current[key];
                const fullPath = currentPath ? `${currentPath}.${key}` : key;

                // Check if it's a media field
                const isImageField = key.toLowerCase().includes('image') ||
                    key.toLowerCase().includes('logo') ||
                    key.toLowerCase().includes('thumbnail') ||
                    key.toLowerCase().includes('icon');

                // Check if value looks like an image path by extension
                const isImagePath = typeof value === 'string' &&
                    value.match(/\.(jpg|jpeg|png|gif|webp|svg)$/i);

                const isPdfField = (typeof value === 'string' && value.endsWith('.pdf')) ||
                    key.toLowerCase().includes('pdf') ||
                    (key.toLowerCase().includes('link') && typeof value === 'string' && value.includes('.pdf'));

                // FIXED: Allow empty values if it's explicitly an image/pdf field by name
                // This allows users to upload images to empty fields
                const hasValue = typeof value === 'string' && value.trim() !== '';

                // Only treat as media field if it's a string (URL) or null/empty
                // Objects/Arrays should be traversed, even if key has 'image'
                const isPrimitive = value === null || (typeof value !== 'object' && typeof value !== 'function');

                if (isPrimitive && ((isImageField || isPdfField) || (isImagePath && hasValue))) {
                    mediaFields.push({
                        path: fullPath,
                        key,
                        value,
                        type: isPdfField ? 'pdf' : 'image'
                    });
                } else if (Array.isArray(value)) {
                    value.forEach((item, index) => {
                        traverse(item, `${fullPath}[${index}]`);
                    });
                } else if (typeof value === 'object' && value !== null) {
                    traverse(value, fullPath);
                }
            });
        };

        traverse(obj, path);
        return mediaFields;
    };

    const mediaFields = extractMediaFields(data);

    // Group fields by top-level section
    // Group fields by top-level section
    const groupedFields = mediaFields.reduce((acc, field) => {
        const rootKey = field.path.split(/[.\[]/)[0];
        // Format root key to be human readable (camelCase to Title Case)
        const label = rootKey.replace(/([A-Z])/g, ' $1').trim();
        const capitalizedLabel = label.charAt(0).toUpperCase() + label.slice(1);

        if (!acc[capitalizedLabel]) {
            acc[capitalizedLabel] = [];
        }
        acc[capitalizedLabel].push(field);
        return acc;
    }, {});

    const tabs = Object.keys(groupedFields);
    const [activeTab, setActiveTab] = useState(tabs[0] || '');

    // Update active tab when tabs change (e.g. data load)
    React.useEffect(() => {
        if (!activeTab && tabs.length > 0) {
            setActiveTab(tabs[0]);
        }
    }, [tabs, activeTab]);


    const handleFileUpload = async (fieldPath, file) => {
        try {
            setUploading(prev => ({ ...prev, [fieldPath]: true }));
            const response = await mediaService.upload(file);

            if (response.success) {
                // Update the field value with the new file URL
                updateFieldValue(fieldPath, response.data.url);
                toast.success('File uploaded successfully');
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Upload failed');
        } finally {
            setUploading(prev => ({ ...prev, [fieldPath]: false }));
        }
    };

    const updateFieldValue = (path, newValue) => {
        const pathParts = path.split(/[\.\[\]]/).filter(Boolean);
        const newData = JSON.parse(JSON.stringify(data)); // Deep clone

        let current = newData;
        for (let i = 0; i < pathParts.length - 1; i++) {
            current = current[pathParts[i]];
        }
        current[pathParts[pathParts.length - 1]] = newValue;

        onChange(newData);
    };

    const openSelector = (field) => {
        setActiveField(field);
        setSelectorOpen(true);
    };

    const handleSelectMedia = (url) => {
        if (activeField) {
            updateFieldValue(activeField.path, url);
            setSelectorOpen(false);
            setActiveField(null);
            toast.success('Media selected');
        }
    };

    if (mediaFields.length === 0) {
        return (
            <div className="text-center py-8 text-gray-500">
                No media fields found in this page
            </div>
        );
    }

    const currentFields = groupedFields[activeTab] || [];

    return (
        <div className="space-y-6">
            {/* Tab Navigation */}
            {tabs.length > 1 && (
                <div className="flex flex-wrap gap-2 border-b border-gray-200 pb-2">
                    {tabs.map(tab => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === tab
                                ? 'bg-blue-600 text-white shadow-sm'
                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
            )}

            {/* Fields Grid */}
            <div className="space-y-4">
                {currentFields.map((field, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4 bg-white">
                        <div className="flex items-start gap-4">
                            {/* Preview */}
                            <div className="w-32 h-32 bg-gray-100 rounded-lg flex items-center justify-center shrink-0 overflow-hidden relative">
                                {field.type === 'image' && field.value ? (
                                    <img
                                        src={field.value.startsWith('http') ? field.value : `${import.meta.env.VITE_API_URL}${field.value}`}
                                        alt={field.key}
                                        className="w-full h-full object-cover rounded-lg"
                                    />
                                ) : field.type === 'pdf' ? (
                                    <FileText size={48} className="text-gray-400" />
                                ) : (
                                    <ImageIcon size={48} className="text-gray-400" />
                                )}
                            </div>

                            {/* Info and Actions */}
                            <div className="flex-1 min-w-0">
                                <h4 className="font-medium text-gray-900 capitalize">
                                    {field.key.replace(/([A-Z])/g, ' $1').trim()}
                                </h4>
                                <div className="flex items-center gap-2 mt-1">
                                    <span className="text-xs font-mono bg-gray-100 px-1.5 py-0.5 rounded text-gray-500 truncate max-w-[200px]" title={field.path}>
                                        {field.path}
                                    </span>
                                </div>
                                <p className="text-xs text-gray-600 mt-1 truncate" title={field.value}>
                                    Current: {field.value || '(empty)'}
                                </p>

                                {/* Actions Row */}
                                <div className="mt-3 flex gap-2 flex-wrap">
                                    {/* Upload Button */}
                                    <label className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded text-sm cursor-pointer transition shadow-sm">
                                        <Upload size={14} />
                                        {uploading[field.path] ? 'Uploading...' : 'Upload New'}
                                        <input
                                            type="file"
                                            accept={field.type === 'image' ? 'image/*' : '.pdf'}
                                            onChange={(e) => {
                                                const file = e.target.files[0];
                                                if (file) handleFileUpload(field.path, file);
                                            }}
                                            disabled={uploading[field.path]}
                                            className="hidden"
                                        />
                                    </label>

                                    {/* Select from Library Button */}
                                    <button
                                        type="button"
                                        onClick={() => openSelector(field)}
                                        className="flex items-center gap-2 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 px-3 py-1.5 rounded text-sm transition shadow-sm"
                                    >
                                        <Grid size={14} />
                                        Select from Library
                                    </button>

                                    {/* Manual URL Input */}
                                    <input
                                        type="text"
                                        value={field.value}
                                        onChange={(e) => updateFieldValue(field.path, e.target.value)}
                                        placeholder="Or enter URL manually"
                                        className="flex-1 px-3 py-1.5 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent min-w-[200px]"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Media Selector Modal */}
            {selectorOpen && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm p-4"
                    onClick={() => setSelectorOpen(false)}
                >
                    <div
                        className="bg-white rounded-lg shadow-xl w-full max-w-4xl h-[600px] flex flex-col"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex items-center justify-between p-4 border-b">
                            <h3 className="text-lg font-semibold">Select Media</h3>
                            <button
                                onClick={() => setSelectorOpen(false)}
                                className="text-gray-500 hover:text-gray-700 p-1 hover:bg-gray-100 rounded-full transition"
                            >
                                <X size={24} />
                            </button>
                        </div>
                        <div className="flex-1 p-4 overflow-hidden">
                            <MediaSelector
                                onSelect={handleSelectMedia}
                                type={activeField?.type === 'pdf' ? 'pdf' : 'image'}
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MediaOnlyEditor;
