import api from "./api";

export const footerService = {
    getAll: async (params = {}) => {
        const response = await api.get("/layout", { params });
        // Extract footer from layout response - pass through as-is
        if (response.data.success && response.data.data.footer) {
            return {
                success: true,
                data: response.data.data.footer
            };
        }
        return response.data;
    },

    getById: async (id) => {
        const response = await api.get(`/footer/${id}`);
        return response.data;
    },

    create: async (data) => {
        const response = await api.post("/footer", data);
        return response.data;
    },

    update: async (id, data) => {
        const response = await api.put(`/footer/${id}`, data);
        return response.data;
    },

    patch: async (id, path, value) => {
        const response = await api.patch(`/footer/${id}`, { path, value });
        return response.data;
    },

    delete: async (id) => {
        const response = await api.delete(`/footer/${id}`);
        return response.data;
    },
};
