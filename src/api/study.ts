import { axiosInstance } from "./index";

/* 스터디 생성 */
export const createStudy = async ({
    name,
    category,
    maxMembers,
    region,
    place,
    schedules,
    startTime,
    endTime,
    startDate,
    endDate,
    description,
    externalLink,
    studyType,
    goals,
    online,
}: {
    name: string;
    category: string;
    maxMembers: number;
    region: string;
    place: string;
    schedules: string[];
    startTime: string;
    endTime: string;
    startDate: string;
    endDate: string;
    description: string;
    externalLink: string;
    studyType: string;
    goals: { goalId: number; content: string }[];
    online: boolean;
}) => {
    const response = await axiosInstance.post("studies", {
        name,
        category,
        maxMembers,
        region,
        place,
        schedules,
        startTime,
        endTime,
        startDate,
        endDate,
        description,
        externalLink,
        studyType,
        goals,
        online,
    });

    return response.data;
};
