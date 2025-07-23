import { axiosInstance } from "./index";

// 해당 스터디의 14일간의 채팅내역
export const fetchChatHistory = async (stuidId: number) => {
    const response = await axiosInstance(`chats/${stuidId}/history`);
    return response.data.data;
};
