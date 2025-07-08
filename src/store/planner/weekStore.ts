// stores/useYearStore.ts
import axios from 'axios';
import { create } from 'zustand';










interface WeekState {
    weekData: null;
    isLoading: boolean;
    isDescription: boolean;
    createWeek: (title: string, description: string, monthId: string) => Promise<void>;
    getWeek: () => Promise<void>
}


export const useWeekStore = create<WeekState>((set) => ({
    weekData: null,
    isLoading: false,
    isDescription: false,

    createWeek: async (title: string, description: string, monthId: string) => {

        try {
            set({ isLoading: true });
            const response = await axios.post('/api/plan/month', {
                title: title,
                description: description,
                monthId: monthId
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

    getWeek: async () => {
        try {
            const response = await axios.get("/api/plan/year");
            const data = await response.data;
            set({ weekData: data })
        } catch (error) {
            console.error('Failed to create year:', error);
        }
    }
}));











