interface StudySearchParams {
    page: number;
    size: number;
    category: string;
    region: string;
    status: string;
    name: string;
    studyType?: "DEFAULT" | "SURVIVAL";
}
interface Study {
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
interface Members {
    studyMemberId: number;
    memberId: number;
    nickName: string;
    profileImage: string;
    role: "MEMBER" | "LEADER";
    email: string;
}
interface Goal {
    goalId: number;
    content: string;
    type: "WEEKLY";
}
interface StudyInfos {
    name: string;
    category: string;
    maxMembers: number;
    region: string;
    place: string | null;
    schedules: string[];
    startTime: string;
    endTime: string;
    startDate: string;
    endDate: string;
    createdAt: string;
    status: "READY" | "ACTIVE";
    description: string;
    externalLink: string;
    studyType: "DEFAULT" | "SURVIVAL";
    goals: Goal[];
    notice: string;
    currentMemberCount: number;
    online: boolean;
}
