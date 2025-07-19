import { StudySearchParams } from "@/types/study";
import { axiosInstance } from ".";

// 스터디 정보
export const studyInfo = async (studyId: number) => {
    // console.log("스터디아이디:", studyId);
    const res = await axiosInstance.get(`studies/${studyId}`);
    console.log(res.data.data);
    return res.data.data;
};

// 일반 스터디 검색
export const defaultSearch = async ({
    page,
    size,
    category,
    region,
    status,
    name,
}: StudySearchParams) => {
    console.log("일반 입력받은값:", page, size, category, region, status, name);
    const res = await axiosInstance.post("studies/search", {
        page,
        size,
        category,
        region,
        status,
        name,
        studyType: "DEFAULT",
    });
    console.log("일반 출력값", res.data.data);
    return res.data.data;
};

//서바이벌 스터디 검색
export const survSearch = async ({
    page,
    size,
    category,
    region,
    status,
    name,
}: StudySearchParams) => {
    console.log(
        "서바이벌 입력받은값:",
        page,
        size,
        category,
        region,
        status,
        name,
    );
    const res = await axiosInstance.post("studies/search", {
        page,
        size,
        category,
        region,
        status,
        name,
        studyType: "SURVIVAL",
    });
    console.log("서바이벌 출력값", res.data.data);
    return res.data.data;
};

//스터디 멤버 정보
export const studyMembers = async (studyId: number) => {
    const res = await axiosInstance.get(`studies/${studyId}/members`);
    // console.log(res.data.data);
    return res.data.data;
};

export const goalsInfo = async (studyId: number) => {
    const res = await axiosInstance.get(`studies/${studyId}/goals`);
    return res.data.data;
};

//스터디 신청
export const studyApply = async (studyId: number, introduction: string) => {
    console.log("스터디 신청 일단들어모");
    const res = await axiosInstance.post(`studies/${studyId}/application`, {
        introduction,
    });
    console.log(res.data);
    // return res.data.data;
};
