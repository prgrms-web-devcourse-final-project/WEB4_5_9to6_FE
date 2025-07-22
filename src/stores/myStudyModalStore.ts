import { create } from "zustand";

interface MyStudyModalState {
    isOpen: boolean;
    studyIndex: number;
    openModal: () => void;
    closeModal: () => void;
    changeIndex: (index: number) => void;
}

export const useMyStudyModalStore = create<MyStudyModalState>((set) => ({
    isOpen: false,
    studyIndex: 0,
    openModal: () => set({ isOpen: true }),
    closeModal: () => set({ isOpen: false }),
    changeIndex: (index) => set({ studyIndex: index }),
}));
