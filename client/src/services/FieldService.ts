// services/FieldService.ts

import { Field } from '@/interfaces/field.interface';
import axios from 'axios';


const FieldService = {
    getFields: async (): Promise<Field[]> => {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/fields`);
                const data = await response.data;
                resolve(data);
            } catch (error) {
                reject(error);
            }
        });
    },
};

export default FieldService;