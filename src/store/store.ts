import { create } from "zustand"

type IsGoalStore = {
    isGoal: boolean
    setIsGoal: (isOpen: boolean) => void,
    toggleIsGoal: () => void
}

export const useIsGoalStore = create<IsGoalStore>((set) => ({
    isGoal: false,
    setIsGoal: (isGoal: boolean) => set(() => ({ isGoal })),
    toggleIsGoal: () => set((state) => ({ isGoal: !state.isGoal })),
}))

export const useIsMonthGoalStore = create((set) => ({
    isMonthGoal: false,
    setIsMonthGoal: (isMonthGoal: boolean) => set(() => ({ isMonthGoal })),
    toggleIsMonthGoal: () => set((state) => ({ isMonthGoal: !state.isGoal })),
}))