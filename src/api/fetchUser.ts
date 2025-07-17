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

export const fetchLeaderAvatar = async (id: number) => {
    const response = await axiosInstance.get(`studies/${id}/members`);
    console.log("리더녀석", response.data.data);
    const members: StudyMember[] = response.data.data;

    const leader = members.find((member) => member.role === "LEADER");
    if (!leader) return null;

    return leader.profileImage;
};
