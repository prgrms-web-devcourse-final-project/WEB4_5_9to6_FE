import { axiosInstance } from ".";

export const fetchAllTime = async (memberId: number) => {
    const response = await axiosInstance.get(`timer/${memberId}/all-time`);
    return response.data.data;
};
