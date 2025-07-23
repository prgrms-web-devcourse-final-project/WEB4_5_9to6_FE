import { axiosInstance } from "./index";

export const fetchQuizData = async (studyId: number) => {
    const response = await axiosInstance.get(`quiz/${studyId}/problems`);
    console.log("퀴즈 데이터", response.data);
    return response.data.data;
};
