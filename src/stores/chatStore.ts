import { create } from "zustand";

interface ChatStore {
    messages: Chat[];
    addMessage: (msg: Chat) => void;
    setMessages: (msg: Chat[]) => void;
}
interface ParticipantStore {
    participants: ChatMember[];
    setParticipants: (members: ChatMember[]) => void;
}

// 메세지
export const useChatStore = create<ChatStore>((set) => ({
    messages: [],
    addMessage: (msg) =>
        set((state) => ({ messages: [...state.messages, msg] })),
    setMessages: (msgs) => set({ messages: msgs }),
}));

// 채팅 참여자
export const useParticipantStore = create<ParticipantStore>((set) => ({
    participants: [],
    setParticipants: (members) => set({ participants: [...members] }),
}));
