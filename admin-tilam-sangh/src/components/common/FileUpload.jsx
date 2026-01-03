import React, { useState, useRef } from 'react';
import { Upload, X, FileText, Image as ImageIcon, Loader } from 'lucide-react';
import { uploadService } from '../../services/uploadService';
import { toast } from 'sonner';

const FileUpload = ({
    onUploadComplete,
    accept = "image/*",
    type = "image",
    label = "Upload File",
    currentFile = null,
    folder = '' // New prop for folder organization
}) => {
    const [uploading, setUploading] = useState(false);
    const [preview, setPreview] = useState(currentFile);
    const fileInputRef = useRef(null);

    const handleFileSelect = async (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Validate file type
        if (type === 'image' && !file.type.startsWith('image/')) {
            toast.error('Please select an image file');
            return;
        }
        if (type === 'pdf' && file.type !== 'application/pdf') {
            toast.error('Please select a PDF file');
            return;
        }

        // Validate file size (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
            toast.error('File size must be less than 5MB');
            return;
        }

        try {
            setUploading(true);

            // Create preview for images
            if (type === 'image') {
                const reader = new FileReader();
                reader.onloadend = () => {
                    setPreview(reader.result);
                };
                reader.readAsDataURL(file);
            }

            // Upload file with folder parameter
            const response = await uploadService.uploadFile(file, type, folder);

            if (response.success) {
                const fileUrl = response.fileUrl || response.url;
                setPreview(fileUrl);
                onUploadComplete(fileUrl);
                toast.success('File uploaded successfully');
            } else {
                throw new Error(response.message || 'Upload failed');
            }
        } catch (error) {
            console.error('Upload error:', error);
            toast.error(error.response?.data?.message || 'Failed to upload file');
            setPreview(currentFile);
        } finally {
            setUploading(false);
        }
    };

    const handleRemove = () => {
        setPreview(null);
        onUploadComplete('');
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    return (
        <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
                {label}
            </label>

            {preview ? (
                <div className="relative">
                    {type === 'image' ? (
                        <div className="relative w-full h-48 bg-gray-100 rounded-lg overflow-hidden">
                            <img
                                src={preview}
                                alt="Preview"
                                className="w-full h-full object-contain"
                            />
                            <button
                                type="button"
                                onClick={handleRemove}
                                className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition"
                            >
                                <X size={16} />
                            </button>
                        </div>
                    ) : (
                        <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg border border-gray-200">
                            <FileText className="text-red-600" size={32} />
                            <div className="flex-1">
                                <p className="text-sm font-medium text-gray-900">PDF File</p>
                                <p className="text-xs text-gray-500">{preview}</p>
                            </div>
                            <button
                                type="button"
                                onClick={handleRemove}
                                className="p-1 text-red-600 hover:bg-red-50 rounded"
                            >
                                <X size={18} />
                            </button>
                        </div>
                    )}
                </div>
            ) : (
                <div
                    onClick={() => fileInputRef.current?.click()}
                    className="relative border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-500 transition cursor-pointer"
                >
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept={accept}
                        onChange={handleFileSelect}
                        className="hidden"
                        disabled={uploading}
                    />

                    {uploading ? (
                        <div className="flex flex-col items-center gap-2">
                            <Loader className="animate-spin text-blue-600" size={32} />
                            <p className="text-sm text-gray-600">Uploading...</p>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center gap-2">
                            {type === 'image' ? (
                                <ImageIcon className="text-gray-400" size={32} />
                            ) : (
                                <FileText className="text-gray-400" size={32} />
                            )}
                            <div>
                                <p className="text-sm font-medium text-gray-700">
                                    Click to upload {type === 'image' ? 'image' : 'PDF'}
                                </p>
                                <p className="text-xs text-gray-500 mt-1">
                                    {type === 'image' ? 'PNG, JPG, GIF up to 5MB' : 'PDF up to 5MB'}
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default FileUpload;
