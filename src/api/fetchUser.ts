import { axiosInstance } from "./index";

export const fetchMyData = async () => {
    const response = await axiosInstance.get("members/info-all");
    return response.data.data;
};

export const fetchStudyMember = async () => {
    const response = await axiosInstance.get("members/23/info");
    console.log(response.data.data);
    return response.data.data;
};
