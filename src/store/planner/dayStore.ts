// stores/useYearStore.ts
import axios from 'axios';
import { create } from 'zustand';

interface DayState {
    dayMap: { [weekId: string]: any[] }
    isLoading: boolean;
    openStates: { [weekId: string]: boolean }
    toggleDayOpen: (weekId: string) => void;
    isDescription: boolean;
    createDay: (title: string | undefined, description: string | undefined, weekId: string) => Promise<void>;
    getDay: (weekId: string) => Promise<void>
}


export const useDayStore = create<DayState>((set, get) => ({
    dayMap: {},
    isLoading: false,
    openStates: {},
    toggleDayOpen: (weekId: string) => {
        const prev = get().openStates;
        set({
            openStates: {
                ...prev,
                [weekId]: !prev[weekId],
            },
        });
    },
    isDescription: false,

    createDay: async (title: string | undefined, description: string | undefined, weekId: string) => {

        try {
            set({ isLoading: true });
            const response = await axios.post('/api/planner/day', {
                title: title,
                description: description,
                weekId: weekId
            });

            const data = await response.data;
            set((state) => ({
                dayMap: {
                    ...state.dayMap,
                    [weekId]: [...(state.dayMap[weekId] || []), data.data],
                },
            }));
        } catch (error) {
            console.error('Failed to create year:', error);
        } finally {
            set({ isLoading: false });
        }
    },

    getDay: async (weekId: string) => {
        try {
            const response = await axios.get(`/api/planner/day?weekId=${weekId}`);
            const data = await response.data;
            set((state) => ({
                dayMap: {
                    ...state.dayMap,
                    [weekId]: data.data,
                },
            }));
        } catch (error) {
            console.error('Failed to create year:', error);
        }
    }
}));