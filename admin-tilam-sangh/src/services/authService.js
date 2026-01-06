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

    getCurrentUser: () => {
        const user = localStorage.getItem("user");
        return user ? JSON.parse(user) : null;
    },


};
