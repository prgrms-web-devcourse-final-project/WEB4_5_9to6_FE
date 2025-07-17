import { axiosInstance } from ".";

export const fetchMyData = async () => {
    const response = await axiosInstance.get("members/info-all");
    return response.data;
};
