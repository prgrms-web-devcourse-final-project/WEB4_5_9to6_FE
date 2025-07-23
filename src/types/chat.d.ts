interface Chat {
    chatId?: number;
    receiverId: number;
    receiverNickname: string;
    senderId: number;
    senderNickname: string;
    content: string;
    createdAt?: string;
    chatMember?: ChatMember[];
}

interface ChatMember {
    memberId: number;
    nickName: string;
    status: "ONLINE";
}

declare module "sockjs-client" {
    import sockjs from "sockjs-client";
    export default sockjs;
}
