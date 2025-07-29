import { axiosInstance } from "./index";

// 스터디 정보
export const fetchStudyInfo = async (studyId: number) => {
    const res = await axiosInstance.get(`studies/${studyId}`);
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
    const res = await axiosInstance.post("studies/search", {
        page,
        size,
        category,
        region,
        status,
        name,
        studyType: "DEFAULT",
    });
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
    const res = await axiosInstance.post("studies/search", {
        page,
        size,
        category,
        region,
        status,
        name,
        studyType: "SURVIVAL",
    });
    return res.data.data;
};

//스터디 멤버 정보
export const studyMembers = async (studyId: number) => {
    const res = await axiosInstance.get(`studies/${studyId}/members`);
    return res.data.data;
};

export const goalsInfo = async (studyId: number) => {
    const res = await axiosInstance.get(`studies/${studyId}/goals`);
    return res.data.data;
};

//스터디 신청
export const studyApply = async (studyId: number, introduction: string) => {
    const res = await axiosInstance.post(`studies/${studyId}/application`, {
        introduction,
    });
    return res.data.data;
};

//스터디 신청자 목록 조회
export const getApplicants = async (studyId: number) => {
    const res = await axiosInstance.get(`studies/${studyId}/applications-list`);
    return res.data.data;
};

//스터디 멤버 여부 확인
export const checkIsMember = async (studyId: number) => {
    const res = await axiosInstance.get(`studies/${studyId}/members/me/check`);
    return res.data.data;
};

//스터디 가입 승인/거절
export const respondToApplication = async (
    studyId: number,
    memberId: number,
    applicationResult: string,
) => {
    const res = await axiosInstance.post(
        `studies/${studyId}/applications/respond`,
        { memberId, applicationResult },
    );
    return res.data.data;
};

//출석체크
export const postAttendance = async (studyId: number) => {
    const res = await axiosInstance.post(`studies/${studyId}/attendance`);
    return res.data;
};

//주간 출석체크 확인
export const checkWeekAttendance = async (
    studyId: number,
    memberId?: number,
) => {
    const res = await axiosInstance.get(`studies/${studyId}/attendance`, {
        params: { memberId },
    });
    return res.data.data;
};

//스터디 목표 목록 조회
export const getGoals = async (studyId: number) => {
    const res = await axiosInstance.get(`studies/${studyId}/goals`);
    return res.data.data;
};

// 스터디 목표 달성 여부 조회
export const getCheckGoal = async (studyId: number) => {
    const res = await axiosInstance.get(`studies/${studyId}/check-goal`);
    return res.data.data;
};

//스터디 목표 달성 등록
export const postGoalsCompleted = async (studyId: number, goalId: number) => {
    const res = await axiosInstance.post(`studies/${studyId}/goal/${goalId}`);
    return res.data.message;
};

//주간 목표 달성 확인
export const checkGoalsCompleted = async (
    studyId: number,
    memberId?: number,
) => {
    const res = await axiosInstance.get(`studies/${studyId}/goals/completed`, {
        params: { memberId },
    });
    return res.data.data;
};

//스터디 공지사항 조회
export const getNotice = async (studyId: number) => {
    const res = await axiosInstance.get(`studies/${studyId}/notification`);
    return res.data.data.notice;
};

//스터디 공지사항 수정
export const patchNotice = async (studyId: number, notice: string) => {
    const res = await axiosInstance.patch(`studies/${studyId}/notification`, {
        notice,
    });
    return res.data.message;
};

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
    isOnline,
}: CreateStudy) => {
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
        isOnline,
    });

    return response.data;
};

/* 스터디 수정 */
export const editStudy = async (
    studyId: number,
    {
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
        isOnline,
    }: CreateStudy,
) => {
    const response = await axiosInstance.put(`studies/${studyId}`, {
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
        isOnline,
    });

    return response.data;
};
