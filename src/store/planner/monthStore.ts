import axios from 'axios';
import { create } from 'zustand';







interface MonthState {
    monthData: null;
    isLoading: boolean;
    isDescription: boolean;
    createMonth: (title: string, description: string, yearId: string) => Promise<void>;
    getMonth: () => Promise<void>
}


export const useMonthStore = create<MonthState>((set) => ({
    monthData: null,
    isLoading: false,
    isDescription: false,

    createMonth: async (title: string, description: string, yearId: string) => {

        try {
            set({ isLoading: true });
            const response = await axios.post('/api/plan/month', {
                title: title,
                description: description,
                yearId: yearId
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

    getMonth: async () => {
        try {
            const response = await axios.get("/api/plan/year");
            const data = await response.data;
            set({ monthData: data })
        } catch (error) {
            console.error('Failed to create year:', error);
        }
    }
}));