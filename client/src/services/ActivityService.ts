
import { Activity } from '@/interfaces/activity.interface';
import axios from 'axios';


const ActivityService = {
    getActivities: async (authToken: string): Promise<Activity[]> => {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/activities`,
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
    getActivityById: async (activityId: string, authToken: string): Promise<Activity> => {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/activities/${activityId}`,
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
    createActivity: async (activity: any, authToken: string): Promise<Activity> => {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/activities`, activity,
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

    updateActivity: async (_id: string, activity: any, authToken: string): Promise<Activity> => {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/activities/${_id}`, activity,
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
    deleteActivity: async (activityId: string, authToken: string): Promise<Activity> => {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/activities/${activityId}`,
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

export default ActivityService;