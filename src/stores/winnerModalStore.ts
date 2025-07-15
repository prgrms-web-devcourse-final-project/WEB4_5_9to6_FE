import { create } from "zustand";

interface WinnerModalState {
    isOpen: boolean;
    openModal: () => void;
    closeModal: () => void;
}

export const useWinnerModalStore = create<WinnerModalState>((set) => ({
    isOpen: false,
    openModal: () => set({ isOpen: true }),
    closeModal: () => set({ isOpen: false }),
}));
