import api from "./api";

export const navbarService = {
    getAll: async (params = {}) => {
        // Map 'lang' to 'language' for the navbar controller
        const queryParams = {
            ...params,
            language: params.language || params.lang
        };
        const response = await api.get("/navbar", { params: queryParams });

        if (response.data.success && Array.isArray(response.data.data) && response.data.data.length > 0) {
            return {
                success: true,
                data: response.data.data[0]
            };
        }
        return { success: false, message: "No navbar found" };
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
