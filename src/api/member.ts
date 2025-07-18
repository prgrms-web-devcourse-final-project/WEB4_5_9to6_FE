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

export const changeNickName = async (memberId: number, nickname: string) => {
    const response = await axiosInstance.put(`members/${memberId}/info`, {
        nickname,
    });
    return response.data;
};

export const verfiyPassWord = async (memberId: number, password: string) => {
    const response = await axiosInstance.post(
        `members/${memberId}/password/verify`,
        {
            password,
        },
    );
    return response.data.method;
};

export const changePassWord = async (
    memberId: number,
    currentPassword: string,
    newPassword: string,
    newPasswordCheck: string,
) => {
    const response = await axiosInstance.put(`members/${memberId}/info`, {
        currentPassword,
        newPassword,
        newPasswordCheck,
    });
    return response.data;
};
