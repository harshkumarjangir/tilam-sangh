
export const getAssetUrl = (path) => {
    if (!path) return '';
    if (path.startsWith('http://') || path.startsWith('https://') || path.startsWith('data:')) {
        return path;
    }

    // Get base URL from environment, fallback to localhost
    // Ensure no trailing slash
    const baseUrl = (import.meta.env.VITE_API_URL || 'http://localhost:5000/api').replace(/\/$/, '');

    // Ensure path has leading slash
    const cleanPath = path.startsWith('/') ? path : `/${path}`;

    // Map legacy /assets/ path to backend /uploads/media/
    if (cleanPath.startsWith('/assets/')) {
        return `${baseUrl}/uploads/media${cleanPath.substring(7)}`;
    }

    return `${baseUrl}${cleanPath}`;
};
