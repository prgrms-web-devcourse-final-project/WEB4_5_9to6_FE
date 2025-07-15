import { axiosInstance } from "./index";

export const fetchMyData = async () => {
    const response = await axiosInstance.get("members/info-all");
    return response.data.data;
};
