import axios from "axios";
import { create } from "zustand";

interface YearState {
    yearData: any[];
    isLoading: boolean;
    isDescription: boolean;
    createYear: (title: string, description: string, planId: string) => Promise<void>;
    getYear: (planId: string) => Promise<void>
}

export const useYearStore = create<YearState>((set) => ({
    yearData: [],
    isLoading: false,
    isDescription: false,

    createYear: async (title: string, description: string, planId: string) => {

        try {
            set({ isLoading: true });
            const response = await axios.post('/api/planner/year', {
                title: title,
                description: description,
                planId: planId
            });

            const data = await response.data;
            const newYear = data.data;
            console.log(newYear)
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

    getYear: async (planId: string) => {
        try {
            const response = await axios.get(`/api/planner/year?planId=${planId}`)
            const data = await response.data;
            set({ yearData: data.years })
        } catch (error) {
            console.error('Failed to create year:', error);
        }
    }
}));