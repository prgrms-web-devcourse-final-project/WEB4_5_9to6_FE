import { axiosInstance } from ".";

export const fetchStudyWeeklyDailyTime = async (
    studyId: number,
    memberId: number,
) => {
    const response = await axiosInstance.get(
        `timer/${studyId}/${memberId}/weekly-daily`,
    );
    return response.data.data;
};

export const fetchStudyWeeklyAllTime = async (
    studyId: number,
    memberId: number,
) => {
    const response = await axiosInstance.get(
        `timer/${studyId}/${memberId}/weekly-all`,
    );
    return response.data.data;
};

export const fetchAllTime = async (memberId: number) => {
    const response = await axiosInstance.get(`timer/${memberId}/all-time`);
    return response.data.data;
};
