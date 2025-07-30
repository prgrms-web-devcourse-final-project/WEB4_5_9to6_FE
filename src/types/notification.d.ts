interface Alarm {
    alarmId: number;
    alarmRecipientId: 64;
    type: "APPLY" | "RESULT";
    resultStatus: "ACCEPT" | "REJECT" | null;
    message: string;
    isRead: boolean;
    sentAt: string;
    senderId: number;
    senderNickname: string;
    senderAvatarImage: string;
    studyId: number;
}
