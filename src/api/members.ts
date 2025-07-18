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

export const changeNickName = async (nickname: string) => {
    const response = await axiosInstance.put(`members/info`, {
        nickname,
    });
    return response.data;
};

export const verfiyPassWord = async (password: string) => {
    const response = await axiosInstance.post(`members/password/verify`, {
        password,
    });

    return response.data.data.matched;
};

export const changePassWord = async (
    currentPassword: string,
    newPassword: string,
) => {
    const response = await axiosInstance.put(`members/info`, {
        currentPassword,
        newPassword,
    });
    return response.data;
};
