import React, { useState, useEffect } from 'react';
import { mediaService } from '../../services/mediaService';
import { Upload, Trash2, Copy, Download, FileText, Folder, ArrowLeft, Home } from 'lucide-react';
import { toast } from 'sonner';

const MediaLibrary = () => {
    const [media, setMedia] = useState([]);
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);
    const [filter, setFilter] = useState('all'); // all, image, pdf
    const [currentFolder, setCurrentFolder] = useState('');

    useEffect(() => {
        fetchMedia();
    }, [currentFolder]);

    const fetchMedia = async () => {
        try {
            setLoading(true);
            const response = await mediaService.getAll(currentFolder);
            if (response.success) {
                setMedia(response.data || []);
            }
        } catch (error) {
            toast.error('Failed to load media files');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleFileUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        try {
            setUploading(true);
            const response = await mediaService.upload(file, currentFolder);
            if (response.success) {
                toast.success('File uploaded successfully');
                fetchMedia();
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Upload failed');
        } finally {
            setUploading(false);
        }
    };

    const handleDelete = async (filename) => {
        if (!confirm(`Are you sure you want to delete ${filename}?`)) return;

        try {
            const response = await mediaService.delete(filename, currentFolder);
            if (response.success) {
                toast.success('File deleted successfully');
                fetchMedia();
            }
        } catch (error) {
            toast.error('Failed to delete file');
        }
    };

    const copyToClipboard = (url) => {
        navigator.clipboard.writeText(`${window.location.origin}${url}`);
        toast.success('URL copied to clipboard');
    };

    const filteredMedia = media.filter(file => {
        if (filter === 'all') return true;
        if (file.type === 'folder') return true; // Always show folders
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
            <div className="flex items-center justify-center h-64">
                <div className="text-center">
                    <div className="inline-block w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
                    <div className="mt-3 text-gray-700">Loading media...</div>
                </div>
            </div>
        );
    }

    return (
        <div>
            {/* Header */}
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-gray-900">Media Library</h1>
                <p className="text-gray-600 mt-1">Manage your images and PDF files</p>
            </div>

            {/* Breadcrumb / Navigation */}
            <div className="flex items-center gap-2 mb-4 text-sm text-gray-600 bg-gray-50 p-3 rounded-lg border border-gray-200">
                <button
                    onClick={() => setCurrentFolder('')}
                    className={`flex items-center hover:text-blue-600 ${!currentFolder ? 'font-bold text-blue-600' : ''}`}
                >
                    <Home size={16} className="mr-1" />
                    Root
                </button>
                {currentFolder.split('/').map((part, index, arr) => (
                    <React.Fragment key={index}>
                        <span className="text-gray-400">/</span>
                        <button
                            onClick={() => {
                                const newPath = arr.slice(0, index + 1).join('/');
                                setCurrentFolder(newPath);
                            }}
                            className={`hover:text-blue-600 ${index === arr.length - 1 ? 'font-bold text-gray-900' : ''}`}
                        >
                            {part}
                        </button>
                    </React.Fragment>
                ))}
            </div>

            {/* Upload Section */}
            <div className="bg-white rounded-lg shadow p-6 mb-6">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold">
                        {currentFolder ? `Upload to "${currentFolder.split('/').pop()}"` : 'Upload New File'}
                    </h2>
                    <label className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg cursor-pointer transition">
                        <Upload size={18} />
                        {uploading ? 'Uploading...' : 'Choose File'}
                        <input
                            type="file"
                            accept="image/*,.pdf"
                            onChange={handleFileUpload}
                            disabled={uploading}
                            className="hidden"
                        />
                    </label>
                </div>
                <p className="text-sm text-gray-500">
                    Supported formats: JPEG, PNG, GIF, WEBP, PDF (Max 10MB)
                </p>
            </div>

            {/* Filter Tabs */}
            <div className="bg-white rounded-lg shadow mb-6">
                <div className="flex border-b">
                    <button
                        onClick={() => setFilter('all')}
                        className={`px-6 py-3 font-medium ${filter === 'all' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-600'}`}
                    >
                        All Files
                    </button>
                    <button
                        onClick={() => setFilter('image')}
                        className={`px-6 py-3 font-medium ${filter === 'image' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-600'}`}
                    >
                        Images
                    </button>
                    <button
                        onClick={() => setFilter('pdf')}
                        className={`px-6 py-3 font-medium ${filter === 'pdf' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-600'}`}
                    >
                        PDFs
                    </button>
                </div>
            </div>

            {/* Media Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {currentFolder && (
                    <div
                        onClick={handleBack}
                        className="bg-gray-100 rounded-lg shadow-sm border-2 border-dashed border-gray-300 hover:border-blue-400 hover:bg-blue-50 cursor-pointer flex flex-col items-center justify-center h-64 transition group"
                    >
                        <ArrowLeft size={48} className="text-gray-400 group-hover:text-blue-500 mb-2" />
                        <span className="font-medium text-gray-600 group-hover:text-blue-600">Go Back</span>
                    </div>
                )}

                {filteredMedia.map((file) => (
                    <div
                        key={file.filename}
                        className={`bg-white rounded-lg shadow overflow-hidden relative group ${file.type === 'folder' ? 'cursor-pointer hover:ring-2 hover:ring-blue-400 transition transform hover:-translate-y-1' : ''}`}
                        onClick={() => file.type === 'folder' && handleFolderClick(file.filename)}
                    >
                        {/* Preview */}
                        <div className="h-48 bg-gray-100 flex items-center justify-center">
                            {file.type === 'folder' ? (
                                <Folder size={64} className="text-blue-300 fill-current" />
                            ) : file.type === 'image' ? (
                                <img
                                    src={`${import.meta.env.VITE_API_URL}${file.url}`}
                                    alt={file.filename}
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <FileText size={64} className="text-gray-400" />
                            )}
                        </div>

                        {/* Info */}
                        <div className="p-4">
                            <h3 className="font-medium text-sm text-gray-900 truncate" title={file.filename}>
                                {file.filename}
                            </h3>
                            <div className="flex justify-between items-center mt-1">
                                <p className="text-xs text-gray-500">
                                    {file.type === 'folder'
                                        ? `${file.items || 0} items`
                                        : `${(file.size / 1024).toFixed(2)} KB`}
                                </p>
                                <p className="text-xs text-gray-400">
                                    {new Date(file.uploadedAt).toLocaleDateString()}
                                </p>
                            </div>

                            {/* Actions (Only for files) */}
                            {file.type !== 'folder' && (
                                <div className="flex gap-2 mt-3 opacity-0 group-hover:opacity-100 transition">
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            copyToClipboard(file.url);
                                        }}
                                        className="flex-1 flex items-center justify-center gap-1 text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-2 py-1.5 rounded transition"
                                        title="Copy URL"
                                    >
                                        <Copy size={14} />
                                    </button>
                                    <a
                                        href={`${import.meta.env.VITE_API_URL}${file.url}`}
                                        download
                                        onClick={(e) => e.stopPropagation()}
                                        className="flex-1 flex items-center justify-center gap-1 text-xs bg-blue-100 hover:bg-blue-200 text-blue-700 px-2 py-1.5 rounded transition"
                                        title="Download"
                                    >
                                        <Download size={14} />
                                    </a>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleDelete(file.filename);
                                        }}
                                        className="flex items-center justify-center text-xs bg-red-100 hover:bg-red-200 text-red-700 px-2 py-1.5 rounded transition"
                                        title="Delete"
                                    >
                                        <Trash2 size={14} />
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                ))}

                {filteredMedia.length === 0 && !loading && (
                    <div className="col-span-full text-center py-12 text-gray-500 border-2 border-dashed border-gray-200 rounded-lg">
                        <p>No files found in this folder.</p>
                        <p className="text-xs mt-1">Upload a file to get started.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MediaLibrary;
