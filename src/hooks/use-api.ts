import { apiClient, FFClient } from '../transport';

export const useApi: () => FFClient = () => apiClient;
