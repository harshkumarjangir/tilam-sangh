import api from './api';

export const siteSettingsService = {
    getSettings: async () => {
        try {
            const response = await api.get(`/settings`);
            return response.data; // Expected { success: true, data: { ... } }
        } catch (error) {
            console.error("Error fetching site settings:", error);
            return { success: false, data: null };
        }
    }
};
