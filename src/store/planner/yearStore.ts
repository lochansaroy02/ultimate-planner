import axios from "axios";
import { create } from "zustand";

interface YearState {
    yearData: any[];
    isLoading: boolean;
    isDescription: boolean;
    createYear: (title: string, description: string, userId: string) => Promise<void>;
    getYear: (userId: string) => Promise<void>
}

export const useYearStore = create<YearState>((set) => ({
    yearData: [],
    isLoading: false,
    isDescription: false,

    createYear: async (title: string, description: string, userId: string) => {

        try {
            set({ isLoading: true });
            const response = await axios.post('/api/planner/year', {
                title: title,
                description: description,
                userId: userId
            });
            const data = await response.data;
            const newYear = await data.data;
            set((state) => ({
                isDescription: true,
                yearData: [...(state.yearData || []), newYear]
            }))
        } catch (error) {
            console.error('Failed to create year:', error);
        } finally {
            set({ isLoading: false });
        }
    },

    getYear: async (userId: string) => {
        try {
            const response = await axios.get(`/api/planner/year?userId=${userId}`)
            const data = response.data;
            set({ yearData: data.years })
        } catch (error) {
            console.error('Failed to create year:', error);
        }
    }
}));