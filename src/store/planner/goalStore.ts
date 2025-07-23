import axios from "axios";
import { create } from "zustand";

interface GoalState {
    goalData: any;
    isLoading: boolean;
    isGoal: boolean;
    createGoal: (
        title: string,
        description: string,
        isCompleted: boolean,
        yearId?: string,
        monthId?: string,
        weekId?: string,
        dayId?: string
    ) => Promise<void>;
    getGoal: (
        yearId?: string,
        monthId?: string,
        weekId?: string,
        dayId?: string
    ) => Promise<void>;
}

export const useGoalStore = create<GoalState>((set) => ({
    goalData: null,
    isLoading: false,
    isGoal: false,

    createGoal: async (
        title,
        description,
        isCompleted,
        yearId,
        monthId,
        weekId,
        dayId
    ) => {
        try {
            const response = await axios.post('/api/planner/goal', {
                title,
                description,
                isCompleted,
                yearId,
                monthId,
                weekId,
                dayId,
            });
            const data = response.data;

        } catch (error) {
            console.error("Create Goal Error:", error);
        }
    },

    getGoal: async (yearId, monthId, weekId, dayId) => {
        try {
            const queryParams = new URLSearchParams();

            if (yearId) queryParams.append("yearId", yearId);
            if (monthId) queryParams.append("monthId", monthId);
            if (weekId) queryParams.append("weekId", weekId);
            if (dayId) queryParams.append("dayId", dayId);

            const response = await axios.get(`/api/planner/goal?${queryParams.toString()}`);
            const data = response.data;
            set({ goalData: data, isGoal: true });
        } catch (error) {
            console.error("Get Goal Error:", error);
        } finally {
            set({ isLoading: false });
        }
    },
}));
