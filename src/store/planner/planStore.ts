import axios from "axios";
import { create } from "zustand";


interface planState {
    planData: null;
    isLoading: boolean;
    isPlan: boolean;
    createPlan: () => Promise<void>;
    getPlan: (userId: string) => Promise<void>
}

export const usePlanStore = create<planState>((set) => ({

    planData: null,
    isLoading: false,
    isPlan: false,

    createPlan: async () => {

        try {
            const response = await axios.post('/api/planner/plan', {
                userId: "53f9a337-7f4f-4df5-b3e0-2606eaf0d04d",
            });
            const data = await response.data
            console.log(data)
        } catch (error) {
            console.error(error);
        }
    },
    getPlan: async (userId: string) => {
        try {
            const response = await axios(`/api/planner/plan?userId=${userId}`)
            const data = response.data;
            set({ planData: data })
        } catch (error) {
            console.error('Failed to create year:', error);
        } finally {
            set({ isLoading: true })
        }
    }
}
))