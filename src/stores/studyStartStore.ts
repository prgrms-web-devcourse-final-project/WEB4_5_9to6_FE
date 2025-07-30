import { create } from "zustand";

interface StudyState {
    isStart: boolean;
    setIsStart: (val: boolean) => void;
    pause: boolean;
    setPause: (val: boolean) => void;
    seconds: number;
    setSeconds: (val: number) => void;
}

export const studyStartStore = create<StudyState>((set) => ({
    isStart: false,
    setIsStart: (val) => set({ isStart: val }),
    pause: true,
    setPause: (val) => set({ pause: val }),
    seconds: 0,
    setSeconds: (val) => set({ seconds: val }),
}));
