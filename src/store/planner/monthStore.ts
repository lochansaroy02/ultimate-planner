// store/planner/monthStore.ts
import axios from 'axios';
import { create } from 'zustand';

interface MonthState {
    monthMap: { [yearId: string]: any[] }; // 💡 per-year month data
    isLoading: boolean;
    openStates: { [yearId: string]: boolean };
    toggleMonthOpen: (yearId: string) => void;
    isDescription: boolean;
    createMonth: (title: string | undefined, description: string | undefined, yearId: string) => Promise<void>;
    getMonth: (yearId: string) => Promise<void>;
}

export const useMonthStore = create<MonthState>((set, get) => ({
    monthMap: {},
    openStates: {},
    isLoading: false,
    isDescription: false,

    toggleMonthOpen: (yearId: string) => {
        const prev = get().openStates;
        set({
            openStates: {
                ...prev,
                [yearId]: !prev[yearId],
            },
        });
    },

    createMonth: async (title: string | undefined, description: string | undefined, yearId: string) => {
        try {
            set({ isLoading: true });
            const response = await axios.post('/api/planner/month', {
                title,
                description,
                yearId,
            });
            const data = await response.data
            console.log(data)
            set((state) => ({
                monthMap: {
                    ...state.monthMap,
                    [yearId]: [...(state.monthMap[yearId] || []), data.data], // Append new month
                },
            }));
            set({ isDescription: true });
        } catch (error) {
            console.error('Failed to create month:', error);
        } finally {
            set({ isLoading: false });
        }
    },

    getMonth: async (yearId: string) => {
        try {
            const response = await axios.get(`/api/planner/month?yearId=${yearId}`);
            const data = await response.data;

            set((state) => ({
                monthMap: {
                    ...state.monthMap,
                    [yearId]: data.data, // ✅ Save months for specific year
                },
            }));
        } catch (error) {
            console.error('Failed to get months:', error);
        }
    },
}));
