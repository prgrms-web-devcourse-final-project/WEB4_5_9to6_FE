import { axiosInstance } from "./index";

interface StudyType {
    studyType: "SURVIVAL" | "DEFAULT";
}
// 서바이벌 스터디
export const fetchSurvStudyList = async () => {
    const response = await axiosInstance.get("studies/1");
    const survivalStudy = response.data.filter(
        (study: StudyType) => study.studyType === "SURVIVAL",
    );
    return survivalStudy;
};

export const myStudyList = async (id: number) => {
    const response = await axiosInstance.get(`members/${id}/studies`);
    console.log(response.data.data);
    return response.data.data;
};
