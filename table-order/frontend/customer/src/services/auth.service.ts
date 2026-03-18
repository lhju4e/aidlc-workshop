import api from './api';
import type { AuthResponse, SetupCredentials } from '../types';

export async function loginTable(creds: SetupCredentials): Promise<AuthResponse> {
  const { data } = await api.post<AuthResponse>('/auth/table/login', creds);
  return data;
}
