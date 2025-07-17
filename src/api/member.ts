import { axiosInstance } from "./index";

/* 내 정보 조회 */
export const fetchMyInfo = async () => {
    const response = await axiosInstance.get("members/info-all");
    return response.data;
};
