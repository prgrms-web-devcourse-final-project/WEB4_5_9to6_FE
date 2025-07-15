export interface StudySearchParams {
    page: number;
    size: number;
    category: string;
    region: string;
    status: string;
    name: string;
}
export interface Study {
    studyId: number;
    title: string;
    category: string;
    currentMemberCount: number;
    maxMemberCount: number;
    schedules: string[];
    startTime: string;
    endTime: string;
    status: "READY" | "ACTIVE";
    createdAt: string;
    startDate: string;
    region: string;
    studyType: "SURVIVAL" | "DEFAULT";
}
export interface Members {
    studyMemberId: number;
    memberId: number;
    nickName: string;
    profileImage: string;
    role: "MEMBER" | "LEADER";
    email: string;
}
