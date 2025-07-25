import { create } from "zustand";

interface ChatStore {
    messages: Chat[];
    addMessage: (msg: Chat) => void;
    setMessages: (msg: Chat[]) => void;
    hasNext: boolean;
    appendMessages: (msgs: Chat[]) => void;
    setHasNext: (value: boolean) => void;
    isLoading: boolean;
    setIsLoading: (value: boolean) => void;
}
interface ParticipantStore {
    participants: ChatMember[];
    setParticipants: (members: ChatMember[]) => void;
}

// 메세지
export const useChatStore = create<ChatStore>((set) => ({
    messages: [],
    hasNext: true,
    isLoading: false,
    addMessage: (msg) =>
        set((state) => ({ messages: [...state.messages, msg] })),
    setMessages: (msgs) => set({ messages: msgs }),
    setHasNext: (value) => set({ hasNext: value }),
    appendMessages: (msgs) =>
        set((state) => ({ messages: [...msgs, ...state.messages] })),
    setIsLoading: (value) => set({ isLoading: value }),
}));

// 채팅 참여자
export const useParticipantStore = create<ParticipantStore>((set) => ({
    participants: [],
    setParticipants: (members) => set({ participants: [...members] }),
}));
