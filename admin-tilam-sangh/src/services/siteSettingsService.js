import api from './api';

export const siteSettingsService = {
    getSettings: async (lang = 'English') => {
        const response = await api.get(`/settings?lang=${lang}`);
        return response.data;
    },

    updateSettings: async (data) => {
        const response = await api.put(`/settings?lang=${data.language || 'English'}`, data);
        return response.data;
    }
};
