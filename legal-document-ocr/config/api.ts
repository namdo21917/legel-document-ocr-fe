export const API_CONFIG = {
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000',
  version: 'v1',
};

export const getApiUrl = (endpoint: string): string => {
  return `${API_CONFIG.baseURL}/api/${API_CONFIG.version}${endpoint}`;
}; 