import { create } from "zustand";

interface AnimationState {
    animationClass: string;
    changeClass: (className: string) => void;
}

export const useAnimationStore = create<AnimationState>((set) => ({
    animationClass: "",
    changeClass: (className: string) => set({ animationClass: className }),
}));
