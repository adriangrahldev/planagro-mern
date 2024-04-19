import axios from "axios";


export const DashboardService = {
    getDashboardData: (authToken: string):  Promise<any> => {
        return new Promise((resolve, reject) => {
            const response = axios.get(`${process.env.NEXT_PUBLIC_API_URL}/dashboard`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authToken}`,
                },
            })
            .then((response) => {
                resolve(response.data);
            })
            .catch((error) => {
                reject(error);
            });
        });
    }
}