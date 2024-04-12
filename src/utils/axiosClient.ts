import axios from 'axios';
import { BASE_URL } from '../helpers/constants';

const instance = axios.create({
  baseURL: BASE_URL,
});

export const client = {
  async get<T>(url: string) {
    const response = await instance.get<T>(url);

    return response.data;
  },

  async post<T>(url: string, data: any) {
    const response = await instance.post<T>(url, data);

    return response.data;
  },

  async patch<T>(url: string, data: any) {
    const response = await instance.patch<T>(url, data);

    return response.data;
  },

  async delete(url: string) {
    const response = await instance.delete(url);

    return response.data;
  },
};
