import api from "./api";

export const tenderServiceFrontend = {
    getAll: async (params = {}) => {
        const response = await api.get("/tenders", { params });
        return response.data;
    },

    getById: async (id) => {
        const response = await api.get(`/tenders/${id}`);
        return response.data;
    },
};
