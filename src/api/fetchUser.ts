import { axiosInstance } from ".";

// 리더 아바타 추출하는 api
export const fetchLeaderAvatar = async (id: number) => {
    const response = await axiosInstance.get(`studies/${id}/members`);
    const members: StudyMember[] = response.data.data;

    const leader = members.find((member) => member.role === "LEADER");
    console.log("리더녀석", leader?.profileImage);

    if (!leader) return null;

    return leader.profileImage;
};
