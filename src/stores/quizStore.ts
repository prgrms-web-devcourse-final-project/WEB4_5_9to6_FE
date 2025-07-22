import { create } from "zustand";

interface QuizStore {
    score: number;
    setScore: (score: number) => void;
    answerSheet: number[];
    setAnswerSheet: (sheet: number[]) => void;
    addAnswer: (a: number) => void;
}

export const useQuizResult = create<QuizStore>((set) => ({
    score: 0,
    setScore: (score) => set({ score }),
    answerSheet: [] as number[],
    setAnswerSheet: (sheet: number[]) => set({ answerSheet: sheet }),
    addAnswer: (a) =>
        set((state) => ({ answerSheet: [...state.answerSheet, a] })),
}));
