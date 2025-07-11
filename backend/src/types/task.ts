export interface Task {
    id?: number;
    title: string;
    description: string;
    done?: boolean;
    user_id: number;
    created_at?: string;
}