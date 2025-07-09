import { create } from "zustand";

interface FilterModalState {
    isOpen: boolean;
    openModal: () => void;
    closeModal: () => void;
}

export const useFilterModalStore = create<FilterModalState>((set) => ({
    isOpen: false,
    openModal: () => set({ isOpen: true }),
    closeModal: () => set({ isOpen: false }),
}));
