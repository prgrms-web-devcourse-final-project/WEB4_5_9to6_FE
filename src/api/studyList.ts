import { axiosInstance } from "./index";

// 서바이벌 스터디
// export const fetchSurvStudyList = async () => {
//     const response = await axiosInstance.post("studies/search", {
//         name: "",
//     });
//     const survivalStudy = response.data.filter(
//         (study: StudyType) => study.studyType === "SURVIVAL",
//     );
//     return survivalStudy;
// };

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
