import React, { useState, useEffect } from 'react';
import { videoService } from '../../services/videoService';
import { Plus, Edit, Trash2, Search, Play } from 'lucide-react';
import { toast } from 'sonner';
import Modal from '../../components/common/Modal';

const VideoList = () => {
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingVideo, setEditingVideo] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        embedUrl: '',
        thumbnail: '',
        category: 'general',
        order: 0
    });

    useEffect(() => {
        fetchVideos();
    }, [currentPage]);

    const fetchVideos = async () => {
        try {
            setLoading(true);
            const response = await videoService.getAll({ page: currentPage, limit: 12 });
            setVideos(response.data);
            setTotalPages(response.pagination?.pages || 1);
        } catch (error) {
            toast.error('Failed to fetch videos');
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingVideo) {
                await videoService.update(editingVideo._id, formData);
                toast.success('Video updated successfully');
            } else {
                await videoService.create(formData);
                toast.success('Video added successfully');
            }
            setIsModalOpen(false);
            resetForm();
            fetchVideos();
        } catch (error) {
            toast.error(error.response?.data?.message || 'Operation failed');
        }
    };

    const handleDelete = async (id) => {
        if (!confirm('Are you sure you want to delete this video?')) return;

        try {
            await videoService.delete(id);
            toast.success('Video deleted successfully');
            fetchVideos();
        } catch (error) {
            toast.error('Failed to delete video');
        }
    };

    const handleEdit = (video) => {
        setEditingVideo(video);
        setFormData({
            title: video.title,
            embedUrl: video.embedUrl,
            thumbnail: video.thumbnail || '',
            category: video.category || 'general',
            order: video.order || 0
        });
        setIsModalOpen(true);
    };

    const resetForm = () => {
        setEditingVideo(null);
        setFormData({
            title: '',
            embedUrl: '',
            thumbnail: '',
            category: 'general',
            order: 0
        });
    };

    const filteredVideos = videos.filter(video =>
        video.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>
            <div className="mb-6 flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Videos</h1>
                    <p className="text-gray-600 mt-1">Manage YouTube video gallery</p>
                </div>
                <button
                    onClick={() => {
                        resetForm();
                        setIsModalOpen(true);
                    }}
                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
                >
                    <Plus size={20} />
                    Add Video
                </button>
            </div>

            <div className="mb-6 bg-white rounded-lg shadow p-4">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                        type="text"
                        placeholder="Search videos..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                </div>
            </div>

            {loading ? (
                <div className="text-center py-12">Loading...</div>
            ) : (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredVideos.map((video) => (
                            <div key={video._id} className="bg-white rounded-lg shadow overflow-hidden group">
                                <div className="relative aspect-video bg-gray-900">
                                    <iframe
                                        src={video.embedUrl}
                                        title={video.title}
                                        className="w-full h-full"
                                        allowFullScreen
                                    />
                                </div>
                                <div className="p-4">
                                    <h3 className="font-semibold text-gray-900 mb-2">{video.title}</h3>
                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={() => handleEdit(video)}
                                            className="flex-1 text-sm text-blue-600 hover:text-blue-900"
                                        >
                                            <Edit size={16} className="inline mr-1" />
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(video._id)}
                                            className="flex-1 text-sm text-red-600 hover:text-red-900"
                                        >
                                            <Trash2 size={16} className="inline mr-1" />
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {totalPages > 1 && (
                        <div className="mt-6 flex items-center justify-center gap-4">
                            <button
                                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                                disabled={currentPage === 1}
                                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
                            >
                                Previous
                            </button>
                            <span className="text-sm text-gray-700">
                                Page {currentPage} of {totalPages}
                            </span>
                            <button
                                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                                disabled={currentPage === totalPages}
                                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
                            >
                                Next
                            </button>
                        </div>
                    )}
                </>
            )}

            <Modal
                isOpen={isModalOpen}
                onClose={() => {
                    setIsModalOpen(false);
                    resetForm();
                }}
                title={editingVideo ? 'Edit Video' : 'Add New Video'}
            >
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Title
                        </label>
                        <input
                            type="text"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            YouTube Embed URL
                        </label>
                        <input
                            type="text"
                            value={formData.embedUrl}
                            onChange={(e) => setFormData({ ...formData, embedUrl: e.target.value })}
                            placeholder="https://www.youtube.com/embed/VIDEO_ID"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                            required
                        />
                        <p className="text-xs text-gray-500 mt-1">Use the embed URL format from YouTube</p>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Category
                        </label>
                        <input
                            type="text"
                            value={formData.category}
                            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div className="flex gap-3 pt-4">
                        <button
                            type="submit"
                            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
                        >
                            {editingVideo ? 'Update' : 'Create'}
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
        </div>
    );
};

export default VideoList;
