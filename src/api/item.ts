import { axiosInstance } from ".";

export const fetchRewardItems = async () => {
    const response = await axiosInstance.get("reward-items");
    return response.data.data;
};

export const fetchOwnItems = async () => {
    const response = await axiosInstance.get("reward-items/own-items");
    return response.data.data;
};
