import api from "./api";

export const authService = {
    login: async (email, password) => {
        const response = await api.post("/auth/login", { email, password });
        if (response.data) {
            localStorage.setItem("user", JSON.stringify(response.data));
        }
        return response.data;
    },

    register: async (name, email, password) => {
        const response = await api.post("/auth/register", { name, email, password });
        return response.data;
    },

    logout: async () => {
        await api.post("/auth/logout");
        localStorage.removeItem("user");
    },

    getCurrentUser: async () => {
        try {
            const response = await api.get("/auth/me");
            return response.data;
        } catch (error) {
            return null;
        }
    },


};
