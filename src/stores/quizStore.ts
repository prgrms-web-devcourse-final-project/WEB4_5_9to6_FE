import { create } from "zustand";

interface QuizStore {
    score: number;
    setScore: (score: number) => void;
}

export const useQuizResult = create<QuizStore>((set) => ({
    score: 0,
    setScore: (score) => set({ score }),
}));
