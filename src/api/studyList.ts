import { axiosInstance } from "./index";

// 유저의 스터디 리스트
export const fetchStudyList = async (id: number) => {
    const response = await axiosInstance.get(`members/${id}/studies`);
    return response.data.data;
};

// 비로그인 시에 뿌려줄 랜덤 리스트
export const fetchRandomStudyList = async () => {
    const response = await axiosInstance.post("studies/search", {
        name: "",
    });
    const list = response.data.data;
    const randomList = [...list].sort(() => 0.5 - Math.random()).slice(0, 5);
    return randomList;
};

export const fetchSurvival = async (id: number) => {
    const response = await axiosInstance.get(`studies/${id}`);
    return response.data.data;
};

export const fetchIsApplied = async (studyId: number) => {
    const response = await axiosInstance.get(
        `studies/${studyId}/members/me/check`,
    );
    return response.data.data;
};

export const fetchStudyMember = async (studyId: number) => {
    const response = await axiosInstance.get(`studies/${studyId}/members`);
    return response.data.data;
};

export const fetchSurvApply = async (studyId: number, memberId: number) => {
    const response = await axiosInstance.post(
        `studies/${studyId}/applications/respond`,
        {
            memberId,
            applicationResult: "ACCEPT",
        },
    );
    return response.data;
};
