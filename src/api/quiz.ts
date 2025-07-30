import { axiosInstance } from "./index";

export const fetchQuizData = async (studyId: number) => {
    try {
        const response = await axiosInstance.get(`quiz/${studyId}/problems`);
        console.log("퀴즈 데이터", response.data);
        return response.data.data;
    } catch (error) {
        console.error("퀴즈 데이터 없음", error);
        return null;
    }
};
