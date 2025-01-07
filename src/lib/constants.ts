// Site URL configuration for authentication redirects
export const SITE_URL = import.meta.env.PROD 
  ? import.meta.env.VITE_SITE_URL || 'https://youarethecatalyst.netlify.app/'
  : 'http://localhost:5173';

if (import.meta.env.PROD && !import.meta.env.VITE_SITE_URL) {
  console.warn('VITE_SITE_URL is not set in production. Using default URL.');
}