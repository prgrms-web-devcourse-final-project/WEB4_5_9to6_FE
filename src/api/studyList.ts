import { axiosInstance } from ".";

// study list
export const fetchStudyList = async () => {
    const response = await axiosInstance.get("studies/1");
    console.log("스터디 정보", response.data);
    return response.data;
};

export const fetchStudyMemberList = async () => {
    const response = await axiosInstance.get("studies/1/members");
    console.log("스터디 멤버 정보", response.data);
    return response.data;
};

export const fetchStudyGoals = async () => {
    const response = await axiosInstance.get("studies/1/goals");
    console.log("스터디 목표", response.data);
    return response.data;
};
