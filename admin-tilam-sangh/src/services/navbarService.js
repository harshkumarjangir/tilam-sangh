import api from "./api";

export const navbarService = {
    getAll: async (params = {}) => {
        const response = await api.get("/layout", { params });
        // Extract navbar from layout response
        if (response.data.success && response.data.data.navbar) {
            return {
                success: true,
                data: {
                    items: response.data.data.navbar,
                    language: response.data.language
                }
            };
        }
        return response.data;
    },

    getById: async (id) => {
        const response = await api.get(`/navbar/${id}`);
        return response.data;
    },

    create: async (data) => {
        const response = await api.post("/navbar", data);
        return response.data;
    },

    update: async (id, data) => {
        const response = await api.put(`/navbar/${id}`, data);
        return response.data;
    },

    patch: async (id, path, value) => {
        const response = await api.patch(`/navbar/${id}`, { path, value });
        return response.data;
    },

    delete: async (id) => {
        const response = await api.delete(`/navbar/${id}`);
        return response.data;
    },
};
