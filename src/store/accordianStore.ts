import { create } from "zustand"

type IsOpenStore = {
    isOpen: boolean
    setIsOpen: (isOpen: boolean) => void,
    toggleIsOpen: () => void
}

export const useIsOpenStore = create<IsOpenStore>((set) => ({
    isOpen: false,
    setIsOpen: (isOpen: boolean) => set(() => ({ isOpen })),
    toggleIsOpen: () => set((state) => ({ isOpen: !state.isOpen })),
}))