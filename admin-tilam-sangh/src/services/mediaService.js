import api from "./api";

export const mediaService = {
    // Upload file
    upload: async (file, folder = '') => {
        const formData = new FormData();
        formData.append('file', file);

        const query = folder ? `?folder=${encodeURIComponent(folder)}` : '';
        const response = await api.post(`/media/upload${query}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data;
    },

    // List all media files
    getAll: async (folder = '') => {
        const query = folder ? `?folder=${encodeURIComponent(folder)}` : '';
        const response = await api.get(`/media${query}`);
        return response.data;
    },

    // Get single file info
    getFileInfo: async (filename) => {
        const response = await api.get(`/media/${filename}`);
        return response.data;
    },

    // Delete file
    delete: async (filename, folder = '') => {
        const query = folder ? `?folder=${encodeURIComponent(folder)}` : '';
        const response = await api.delete(`/media/${filename}${query}`);
        return response.data;
    }
};
