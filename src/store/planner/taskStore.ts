// stores/useYearStore.ts
import axios from 'axios';
import { create } from 'zustand';

interface TaskState {
    taskMap: { [dayId: string]: any[] };
    openStates: { [dayId: string]: boolean }
    toggleDayOpen: (dayId: string) => void;
    isLoading: boolean;
    isDescription: boolean;
    createTask: (title: string | undefined, description: string | undefined, isCompleted: boolean, dayId: string) => Promise<void>;
    getTask: (dayId: string) => Promise<void>
}


export const useTaskStore = create<TaskState>((set, get) => ({
    taskMap: {},
    isLoading: false,
    isDescription: false,
    toggleDayOpen: (dayId: string) => {
        const prev = get().openStates;
        set({
            openStates: {
                ...prev,
                [dayId]: !prev[dayId],
            },
        });
    },
    openStates: {},

    createTask: async (title: string | undefined, description: string | undefined, isCompleted: boolean, dayId: string) => {

        try {
            set({ isLoading: true });
            const response = await axios.post('/api/planner/task', {
                title: title,
                description: description,
                isCompleted: isCompleted,
                dayId: dayId
            });

            const data = await response.data;
            set((state) => ({
                taskMap: {
                    ...state.taskMap,
                    [dayId]: [...(state.taskMap[dayId] || []), data.data],
                },
            }));
        } catch (error) {
            console.error('Failed to create year:', error);
        } finally {
            set({ isLoading: false });
        }
    },

    getTask: async (dayId: string) => {
        try {
            const response = await axios.get(`/api/planner/task?dayId=${dayId}`);
            const data = await response.data;
            set((state) => ({
                taskMap: {
                    ...state.taskMap,
                    [dayId]: data.data,
                },
            }));
        } catch (error) {
            console.error('Failed to create year:', error);
        }
    }
}));