import { StudySearchParams } from "@/types/study";
import { axiosInstance } from ".";

// 스터디 정보
export const studyInfo = async (studyId: number) => {
    const res = await axiosInstance.get(`studies/${studyId}`);
    return res.data.data;
};

// 일반 스터디 검색
export const studySearch = async ({
    page,
    size,
    category,
    region,
    status,
    name,
}: StudySearchParams) => {
    const res = await axiosInstance.post("studies/search", {
        page,
        size,
        category,
        region,
        status,
        name,
    });
    // console.log(res.data);
    return res.data.data;
};
//스터디 멤버 정보
export const studyMembers = async (studyId: number) => {
    const res = await axiosInstance.get(`studies/${studyId}/members`);
    // console.log(res.data.data);
    return res.data.data;
};
