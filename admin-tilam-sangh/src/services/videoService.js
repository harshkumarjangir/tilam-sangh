import api from "./api";

export const videoService = {
    getAll: async (params = {}) => {
        const response = await api.get("/videos", { params });
        return response.data;
    },

    getById: async (id) => {
        const response = await api.get(`/videos/${id}`);
        return response.data;
    },

    create: async (data) => {
        const response = await api.post("/videos", data);
        return response.data;
    },

    update: async (id, data) => {
        const response = await api.put(`/videos/${id}`, data);
        return response.data;
    },

    delete: async (id) => {
        const response = await api.delete(`/videos/${id}`);
        return response.data;
    },

    bulkUpload: async (videos) => {
        const response = await api.post("/videos/bulk", { videos });
        return response.data;
    },
};
