import api from "./api";

export const pageService = {
    getAll: async () => {
        const response = await api.get("/pages/list/all");
        return response.data;
    },

    getBySlug: async (slug) => {
        const response = await api.get(`/pages/${slug}`);
        return response.data;
    },

    create: async (data) => {
        const response = await api.post("/pages", data);
        return response.data;
    },

    update: async (slug, data) => {
        const response = await api.put(`/pages/${slug}`, data);
        return response.data;
    },

    patch: async (slug, path, value) => {
        const response = await api.patch(`/pages/update-service/${slug}`, { path, value });
        return response.data;
    },

    delete: async (slug) => {
        const response = await api.delete(`/pages/${slug}`);
        return response.data;
    },
};
