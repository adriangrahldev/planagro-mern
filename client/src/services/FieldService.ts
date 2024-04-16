// services/FieldService.ts

import { Field } from '@/interfaces/field.interface';
import axios from 'axios';


const FieldService = {
    getFields: async (authToken: string): Promise<Field[]> => {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/fields`,
                    {
                        withCredentials: true,
                        headers: {
                            Authorization: `Bearer ${authToken}`,
                        },
                    }
                );
                const data = await response.data;
                resolve(data);
            } catch (error) {
                reject(error);
            }
        });
    },
    getFieldById: async (fieldId: string, authToken: string): Promise<Field> => {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/fields/${fieldId}`,
                    {
                        withCredentials: true,
                        headers: {
                            Authorization: `Bearer ${authToken}`,
                        },
                    }
                );
                const data = await response.data;
                resolve(data);
            } catch (error) {
                reject(error);
            }
        });
    },
    createField: async (field: any, authToken: string): Promise<Field> => {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/fields`, field,
                    {
                        withCredentials: true,
                        headers: {
                            Authorization: `Bearer ${authToken}`,
                        },
                    }
                );
                const data = await response.data;
                resolve(data);
            } catch (error) {
                reject(error);
            }
        });
    },

    updateField: async (_id: string, field: any, authToken: string): Promise<Field> => {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/fields/${_id}`, field,
                    {
                        withCredentials: true,
                        headers: {
                            Authorization: `Bearer ${authToken}`,
                        },
                    }
                );
                const data = await response.data;
                resolve(data);
            } catch (error) {
                reject(error);
            }
        });
    },
    deleteField: async (fieldId: string, authToken: string): Promise<Field> => {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/fields/${fieldId}`,
                    {
                        withCredentials: true,
                        headers: {
                            Authorization: `Bearer ${authToken}`,
                        },
                    }
                );
                const data = await response.data;
                resolve(data);
            } catch (error) {
                reject(error);
            }
        });
    },

};

export default FieldService;