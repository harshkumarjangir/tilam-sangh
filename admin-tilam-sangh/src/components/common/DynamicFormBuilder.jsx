import React, { useState, useEffect } from 'react';
import { Plus, Trash2, ChevronDown, ChevronRight, List, Upload, Grid, X, Image as ImageIcon, FileText } from 'lucide-react';
import { mediaService } from '../../services/mediaService';
import { toast } from 'sonner';
import MediaSelector from './MediaSelector';

const ArrayManager = ({ fieldKey, value, onChange, path, uploadFolder }) => {
    const [isCollapsed, setIsCollapsed] = useState(true);
    const [selectedIndex, setSelectedIndex] = useState(0);

    const handleAdd = () => {
        const existingArray = value || [];
        let newItem;

        if (existingArray.length > 0) {
            const firstItem = existingArray[0];
            if (typeof firstItem === 'object' && !Array.isArray(firstItem)) {
                newItem = JSON.parse(JSON.stringify(firstItem));
                Object.keys(newItem).forEach(k => {
                    if (typeof newItem[k] === 'string') newItem[k] = '';
                    if (typeof newItem[k] === 'number') newItem[k] = 0;
                    if (typeof newItem[k] === 'boolean') newItem[k] = false;
                });
            } else {
                newItem = typeof firstItem === 'string' ? '' :
                    typeof firstItem === 'number' ? 0 : '';
            }
        } else {
            newItem = { label: '', value: '' };
        }

        const newArray = [...existingArray, newItem];
        onChange(newArray);
        setSelectedIndex(newArray.length - 1);
        setIsCollapsed(false);
    };

    const handleRemove = (index, e) => {
        e.stopPropagation();
        const newArray = value.filter((_, i) => i !== index);
        onChange(newArray);
        if (selectedIndex >= newArray.length) {
            setSelectedIndex(Math.max(0, newArray.length - 1));
        }
    };

    const handleUpdateItem = (index, newValue) => {
        const newArray = [...value];
        newArray[index] = newValue;
        onChange(newArray);
    };

    const getItemLabel = (item, index) => {
        if (typeof item !== 'object' || item === null) return `Item ${index + 1}`;
        const labelKey = Object.keys(item).find(k =>
            ['name', 'title', 'label', 'heading', 'sno', 'id'].includes(k.toLowerCase())
        );
        return labelKey && item[labelKey] ? item[labelKey].toString().substring(0, 30) : `Item ${index + 1}`;
    };

    return (
        <div className="mb-4 border border-gray-200 rounded-lg bg-gray-50 overflow-hidden">
            <div className="flex items-center justify-between p-3 bg-gray-100 border-b border-gray-200">
                <button
                    type="button"
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-gray-900"
                >
                    {isCollapsed ? <ChevronRight size={16} /> : <ChevronDown size={16} />}
                    <span className="capitalize">{fieldKey.replace(/([A-Z])/g, ' $1').trim()}</span>
                    <span className="text-xs text-gray-500">({value.length} items)</span>
                </button>
                <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-400 hidden md:inline">
                        {isCollapsed ? 'Click arrow to expand' : 'Select item to edit'}
                    </span>
                    <button
                        type="button"
                        onClick={handleAdd}
                        className="flex items-center gap-1 text-xs text-blue-600 hover:text-blue-700 font-medium px-2 py-1 bg-blue-50 rounded border border-blue-200"
                    >
                        <Plus size={14} />
                        Add Item
                    </button>
                </div>
            </div>

            {!isCollapsed && (
                <div className="flex flex-col md:flex-row h-[500px]">
                    <div className="w-full md:w-64 border-r border-gray-200 bg-white overflow-y-auto shrink-0">
                        {value.map((item, index) => (
                            <div
                                key={index}
                                onClick={() => setSelectedIndex(index)}
                                className={`flex items-center justify-between p-3 border-b border-gray-50 cursor-pointer hover:bg-gray-50 transition w-full text-left group ${selectedIndex === index ? 'bg-blue-50 border-l-4 border-l-blue-500' : 'border-l-4 border-l-transparent'
                                    }`}
                            >
                                <div className="flex items-center gap-2 min-w-0">
                                    <List size={14} className="text-gray-400 shrink-0" />
                                    <span className={`text-sm truncate ${selectedIndex === index ? 'font-medium text-blue-700' : 'text-gray-600'}`}>
                                        {getItemLabel(item, index)}
                                    </span>
                                </div>
                                <button
                                    type="button"
                                    onClick={(e) => handleRemove(index, e)}
                                    className="text-gray-400 hover:text-red-600 opacity-0 group-hover:opacity-100 transition p-1"
                                    title="Delete Item"
                                >
                                    <Trash2 size={14} />
                                </button>
                            </div>
                        ))}
                        {value.length === 0 && (
                            <div className="p-8 text-center text-sm text-gray-400 flex flex-col items-center gap-2">
                                <List size={24} className="opacity-20" />
                                No items yet
                            </div>
                        )}
                    </div>

                    <div className="flex-1 overflow-y-auto p-4 bg-white">
                        {value.length > 0 && selectedIndex < value.length ? (
                            <div className="max-w-3xl mx-auto">
                                <div className="mb-6 pb-2 border-b border-gray-100 flex justify-between items-end">
                                    <h4 className="text-lg font-semibold text-gray-800">
                                        {getItemLabel(value[selectedIndex], selectedIndex)}
                                    </h4>
                                    <span className="text-xs font-mono text-gray-400 bg-gray-50 px-2 py-1 rounded">
                                        Index: {selectedIndex}
                                    </span>
                                </div>
                                {typeof value[selectedIndex] === 'object' && !Array.isArray(value[selectedIndex]) ? (
                                    <DynamicFormBuilder
                                        data={value[selectedIndex]}
                                        onChange={(newItem) => handleUpdateItem(selectedIndex, newItem)}
                                        path={`${path}.${fieldKey}[${selectedIndex}]`}
                                        uploadFolder={uploadFolder}
                                    />
                                ) : (
                                    <div className="space-y-2">
                                        <label className="block text-sm font-medium text-gray-700">
                                            Value
                                        </label>
                                        <input
                                            type="text"
                                            value={value[selectedIndex]}
                                            onChange={(e) => handleUpdateItem(selectedIndex, e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        />
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center h-full text-gray-400 text-sm gap-2">
                                <ChevronRight size={24} className="opacity-20" />
                                Select an item from the list to edit details
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

const DynamicFormBuilder = ({ data, onChange, path = '', uploadFolder = '' }) => {
    const [collapsed, setCollapsed] = useState({});
    const [activeTab, setActiveTab] = useState(null);
    const [uploading, setUploading] = useState({});
    const [selectorOpen, setSelectorOpen] = useState(false);
    const [activeField, setActiveField] = useState(null);

    useEffect(() => {
        if (path === '' && data && typeof data === 'object' && !activeTab) {
            const keys = Object.keys(data);
            if (keys.length > 0) setActiveTab(keys[0]);
        }
    }, [data, path, activeTab]);

    const toggleCollapse = (key) => {
        setCollapsed(prev => ({ ...prev, [key]: !prev[key] }));
    };

    const updateValue = (key, value) => {
        const newData = { ...data };
        newData[key] = value;
        onChange(newData);
    };

    const handleFileUpload = async (key, file) => {
        try {
            setUploading(prev => ({ ...prev, [key]: true }));
            const response = await mediaService.upload(file, uploadFolder);
            if (response.success) {
                updateValue(key, response.data.url);
                toast.success('File uploaded');
            }
        } catch (error) {
            toast.error('Upload failed');
        } finally {
            setUploading(prev => ({ ...prev, [key]: false }));
        }
    };

    const openSelector = (key, type) => {
        setActiveField({ key, type });
        setSelectorOpen(true);
    };

    const handleSelectMedia = (url) => {
        if (activeField) {
            updateValue(activeField.key, url);
            setSelectorOpen(false);
            setActiveField(null);
        }
    };

    const renderField = (key, value, currentPath) => {
        const fieldPath = currentPath ? `${currentPath}.${key}` : key;
        const isCollapsed = collapsed[fieldPath];

        if (value === null || value === undefined) {
            return (
                <div key={key} className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1 capitalize">
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                    </label>
                    <input
                        type="text"
                        value=""
                        onChange={(e) => updateValue(key, e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                </div>
            );
        }

        if (Array.isArray(value)) {
            return (
                <ArrayManager
                    key={key}
                    fieldKey={key}
                    value={value}
                    onChange={(newValue) => updateValue(key, newValue)}
                    path={currentPath}
                    uploadFolder={uploadFolder}
                />
            );
        }

        if (typeof value === 'object') {
            return (
                <div key={key} className="mb-4 border border-gray-200 rounded-lg p-4 bg-gray-50">
                    <button
                        type="button"
                        onClick={() => toggleCollapse(fieldPath)}
                        className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-gray-900 mb-3"
                    >
                        {isCollapsed ? <ChevronRight size={16} /> : <ChevronDown size={16} />}
                        <span className="capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                    </button>
                    {!isCollapsed && (
                        <DynamicFormBuilder
                            data={value}
                            onChange={(newValue) => updateValue(key, newValue)}
                            path={fieldPath}
                            uploadFolder={uploadFolder}
                        />
                    )}
                </div>
            );
        }

        if (typeof value === 'boolean') {
            return (
                <div key={key} className="mb-4">
                    <label className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            checked={value}
                            onChange={(e) => updateValue(key, e.target.checked)}
                            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="text-sm font-medium text-gray-700 capitalize">
                            {key.replace(/([A-Z])/g, ' $1').trim()}
                        </span>
                    </label>
                </div>
            );
        }

        if (typeof value === 'number') {
            return (
                <div key={key} className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1 capitalize">
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                    </label>
                    <input
                        type="number"
                        value={value}
                        onChange={(e) => updateValue(key, parseFloat(e.target.value) || 0)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                </div>
            );
        }

        // Media Field Detection
        const isImageField = key.toLowerCase().includes('image') ||
            key.toLowerCase().includes('logo') ||
            key.toLowerCase().includes('icon') ||
            key.toLowerCase().includes('banner') ||
            key.toLowerCase().includes('thumbnail') ||
            key.toLowerCase().includes('photo') ||
            key.toLowerCase().includes('gallery') ||
            key.toLowerCase().includes('pic');

        const isPdfField = key.toLowerCase().includes('pdf') ||
            key.toLowerCase().includes('file') ||
            key.toLowerCase().includes('document') ||
            key.toLowerCase().includes('attachment') ||
            key.toLowerCase().includes('download') ||
            (typeof value === 'string' && value.endsWith('.pdf'));
        const isMedia = isImageField || isPdfField || (typeof value === 'string' && value.match(/\.(jpg|jpeg|png|webp)$/i));

        if (isMedia) {
            const mediaType = isPdfField ? 'pdf' : 'image';
            return (
                <div key={key} className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2 capitalize">
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                    </label>
                    <div className="flex items-start gap-4 p-4 border border-gray-200 rounded-lg bg-gray-50">
                        {/* Preview */}
                        <div className="w-24 h-24 bg-white border border-gray-200 rounded-lg flex items-center justify-center shrink-0 overflow-hidden">
                            {mediaType === 'image' && value ? (
                                <img
                                    src={value.startsWith('http') ? value : value.startsWith('/assets/') ? `${import.meta.env.VITE_API_URL}/uploads/media${value.substring(7)}` : `${import.meta.env.VITE_API_URL}${value}`}
                                    alt="Preview"
                                    className="w-full h-full object-cover"
                                />
                            ) : mediaType === 'pdf' ? (
                                <FileText size={32} className="text-red-500" />
                            ) : (
                                <ImageIcon size={32} className="text-gray-400" />
                            )}
                        </div>

                        {/* Controls */}
                        <div className="flex-1 space-y-3">
                            <div className="flex gap-2">
                                <label className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded text-sm cursor-pointer transition shadow-sm">
                                    <Upload size={14} />
                                    {uploading[key] ? 'Uploading...' : 'Upload New'}
                                    <input
                                        type="file"
                                        accept={mediaType === 'image' ? 'image/*' : '.pdf'}
                                        onChange={(e) => {
                                            const file = e.target.files[0];
                                            if (file) handleFileUpload(key, file);
                                        }}
                                        disabled={uploading[key]}
                                        className="hidden"
                                    />
                                </label>
                                <button
                                    type="button"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        openSelector(key, mediaType);
                                    }}
                                    className="flex items-center gap-2 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 px-3 py-1.5 rounded text-sm transition shadow-sm"
                                >
                                    <Grid size={14} />
                                    Library
                                </button>
                            </div>
                            <input
                                type="text"
                                value={value}
                                onChange={(e) => updateValue(key, e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs"
                                placeholder="Or enter URL manually"
                            />
                        </div>
                    </div>
                </div>
            );
        }

        const isLongText = value.length > 100;
        return (
            <div key={key} className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1 capitalize">
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                </label>
                {isLongText ? (
                    <textarea
                        value={value}
                        onChange={(e) => updateValue(key, e.target.value)}
                        rows="3"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                ) : (
                    <input
                        type="text"
                        value={value}
                        onChange={(e) => updateValue(key, e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                )}
            </div>
        );
    };

    if (!data || typeof data !== 'object') {
        return null;
    }

    // Render Tabs for Root Level
    if (path === '') {
        const keys = Object.keys(data);
        if (keys.length > 0) {
            return (
                <div>
                    <div className="flex flex-wrap gap-2 border-b border-gray-200 pb-2 mb-4">
                        {keys.map(key => (
                            <button
                                key={key}
                                type="button"
                                onClick={() => setActiveTab(key)}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === key
                                    ? 'bg-blue-600 text-white shadow-sm'
                                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                    }`}
                            >
                                {key.replace(/([A-Z])/g, ' $1').trim().replace(/^\w/, c => c.toUpperCase())}
                            </button>
                        ))}
                    </div>
                    {activeTab && (
                        <div className="bg-white rounded-lg">
                            {renderField(activeTab, data[activeTab], '', uploadFolder)}
                        </div>
                    )}

                    {selectorOpen && (
                        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm p-4">
                            <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl h-[600px] flex flex-col">
                                <div className="flex items-center justify-between p-4 border-b">
                                    <h3 className="text-lg font-semibold">Select Media</h3>
                                    <button
                                        type="button"
                                        onClick={() => setSelectorOpen(false)}
                                        className="text-gray-500 hover:text-gray-700 p-1 hover:bg-gray-100 rounded-full transition"
                                    >
                                        <X size={24} />
                                    </button>
                                </div>
                                <div className="flex-1 p-4 overflow-hidden">
                                    <MediaSelector
                                        onSelect={handleSelectMedia}
                                        type={activeField?.type || 'image'}
                                        folder={uploadFolder}
                                    />
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            );
        }
    }

    // Since this is recursive, we must render the modal ONLY at the root level? 
    // Actually, since we check path === '' for the tabs, the modal is only rendered once there.
    // BUT what about recursive calls that trigger the modal? 
    // Since each level has its own state, if a child calls openSelector, it sets ITS OWN state.
    // So we need to render the modal for EVERY instance of DynamicFormBuilder to catch its own state changes.
    // The previous block only renders if path === ''.
    // Let's add the modal render at the end of the general return too.

    return (
        <div className="space-y-2">
            {Object.keys(data).map(key => renderField(key, data[key], path))}

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
                                type="button"
                                onClick={() => setSelectorOpen(false)}
                                className="text-gray-500 hover:text-gray-700 p-1 hover:bg-gray-100 rounded-full transition"
                            >
                                <X size={24} />
                            </button>
                        </div>
                        <div className="flex-1 p-4 overflow-hidden">
                            <MediaSelector
                                onSelect={handleSelectMedia}
                                type={activeField?.type || 'image'}
                                folder={uploadFolder}
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DynamicFormBuilder;
