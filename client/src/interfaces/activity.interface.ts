export interface Activity {
    _id: string;
    title: string;
    description: string;
    date: string;
    status: 'pending' | 'completed';
    targetField: string;
}