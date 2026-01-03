import api from "./api";

export const uploadService = {
    uploadImage: async (file, folder = '') => {
        const formData = new FormData();
        formData.append('file', file);
        if (folder) formData.append('folder', folder);

        const response = await api.post('/multer/upload-image', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    },

    uploadPDF: async (file, folder = '') => {
        const formData = new FormData();
        formData.append('file', file);
        if (folder) formData.append('folder', folder);

        const response = await api.post('/multer/upload-pdf', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    },

    uploadFile: async (file, type = 'image', folder = '') => {
        const formData = new FormData();
        formData.append('file', file);
        if (folder) formData.append('folder', folder);

        const endpoint = type === 'pdf' ? '/multer/upload-pdf' : '/multer/upload-image';
        const response = await api.post(endpoint, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    },
};
