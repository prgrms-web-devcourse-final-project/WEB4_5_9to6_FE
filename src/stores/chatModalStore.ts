import { create } from "zustand";

interface ChatMemberList {
    isOpen: boolean;
    openModal: () => void;
    closeModal: () => void;
    whisperTarget: number | null;
    setWhisperTarget: (id: number | null) => void;
}

export const useChatMemberList = create<ChatMemberList>((set) => ({
    isOpen: false,
    openModal: () => set({ isOpen: true }),
    closeModal: () => set({ isOpen: false }),
    whisperTarget: null,
    setWhisperTarget: (id) => set({ whisperTarget: id }),
}));
