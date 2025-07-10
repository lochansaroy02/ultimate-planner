// store/toggleStore.ts
import { create } from 'zustand';

interface ToggleStore {
    openStates: { [id: string]: boolean };
    toggleOpen: (id: string) => void;
    isOpen: (id: string) => boolean;
}

export const useToggleStore = create<ToggleStore>((set, get) => ({
    openStates: {},
    toggleOpen: (id) =>
        set((state) => ({
            openStates: {
                ...state.openStates,
                [id]: !state.openStates[id],
            },
        })),
    isOpen: (id) => !!get().openStates[id],
}));
