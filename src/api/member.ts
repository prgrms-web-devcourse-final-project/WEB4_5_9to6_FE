import { axiosInstance } from "./index";

/* 내 정보 조회 */
export const fetchMyInfo = async () => {
    const response = await axiosInstance.get("members/info-all");
    return response.data;
};

export const fetchMemeberPage = async (memberId: number) => {
    const response = await axiosInstance.get(`members/${memberId}`);
    return response.data;
};

export const fetchMemeberInfo = async (memberId: number) => {
    const response = await axiosInstance.get(`members/${memberId}/info`);
    return response.data;
};
