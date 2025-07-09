import { create } from "zustand";

interface MyStudyModalState {
    isOpen: boolean;
    openModal: () => void;
    closeModal: () => void;
}

export const useMyStudyModalStore = create<MyStudyModalState>((set) => ({
    isOpen: false,
    openModal: () => set({ isOpen: true }),
    closeModal: () => set({ isOpen: false }),
}));
