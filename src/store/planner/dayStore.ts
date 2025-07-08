// stores/useYearStore.ts
import axios from 'axios';
import { create } from 'zustand';

interface DayState {
    dayData: null;
    isLoading: boolean;
    isDescription: boolean;
    createDay: (title: string, description: string, weekId: string) => Promise<void>;
    getDay: (weekId: string) => Promise<void>
}


export const useWeekStore = create<DayState>((set) => ({
    dayData: null,
    isLoading: false,
    isDescription: false,

    createDay: async (title: string, description: string, weekId: string) => {

        try {
            set({ isLoading: true });
            const response = await axios.post('/api/plan/month', {
                title: title,
                description: description,
                weekId: weekId
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

    getDay: async (weekId: string) => {
        try {
            const response = await axios.get(`/api/planner/plan?userId=${weekId}`);
            const data = await response.data;
            set({ dayData: data })
        } catch (error) {
            console.error('Failed to create year:', error);
        }
    }
}));