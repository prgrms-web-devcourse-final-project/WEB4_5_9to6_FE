import { create } from "zustand";

interface WinnerModalState {
    isOpen: boolean;
    openModal: (week: number) => void;
    closeModal: () => void;
}

export const useWinnerModalStore = create<WinnerModalState>((set) => ({
    isOpen: false,
    openModal: (week) => {
        if (week === 4) {
            set({ isOpen: true });
        }
    },
    closeModal: () => set({ isOpen: false }),
}));
