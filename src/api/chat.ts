import { axiosInstance } from "./index";

// 해당 스터디의 14일간의 채팅내역
export const fetchChatHistory = async (studyId: number) => {
    const response = await axiosInstance(`chats/${studyId}/history`);
    return response.data.data;
};
