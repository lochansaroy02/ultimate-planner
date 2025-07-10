// stores/useYearStore.ts
import axios from 'axios';
import { create } from 'zustand';

interface WeekState {
    weekMap: { [monthId: string]: any[] };
    isLoading: boolean;
    openStates: { [monthId: string]: boolean };
    toggleWeekOpen: (monthId: string) => void;
    isDescription: boolean;
    createWeek: (title: string, description: string, monthId: string) => Promise<void>;
    getWeek: (monthId: string) => Promise<void>
}


export const useWeekStore = create<WeekState>((set, get) => ({
    weekMap: {},
    isLoading: false,
    openStates: {},
    toggleWeekOpen: (yearId: string) => {
        const prev = get().openStates;
        set({
            openStates: {
                ...prev,
                [yearId]: !prev[yearId],
            },
        });
    },
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

    getWeek: async (monthId: string) => {
        try {
            set({ isLoading: true });
            const res = await axios.get(`/api/planner/week?monthId=${monthId}`);
            const data = await res.data;

            set((state) => ({
                weekMap: {
                    ...state.weekMap,
                    [monthId]: data.data,
                },
            }));
        } catch (err) {
            console.error("Failed to fetch weeks", err);
        } finally {
            set({ isLoading: false });
        }
    },
}));











