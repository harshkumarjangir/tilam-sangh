import React, { useState, useEffect } from 'react';
import { mediaService } from '../../services/mediaService';
import { FileText, Folder, Home, ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';

const MediaSelector = ({ onSelect, type = 'all', folder = '' }) => {
    const [media, setMedia] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState(type);
    const [currentFolder, setCurrentFolder] = useState(folder);

    useEffect(() => {
        fetchMedia();
    }, [currentFolder]);

    // Update filter if type prop changes, but allow manual switching
    useEffect(() => {
        if (type !== 'all') setFilter(type);
    }, [type]);

    const fetchMedia = async () => {
        try {
            setLoading(true);
            const response = await mediaService.getAll(currentFolder);
            if (response.success) {
                setMedia(response.data || []);
            }
        } catch (error) {
            toast.error('Failed to load media files');
        } finally {
            setLoading(false);
        }
    };

    const filteredMedia = media.filter(file => {
        if (filter === 'all') return true;
        if (file.type === 'folder') return true;
        return file.type === filter;
    });

    const handleFolderClick = (folderName) => {
        const newPath = currentFolder ? `${currentFolder}/${folderName}` : folderName;
        setCurrentFolder(newPath);
    };

    const handleBack = () => {
        if (!currentFolder) return;
        const parts = currentFolder.split('/');
        parts.pop();
        setCurrentFolder(parts.join('/'));
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-48">
                <div className="text-center">
                    <div className="inline-block w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
                    <div className="mt-2 text-xs text-gray-500">Loading...</div>
                </div>
            </div>
        );
    }

    return (
        <div className="h-full flex flex-col">
            {/* Header / Config */}
            <div className="flex flex-col gap-3 mb-4 shrink-0">
                {/* Mode Tabs */}
                <div className="flex border-b">
                    {['all', 'image', 'pdf'].map(mode => (
                        <button
                            key={mode}
                            type="button"
                            onClick={() => setFilter(mode)}
                            className={`px-4 py-2 text-sm font-medium capitalize transition-colors ${filter === mode
                                ? 'border-b-2 border-blue-600 text-blue-600'
                                : 'text-gray-600 hover:text-gray-900'
                                }`}
                        >
                            {mode === 'all' ? 'All Files' : `${mode}s`}
                        </button>
                    ))}
                </div>

                {/* Breadcrumbs */}
                <div className="flex items-center gap-2 text-sm text-gray-600 bg-gray-50 p-2 rounded border border-gray-100 overflow-x-auto whitespace-nowrap">
                    <button
                        type="button"
                        onClick={() => setCurrentFolder('')}
                        className={`flex items-center hover:text-blue-600 ${!currentFolder ? 'font-bold text-blue-600' : ''}`}
                    >
                        <Home size={14} className="mr-1" />
                        Root
                    </button>
                    {currentFolder.split('/').map((part, index, arr) => (
                        part && (
                            <React.Fragment key={index}>
                                <span className="text-gray-400">/</span>
                                <button
                                    type="button"
                                    onClick={() => {
                                        const newPath = arr.slice(0, index + 1).join('/');
                                        setCurrentFolder(newPath);
                                    }}
                                    className={`hover:text-blue-600 ${index === arr.length - 1 ? 'font-bold text-gray-900' : ''}`}
                                >
                                    {part}
                                </button>
                            </React.Fragment>
                        )
                    ))}
                </div>
            </div>

            {/* Grid */}
            <div className="flex-1 overflow-y-auto min-h-0">
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3 p-1">
                    {/* Back Button */}
                    {currentFolder && (
                        <div
                            onClick={handleBack}
                            className="aspect-square bg-gray-50 rounded-lg border-2 border-dashed border-gray-200 hover:border-blue-400 hover:bg-blue-50 cursor-pointer flex flex-col items-center justify-center transition group"
                        >
                            <ArrowLeft size={24} className="text-gray-400 group-hover:text-blue-500 mb-1" />
                            <span className="text-xs font-medium text-gray-500 group-hover:text-blue-600">Back</span>
                        </div>
                    )}

                    {filteredMedia.map((file) => (
                        <div
                            key={file.filename}
                            onClick={() => file.type === 'folder' ? handleFolderClick(file.filename) : onSelect(file.url)}
                            className={`group cursor-pointer border border-gray-200 rounded-lg overflow-hidden hover:border-blue-500 hover:ring-2 hover:ring-blue-200 transition relative bg-white ${file.type === 'folder' ? 'hover:shadow-md' : ''
                                }`}
                        >
                            {/* Preview */}
                            <div className="aspect-square bg-gray-100 flex items-center justify-center relative overflow-hidden">
                                {file.type === 'folder' ? (
                                    <Folder size={48} className="text-blue-300 fill-current" />
                                ) : file.type === 'image' ? (
                                    <img
                                        src={`${import.meta.env.VITE_API_URL}${file.url}`}
                                        alt={file.filename}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <FileText size={40} className="text-gray-400" />
                                )}

                                {file.type !== 'folder' && (
                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition" />
                                )}
                            </div>

                            {/* Info */}
                            <div className="p-2 border-t border-gray-100">
                                <p className="text-xs text-gray-700 font-medium truncate" title={file.filename}>
                                    {file.filename}
                                </p>
                                <p className="text-[10px] text-gray-400 mt-0.5">
                                    {file.type === 'folder' ? `${file.items || 0} items` : `${(file.size / 1024).toFixed(0)} KB`}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {filteredMedia.length === 0 && !loading && (
                    <div className="flex flex-col items-center justify-center h-48 text-gray-500">
                        <p>No files found</p>
                        {filter !== 'all' && <p className="text-xs">Filter: {filter}</p>}
                    </div>
                )}
            </div>
        </div>
    );
};

export default MediaSelector;
