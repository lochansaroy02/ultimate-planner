// stores/useYearStore.ts
import axios from 'axios';
import { create } from 'zustand';

interface TaskState {
    taskMap: { [dayId: string]: any[] };
    allTasks: any[]
    openStates: { [dayId: string]: boolean }
    toggleDayOpen: (dayId: string) => void;
    isLoading: boolean;
    isDescription: boolean;
    createTask: (title: string | undefined, description: string | undefined, isCompleted: boolean, dayId: string) => Promise<void>;
    updateTask: (taskId: string, dayId: string) => Promise<void>
    getTask: (dayId: string) => Promise<void>
    getAllTask: () => Promise<void>
}


export const useTaskStore = create<TaskState>((set, get) => ({
    taskMap: {},
    allTasks: [],
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
    updateTask: async (taskId: string, dayId: string) => {
        try {
            const response = await axios.patch(`/api/planner/task?taskId=${taskId}`);
            const updatedTask = response.data.data;

            set((state) => ({
                taskMap: {
                    ...state.taskMap,
                    [dayId]: (state.taskMap[dayId] || []).map(task =>
                        task.id === updatedTask.id ? updatedTask : task
                    ),
                },
            }));
            await get().getAllTask();
        } catch (error) {
            console.error('Failed to update task:', error);
        }
    },


    getTask: async (dayId: string) => {
        try {
            const response = await axios.get(`/api/planner/task?dayId=${dayId}`);
            const data = await response.data;
            set({
                allTasks: [data.data] // Replace with fresh array
            });
        } catch (error) {
            console.error('Failed to create year:', error);
        }
    },
    getAllTask: async () => {
        try {
            const response = await axios.get(`/api/planner/task/all`);
            const data = await response.data;
            set((state) => ({
                allTasks: [...(state.allTasks || []), data.data]
            }))
        } catch (error) {
            console.error('Failed to create year:', error);
        }
    }
}));