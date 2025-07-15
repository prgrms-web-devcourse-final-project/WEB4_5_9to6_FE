import { axiosInstance } from "./index";

interface StudyType {
    studyType: "SURVIVAL" | "DEFAULT";
}
// 서바이벌 스터디
export const fetchSurvStudyList = async () => {
    const response = await axiosInstance.post("studies/search");
    const survivalStudy = response.data.filter(
        (study: StudyType) => study.studyType === "SURVIVAL",
    );
    return survivalStudy;
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

export const fetchStudyList = async () => {
    const response = await axiosInstance.get("studies/1");
    const survivalStudy = response.data;
    return survivalStudy;
};
