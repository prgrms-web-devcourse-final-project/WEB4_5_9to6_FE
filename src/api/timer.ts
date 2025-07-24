import { axiosInstance } from ".";

// 특정 스터디 최근 7일간 일별 공부시간
export const fetchStudyWeeklyDailyTime = async (
    studyId: number,
    memberId: number,
) => {
    const response = await axiosInstance.get(
        `timer/${studyId}/${memberId}/weekly-daily`,
    );
    return response.data.data;
};

// 특정 스터디 최근 7일간 누적 공부시간
export const fetchStudyWeeklyAllTime = async (
    studyId: number,
    memberId: number,
) => {
    const response = await axiosInstance.get(
        `timer/${studyId}/${memberId}/weekly-all`,
    );
    return response.data.data;
};

// 전체 누적 공부시간
export const fetchAllTime = async (memberId: number) => {
    const response = await axiosInstance.get(`timer/${memberId}/all-time`);
    return response.data.data;
};

// 공부 시간 등록
export const postStudyTime = async (studyId: number, studyTime: number) => {
    console.log("타이머 데이터:", studyTime);
    const res = await axiosInstance.post(`timer/${studyId}`, { studyTime });
    console.log("등록데이터:", res.data.message);
    return res.data.message;
};
