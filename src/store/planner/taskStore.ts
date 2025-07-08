// stores/useYearStore.ts
import axios from 'axios';
import { create } from 'zustand';

interface TaskState {
    taskData: null;
    isLoading: boolean;
    isDescription: boolean;
    createTask: (title: string, description: string, isCompleted: boolean, dayId: string) => Promise<void>;
    getTask: (dayId: string) => Promise<void>
}


export const useWeekStore = create<TaskState>((set) => ({
    taskData: null,
    isLoading: false,
    isDescription: false,

    createTask: async (title: string, description: string, isCompleted: boolean, dayId: string) => {

        try {
            set({ isLoading: true });
            const response = await axios.post('/api/plan/month', {
                title: title,
                description: description,
                isCompleted: isCompleted,
                dayId: dayId
            });

            const data = await response.data;
            console.log(data)
            set({
                isDescription: true,
            });
        } catch (error) {
            console.error('Failed to create year:', error);
        } finally {
            set({ isLoading: false });
        }
    },

    getTask: async (dayId: string) => {
        try {
            const response = await axios.get(`/api/planner/plan?userId=${dayId}`);
            const data = await response.data;
            set({ taskData: data })
        } catch (error) {
            console.error('Failed to create year:', error);
        }
    }
}));