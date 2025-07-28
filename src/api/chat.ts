import { axiosInstance } from "./index";

// 해당 스터디의 14일간의 채팅내역
export const fetchChatHistory = async (
    studyId: number,
    cursorCreatedAt?: string | null,
    lastChatId?: number | null,
    pageSize?: number,
) => {
    const response = await axiosInstance(`chats/${studyId}/history`, {
        params: {
            cursorCreatedAt: cursorCreatedAt ?? undefined,
            lastChatId: lastChatId ?? undefined,
            pageSize,
        },
    });
    console.log("히스토리 응답값", response.data);
    return response.data.data;
};
