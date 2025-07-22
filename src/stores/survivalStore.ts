import { create } from "zustand";

export const useSurvivalStore = create<{
    study: StudyInfo | null;
    setStudy: (date: StudyInfo) => void;
}>((set) => ({
    study: null,
    setStudy: (data) => set({ study: data }),
}));
