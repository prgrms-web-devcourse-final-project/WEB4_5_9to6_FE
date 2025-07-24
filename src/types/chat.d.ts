interface Chat {
    chatId?: number;
    receiverId: number;
    receiverNickname: string;
    senderId: number;
    senderNickname: string;
    image?: string;
    content: string;
    createdAt?: string;
    chatMember?: ChatMember[];
}

interface ChatMember {
    memberId: number;
    nickname: string;
    image: string;
    status: "ONLINE";
    email?: string;
}

declare module "sockjs-client" {
    import sockjs from "sockjs-client";
    export default sockjs;
}
