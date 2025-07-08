import axios from "axios";
import { create } from "zustand";

interface YearState {
    yearData: null;
    isLoading: boolean;
    isDescription: boolean;
    createYear: (description: string) => Promise<void>;
    getYear: () => Promise<void>
}

export const useYearStore = create<YearState>((set) => ({
    yearData: null,
    isLoading: false,
    isDescription: false,

    createYear: async (description: string) => {
        const currentYear = new Date().getFullYear().toString();

        try {
            set({ isLoading: true });
            const response = await axios.post('/api/plan/year', {
                title: currentYear,
                description: description,
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

    getYear: async () => {
        try {
            const response = await axios.get("/api/plan/year");
            const data = await response.data;
            set({ yearData: data })
        } catch (error) {
            console.error('Failed to create year:', error);
        }
    }
}));