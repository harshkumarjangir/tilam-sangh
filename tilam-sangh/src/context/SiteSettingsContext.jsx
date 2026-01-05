import React, { createContext, useContext, useState, useEffect } from 'react';
import { siteSettingsService } from '../services/siteSettings.service';
import { useLanguage } from './LanguageContext';

const SiteSettingsContext = createContext();

export const useSiteSettings = () => {
    return useContext(SiteSettingsContext);
};

export const SiteSettingsProvider = ({ children }) => {
    // const { language } = useLanguage(); // Settings are now global
    const [settings, setSettings] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSettings = async () => {
            setLoading(true);
            const response = await siteSettingsService.getSettings();

            if (response.success && response.data) {
                setSettings(response.data);

                // Update Document Title
                if (response.data.title) {
                    document.title = response.data.title;
                }

                // Update Favicon
                if (response.data.favicon) {
                    const existingFavicon = document.querySelector("link[rel~='icon']");
                    const faviconUrl = `${import.meta.env.VITE_API_URL}${response.data.favicon}`;

                    if (existingFavicon) {
                        existingFavicon.href = faviconUrl;
                    } else {
                        const newFavicon = document.createElement('link');
                        newFavicon.rel = 'icon';
                        newFavicon.href = faviconUrl;
                        document.head.appendChild(newFavicon);
                    }
                }

                // Update Meta Description
                if (response.data.description) {
                    let metaDescription = document.querySelector("meta[name='description']");
                    if (!metaDescription) {
                        metaDescription = document.createElement('meta');
                        metaDescription.name = 'description';
                        document.head.appendChild(metaDescription);
                    }
                    metaDescription.content = response.data.description;
                }
            }
            setLoading(false);
        };

        fetchSettings();
    }, []);

    return (
        <SiteSettingsContext.Provider value={{ settings, loading }}>
            {children}
        </SiteSettingsContext.Provider>
    );
};
