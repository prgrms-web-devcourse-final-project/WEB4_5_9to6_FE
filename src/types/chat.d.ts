interface Chat {
    chatId: number;
    receiverId: number | null;
    receiverNickname: string;
    senderId: number;
    senderNickname: string;
    content: string;
    createAt: string;
    chatMember: ChatMember[];
}

interface ChatMember {
    memberId: number;
    nickname: string;
    status: "ONLINE";
}

declare module "sockjs-client" {
    import sockjs from "sockjs-client";
    export default sockjs;
}
