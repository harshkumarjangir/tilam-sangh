import api from "./api";

export const tenderService = {
    getAll: async (params = {}) => {
        const response = await api.get("/tenders", { params });
        return response.data;
    },

    getById: async (id) => {
        const response = await api.get(`/tenders/${id}`);
        return response.data;
    },

    create: async (data) => {
        const response = await api.post("/tenders", data);
        return response.data;
    },

    update: async (id, data) => {
        const response = await api.put(`/tenders/${id}`, data);
        return response.data;
    },

    delete: async (id) => {
        const response = await api.delete(`/tenders/${id}`);
        return response.data;
    },

    bulkUpload: async (tenders) => {
        const response = await api.post("/tenders/bulk", { tenders });
        return response.data;
    },
};
